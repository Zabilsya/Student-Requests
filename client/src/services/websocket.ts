import {io, Socket} from "socket.io-client";

export class WebSocketService {
    constructor() {}

    static connect(): any {
        return io(`${process.env.REACT_APP_API_URL}`)
    }
}