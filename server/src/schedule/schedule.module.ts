import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import {FilesModule} from "../files/files.module";
import {SequelizeModule} from "@nestjs/sequelize";
import {Schedule} from "./schedule.model";
import {ScheduleTitle} from "./schedule-title.model";
import {AuthModule} from "../auth/auth.module";

@Module({
  providers: [ScheduleService],
  controllers: [ScheduleController],
  imports: [
    SequelizeModule.forFeature([Schedule, ScheduleTitle]),
    FilesModule,
    AuthModule
  ]
})
export class ScheduleModule {}
