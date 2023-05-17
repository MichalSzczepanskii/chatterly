import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

@Injectable()
export class ConnectedClientsService {
  _clients: Map<number, Socket> = new Map();

  public addClient(userId: number, client: Socket) {
    this._clients.set(userId, client);
  }

  public getClient(userId: number): Socket | null {
    return this._clients.get(userId);
  }

  public removeClient(userId: number) {
    this._clients.delete(userId);
  }
}
