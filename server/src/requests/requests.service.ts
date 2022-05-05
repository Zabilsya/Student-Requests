import {forwardRef, HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Request} from "./requests.model"
import {UsersService} from "../users/users.service";
import {CreateRequestDto} from "./dto/create-request.dto";
import {RequestTemplatesService} from "../request-templates/request-templates.service";
import {RequestFile} from "./requests-file.model";
import {FilesService} from "../files/files.service";
import PaginateService from "../paginate/paginate.service";
import {UpdateRequestDto} from "./dto/update-request.dto";
import {RequestTemplate} from "../request-templates/request-templates.model";
import {log} from "util";
import {GroupsService} from "../groups/groups.service";
import {User} from "../users/users.model";
import {Group} from "../groups/groups.model";
import {RequestStatus} from "./request-statuses.model";
import {CreateMessageDto} from "./dto/create-message.dto";
import {RequestMessage} from "./request-messages.model";
import {WebsocketService} from "../websocket/websocket.service";


@Injectable()
export class RequestsService {
    private fileDirectory = 'requests'

    constructor(
        @InjectModel(Request) private requestRepository: typeof Request,
        @InjectModel(RequestFile) private requestFilesRepository: typeof RequestFile,
        @InjectModel(RequestMessage) private requestMessageRepository: typeof RequestMessage,
        private usersService: UsersService,
        private requestTemplatesService: RequestTemplatesService,
        private groupsService: GroupsService,
        private fileService: FilesService,
        @Inject(forwardRef(() => WebsocketService))
        private websocketService: WebsocketService
    ) {}


    async getAllRequests(userData: any, query: any) {
        const searchQuery = await this.getSearchQueryForRequests(userData, query)
        const { page, offset } = PaginateService.getPaginateParams(searchQuery['limit'], query.page)
        const result = await this.requestRepository.findAndCountAll(
            {
                offset,
                ...searchQuery
            })

        return {...result, page, totalPages: PaginateService.getTotalPages(searchQuery['limit'], result.count)}
    }


    async getTemplatesByUser(userData: any) {
        let searchQuery: object = {distinct: true, attributes: ['template_id'], group: ['template_id']}
        if (userData.user_type === 3) {
            searchQuery = {...searchQuery, where: {creator_user_id: userData.id}}
        }
        const templates = await this.requestRepository.findAll({...searchQuery})
        const templateIds = templates.map(template => template.template_id)
        return await this.requestTemplatesService.getTemplatesByIds(templateIds)
    }


    async getRequestById(id: number, userData?: any): Promise<Request> {
        const request = await this.requestRepository.findOne({where: {id}, include: this.getIncludeQuery()})
        if (!request) {
            throw new HttpException('Запроса с таким идентификатором не существует', HttpStatus.NOT_FOUND)
        }
        if (userData && userData.user_type === 3) {
            const user = await this.usersService.getUserById(userData.id)
            if (request.creator_user_id !== user.id) {
                throw new HttpException('Вы не имеете доступ к этому запросу', HttpStatus.BAD_GATEWAY)
            }
        }
        return request
    }


    async createRequest(creatorUserId: number, dto: CreateRequestDto, files: any): Promise<Request> {
        await this.requestTemplatesService.getTemplateById(dto.template_id)
        const request = await this.requestRepository.create({creator_user_id: creatorUserId, status_id: 1, ...dto})
        await this.createFiles(request.id, files.files)

        return request
    }


    async updateRequest(acceptorUserId: number, dto: UpdateRequestDto): Promise<Request> {
        const request = await this.getRequestById(dto.id)
        return await request.update({status_id: dto.status_id, acceptor_user_id: acceptorUserId})
    }


    async createMessage(dto: CreateMessageDto) {
        const createdMessage = await this.requestMessageRepository.create(dto)
        return await this.requestMessageRepository.findOne({where: {id: createdMessage.id}, include: {all: true}})
    }


    async createMessageAndFiles(dto: CreateMessageDto, files?: any) {
        const filesData = await this.createFiles(dto.request_id, files.files)
        const filesName = filesData.map(data => `#${data.name}#*${data.path}*`)
        await this.requestMessageRepository.create({...dto, text: filesName.join(','), is_files: true})
        this.websocketService.handleTrigger(dto.request_id)
    }


    async getSearchQueryForRequests(userData: any, query: any) {
        let searchQuery: object = {
            limit: 3,
            include: this.getIncludeQuery(),
            order: [['id', 'DESC']],
            distinct: true
        }
        if (query.template_id) {
            searchQuery = {...searchQuery, where: {template_id: query.template_id}}
        }
        if (query.status_id) {
            searchQuery = {...searchQuery, where: {...searchQuery['where'], status_id: query.status_id}}
        }
        if (userData.user_type === 3) {
            searchQuery = {...searchQuery, limit: 6, where: {...searchQuery['where'], creator_user_id: userData.id}}
        }
        return searchQuery
    }


    private getIncludeQuery(): Array<Object> {
        return [
            {model: User, as: 'creator_user', include: {model: Group}},
            {model: User, as: 'acceptor_user'},
            {model: RequestStatus, as: 'status'},
            {model: RequestFile, as: 'files'},
            {model: RequestTemplate, as: 'template', include: {model: User}},
            {model: RequestMessage, as: 'messages', include: {model: User, as: 'author'}},
        ]
    }


    private async createFiles(requestId: number, files: any[]) {
        let filesData = []
        if (files) {
            for (let i = 0; i < files.length; i++) {
                const fileData = await this.fileService.createFile(files[i], this.fileDirectory)
                await this.requestFilesRepository.create({file_name: fileData.name, file_path: fileData.path, request_id: requestId})
                filesData.push(fileData)
            }
        }
        return filesData
    }
}
