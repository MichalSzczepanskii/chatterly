import {
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UseFilters, UseGuards } from '@nestjs/common';
import {
  UnauthorizedWsMessage,
  WebsocketExceptionsFilter,
  WsActiveUserId,
  WsAuthGuard,
} from '@chatterly/api/events/utils';
import { ConnectedClientsService } from '@chatterly/api/shared/data-access';
import { WsAuthService } from '@chatterly/api/events/data-access';

@WebSocketGateway()
@UseGuards(WsAuthGuard)
@UseFilters(WebsocketExceptionsFilter)
export class EventsGateway implements OnGatewayConnection {
  constructor(
    private wsAuthService: WsAuthService,
    private connectedClientsService: ConnectedClientsService
  ) {}
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    const jwtPayload = this.wsAuthService.verify(
      client.handshake.query.bearerToken as string
    );
    if (!jwtPayload) {
      client.send(UnauthorizedWsMessage);
      return;
    }
    this.connectedClientsService.addClient(jwtPayload.sub, client);
    client.on('disconnect', () =>
      this.connectedClientsService.removeClient(jwtPayload.sub)
    );
  }

  @SubscribeMessage('events')
  handleEvent(@MessageBody() data: unknown, @WsActiveUserId() userId: string) {
    console.log(data);
    console.log(userId);
  }
}
