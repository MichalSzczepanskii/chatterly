import {
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { UseFilters, UseGuards } from '@nestjs/common';
import {
  WebsocketExceptionsFilter,
  WsAuthGuard,
} from '@chatterly/api/events/utils';

@WebSocketGateway()
@UseGuards(WsAuthGuard)
@UseFilters(WebsocketExceptionsFilter)
export class EventsGateway implements OnGatewayConnection {
  handleConnection(client: any, ...args: any[]): any {
    console.log(client);
  }
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('events')
  handleEvent(data: unknown) {
    console.log(data);
  }
}
