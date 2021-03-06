import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {RequestTemplate} from "./request-templates.model";
import {CreateRequestTemplateDto} from "./dto/create-request-template.dto";
import {UpdateRequestTemplateDto} from "./dto/update-request-template.dto";
import {UsersService} from "../users/users.service";
import PaginateService from "../paginate/paginate.service";

@Injectable()
export class RequestTemplatesService {

    constructor(
        @InjectModel(RequestTemplate) private requestTemplateRepository: typeof RequestTemplate,
        private usersService: UsersService
    ) {}


    async getAllTemplates() {
        return await this.requestTemplateRepository.findAll({where: {is_blocked: false}})
    }


    async getTemplates(query: any) {
        const limit = 2
        const { page, offset } = PaginateService.getPaginateParams(limit, query.page)
        const result = await this.requestTemplateRepository.findAndCountAll(
            {
                where: {
                    is_blocked: false
                },
                offset,
                limit,
                include: {all: true},
                distinct: true
        })

        return {...result, page, totalPages: PaginateService.getTotalPages(limit, result.count)}
    }


    async createTemplate(dto: CreateRequestTemplateDto): Promise<RequestTemplate> {
        await this.usersService.getUserById(dto.user_id)
        await this.isTemplateExist(dto.name)
        return await this.requestTemplateRepository.create(dto)
    }


    async updateTemplate(dto: UpdateRequestTemplateDto): Promise<RequestTemplate> {
        const requestTemplate = await this.getTemplateById(dto.id)
        return await requestTemplate.update(dto)
    }


    async deleteTemplate(id: number): Promise<RequestTemplate> {
        const requestTemplate = await this.getTemplateById(id)
        return await requestTemplate.update({is_blocked: true})
    }


    async isTemplateExist(name: string): Promise<boolean> {
        const requestTemplate = await this.requestTemplateRepository.findOne({where: {name, is_blocked: false}})
        if (requestTemplate) {
            throw new HttpException('???????????? ?????????????? ?? ?????????? ?????????????????? ?????? ????????????????????', HttpStatus.BAD_REQUEST)
        }
        return false
    }


    async getTemplateById(id: number): Promise<RequestTemplate> {
        const requestTemplate = await this.requestTemplateRepository.findOne({where: {id, is_blocked: false}})
        if (!requestTemplate) {
            throw new HttpException('?????????????? ?????????????? ?? ?????????? ?????????????????????????????? ???? ????????????????????', HttpStatus.NOT_FOUND)
        }
        return requestTemplate
    }


    async getTemplatesByIds(ids: number[]): Promise<RequestTemplate[]> {
        return await this.requestTemplateRepository.findAll({where: {id: ids}, include: {all: true}})
    }
}
