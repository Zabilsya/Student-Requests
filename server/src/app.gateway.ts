import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import {RequestsService} from "./requests/requests.service";
import {WebsocketService} from "./websocket/websocket.service";

@WebSocketGateway({ cors: true })
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
      private websocketService: WebsocketService
  )
  {}

  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('msgToServer')
  async handleMessage(client: Socket, payload: string): Promise<void> {
      await this.websocketService.createMessage(JSON.parse(payload))
  }

  afterInit(server: Server) {
    this.websocketService.socket = server;
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}