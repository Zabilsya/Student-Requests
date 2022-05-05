import {Module, Global, forwardRef} from '@nestjs/common';
import { WebsocketService } from './websocket.service';
import {RequestsModule} from "../requests/requests.module";

@Global()
@Module({
  providers: [WebsocketService],
  imports: [
      forwardRef(() => RequestsModule)
  ],
  exports: [WebsocketService],
})
export class WebsocketModule {}

