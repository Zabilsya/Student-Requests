import {Body, Controller, Delete, Get, Post, Put, UploadedFiles, UseGuards, UseInterceptors} from '@nestjs/common';
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {ScheduleService} from "./schedule.service";
import {CreateScheduleDto} from "./dto/create-schedule.dto";
import {FileInterceptor, FilesInterceptor} from "@nestjs/platform-express";
import {UpdateScheduleDto} from "./dto/update-schedule.dto";
import {DeleteScheduleDto} from "./dto/delete-schedule.dto";

@Controller('schedule')
export class ScheduleController {
    constructor(private scheduleService: ScheduleService) {}


    @UseGuards(JwtAuthGuard)
    @Get('/get-all')
    get() {
        return this.scheduleService.getSchedule()
    }


    @UseGuards(JwtAuthGuard)
    @Post('/create')
    @UseInterceptors(FilesInterceptor('files'))
    create(@Body() dto: CreateScheduleDto, @UploadedFiles() files) {
        return this.scheduleService.createSchedule(dto, files)
    }


    @UseGuards(JwtAuthGuard)
    @Post('/update')
    @UseInterceptors(FilesInterceptor('files'))
    update(@Body() dto: UpdateScheduleDto, @UploadedFiles() files) {
        return this.scheduleService.updateSchedule(dto, files)
    }


    @UseGuards(JwtAuthGuard)
    @Delete('/delete')
    delete(@Body() dto: DeleteScheduleDto) {
        return this.scheduleService.deleteSchedule(dto)
    }
}
