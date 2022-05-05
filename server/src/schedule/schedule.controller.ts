import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post, Put,
    UploadedFiles,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {ScheduleService} from "./schedule.service";
import {CreateScheduleDto} from "./dto/create-schedule.dto";
import {FileFieldsInterceptor} from "@nestjs/platform-express";
import {UpdateScheduleDto} from "./dto/update-schedule.dto";

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
    @UseInterceptors(FileFieldsInterceptor([{ name: 'docs', maxCount: 10 }]))
    create(@Body() dto: CreateScheduleDto, @UploadedFiles() files?: Express.Multer.File) {
        return this.scheduleService.createSchedule(dto, files)
    }


    @UseGuards(JwtAuthGuard)
    @Put('/update')
    @UseInterceptors(FileFieldsInterceptor([{ name: 'docs', maxCount: 10 }]))
    update(@Body() dto: UpdateScheduleDto, @UploadedFiles() files?: Express.Multer.File[]) {
        return this.scheduleService.updateSchedule(dto, files)
    }


    @UseGuards(JwtAuthGuard)
    @Delete('/delete/:id')
    delete(@Param('id') id: number) {
        return this.scheduleService.deleteSchedule(id)
    }
}
