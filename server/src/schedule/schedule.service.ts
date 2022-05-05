import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Schedule} from "./schedule.model";
import {ScheduleTitle} from "./schedule-title.model";
import {FilesService} from "../files/files.service";
import {CreateScheduleDto} from "./dto/create-schedule.dto";
import {UpdateScheduleDto} from "./dto/update-schedule.dto";

@Injectable()
export class ScheduleService {
    private fileDirectory = 'schedule'

    constructor(
        @InjectModel(Schedule) private scheduleRepository: typeof Schedule,
        @InjectModel(ScheduleTitle) private scheduleTitleRepository: typeof ScheduleTitle,
        private fileService: FilesService
    ) {}


    async getSchedule(): Promise<ScheduleTitle[]> {
        return await this.scheduleTitleRepository.findAll({include: {all: true}})
    }


    async createSchedule(dto: CreateScheduleDto, files: any): Promise<ScheduleTitle> {
        const scheduleTitle = await this.scheduleTitleRepository.create(dto)
        await this.createFiles(scheduleTitle.id, files.docs)
        return scheduleTitle
    }


    async updateSchedule(dto: UpdateScheduleDto, files: any): Promise<void> {
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
        await this.createFiles(scheduleTitle.id, files.docs)
    }


    async deleteSchedule(id: number) {
        const scheduleDocs = await this.scheduleRepository.findAll({where: {title_id: id}})
        for (let i = 0; i < scheduleDocs.length; i++) {
            await this.scheduleRepository.destroy({where: {id: scheduleDocs[i].id}})
            await this.fileService.deleteFile(scheduleDocs[i].file_path)
        }
        return await this.scheduleTitleRepository.destroy({where: {id}})
    }


    private async createFiles(scheduleTitleId: number, files: any[]) {
        if (files) {
            for (let i = 0; i < files.length; i++) {
                const {path} = await this.fileService.createFile(files[i], this.fileDirectory)
                await this.scheduleRepository.create({file_name: files[i].originalname, file_path: path, title_id: scheduleTitleId})
            }
        }
    }
}