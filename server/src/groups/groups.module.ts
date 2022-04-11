import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Group} from "./groups.model";

@Module({
  providers: [GroupsService],
  imports: [
    SequelizeModule.forFeature([Group])
  ],
  exports: [GroupsService]
})
export class GroupsModule {}
