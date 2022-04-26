import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Group} from "./groups.model";
import { GroupsController } from './groups.controller';
import {AuthModule} from "../auth/auth.module";

@Module({
  providers: [GroupsService],
  imports: [
    SequelizeModule.forFeature([Group]),
    AuthModule
  ],
  exports: [GroupsService],
  controllers: [GroupsController]
})
export class GroupsModule {}
