import {forwardRef, Module} from '@nestjs/common';
import { RequestsController } from './requests.controller';
import { RequestsService } from './requests.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Request} from './requests.model'
import {AuthModule} from "../auth/auth.module";
import {UsersModule} from "../users/users.module";
import {FilesModule} from "../files/files.module";
import {RequestStatus} from "./request-statuses.model";
import {RequestFile} from "./requests-file.model";
import {RequestTemplatesModule} from "../request-templates/request-templates.module";
import {GroupsModule} from "../groups/groups.module";
import {RequestMessage} from "./request-messages.model";
import {WebsocketModule} from "../websocket/websocket.module";

@Module({
  providers: [RequestsService],
  controllers: [RequestsController],
  imports: [
    SequelizeModule.forFeature([Request, RequestStatus, RequestFile, RequestMessage]),
    forwardRef(() => RequestTemplatesModule),
    AuthModule,
    UsersModule,
    FilesModule,
    GroupsModule,
    forwardRef(() => WebsocketModule)
  ],
  exports: [RequestsService]
})
export class RequestsModule {}
