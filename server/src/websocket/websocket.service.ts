import {forwardRef, Inject, Injectable} from '@nestjs/common';
import { Server } from "socket.io";
import {CreateMessageDto} from "../requests/dto/create-message.dto";
import {RequestsService} from "../requests/requests.service";

@Injectable()
export class WebsocketService {
    public socket: Server = null

    constructor(
        @Inject(forwardRef(() => RequestsService))
        private requestService: RequestsService
    ) {}

    async createMessage(dto: CreateMessageDto) {
        const message = await this.requestService.createMessage(dto)
        this.socket.emit(`msgToClient:${message.request_id}`, message);
    }

    handleTrigger(requestId: number) {
        this.socket.emit(`triggerToClient:${requestId}`, true)
    }
}
