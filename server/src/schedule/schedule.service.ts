import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Schedule} from "./schedule.model";
import {ScheduleTitle} from "./schedule-title.model";
import {FilesService} from "../files/files.service";
import {CreateScheduleDto} from "./dto/create-schedule.dto";
import {UpdateScheduleDto} from "./dto/update-schedule.dto";
import {DeleteScheduleDto} from "./dto/delete-schedule.dto";

@Injectable()
export class ScheduleService {
    private fileDirectory = 'schedule'

    constructor(
        @InjectModel(Schedule) private scheduleRepository: typeof Schedule,
        @InjectModel(ScheduleTitle) private scheduleTitleRepository: typeof ScheduleTitle,
        private fileService: FilesService
    ) {}


    async getSchedule(): Promise<Schedule[]> {
        return await this.scheduleRepository.findAll({include: {all: true}})
    }


    async createSchedule(dto: CreateScheduleDto, files: any[]): Promise<void> {
        const scheduleTitle = await this.scheduleTitleRepository.create(dto)
        await this.createFiles(scheduleTitle.id, files)
    }


    async updateSchedule(dto: UpdateScheduleDto, files: any[]): Promise<void> {
        const scheduleTitle = await this.scheduleTitleRepository.findByPk(dto.id)
        if (!scheduleTitle) {
            throw new HttpException('Расписания с таким идентификатором не существует', HttpStatus.NOT_FOUND)
        }
        if (dto.title) {
            await scheduleTitle.update({title: dto.title})
        }
        if (dto.deleted_files) {
            for (let i = 0; i < dto.deleted_files.length; i++) {
                await this.scheduleRepository.destroy({where: {id: dto.deleted_files[i]['id']}})
                await this.fileService.deleteFile(dto.deleted_files[i]['file_path'])
            }
        }
        await this.createFiles(scheduleTitle.id, files)
    }


    async deleteSchedule(dto: DeleteScheduleDto) {
        const scheduleDocs = await this.scheduleRepository.findAll({where: {title_id: dto.id}})
        for (let i = 0; i < scheduleDocs.length; i++) {
            await this.scheduleRepository.destroy({where: {id: scheduleDocs[i].id}})
            await this.fileService.deleteFile(scheduleDocs[i].file_path)
        }
        return await this.scheduleTitleRepository.destroy({where: {id: dto.id}})
    }


    private async createFiles(scheduleTitleId: number, files: any[]) {
        for (let i = 0; i < files.length; i++) {
            const filePath = await this.fileService.createFile(files[i], this.fileDirectory)
            await this.scheduleRepository.create({file_name: files[i].originalname, file_path: filePath, title_id: scheduleTitleId})
        }
    }
}