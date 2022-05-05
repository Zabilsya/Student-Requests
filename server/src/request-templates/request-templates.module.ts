import {forwardRef, Module} from '@nestjs/common';
import { RequestTemplatesService } from './request-templates.service';
import { RequestTemplatesController } from './request-templates.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {RequestTemplate} from "./request-templates.model";
import {AuthModule} from "../auth/auth.module";
import {UsersModule} from "../users/users.module";
import {RequestsModule} from "../requests/requests.module";

@Module({
  providers: [RequestTemplatesService],
  controllers: [RequestTemplatesController],
  imports: [
    SequelizeModule.forFeature([RequestTemplate]),
    forwardRef(() => RequestsModule),
    AuthModule,
    UsersModule,
  ],
  exports: [RequestTemplatesService]
})
export class RequestTemplatesModule {}
