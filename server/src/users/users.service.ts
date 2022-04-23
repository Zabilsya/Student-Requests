import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./users.model";
import MailService from "../mail/mail.service";
import {CreateUserDto} from "./dto/create-user.dto";
import * as generatePassword from "password-generator";
import * as bcrypt from 'bcryptjs';
import {GroupsService} from "../groups/groups.service";
import PaginateService from "../paginate/paginate.service";
import {DeleteScheduleDto} from "../schedule/dto/delete-schedule.dto";
import {UpdateProfileDto} from "./dto/update-profile.dto";
import {FilesService} from "../files/files.service";
import {UpdateUserDto} from "./dto/update-user.dto";


@Injectable()
export class UsersService {
    private avatarDirectory = 'users'

    constructor(
        @InjectModel(User) private userRepository: typeof User,
        private groupsService: GroupsService,
        private fileService: FilesService
    ) {}


    async getAllUsers(query: any) {
        const limit = 2
        const { page, offset } = PaginateService.getPaginateParams(limit, query.page)
        const result = await this.userRepository.findAndCountAll(
            {
                where: {
                    user_type: Number(query.user_type) || 3,
                    is_blocked: false
                },
                offset,
                limit,
                attributes: {exclude: ['password', 'createdAt', 'updatedAt']},
                include: {all: true}
            })

        return {...result, page, totalPages: PaginateService.getTotalPages(limit, result.count)}
    }


    async getUserById(id: number): Promise<User> {
        return await this.userRepository.findByPk(id)
    }


    async createUser(dto: CreateUserDto): Promise<User> {
        const user = await this.getUserByEmail(dto.email)
        if (user) {
            throw new HttpException('Пользователь с таким Email уже существует', HttpStatus.BAD_REQUEST)
        }
        if (dto.group_name) {
            dto['group_id'] = await this.groupsService.createGroup(dto.group_name)
        }
        const password = generatePassword(10, false, /[\w[1-9]/)
        const hashedPassword = await bcrypt.hash(password, 5)
        MailService.sendMessage({to: dto.email, subject: 'Пароль', text: `Ваш пароль: ${password}`})

        return await this.userRepository.create({...dto, password: hashedPassword})
    }


    async deleteUser(dto: DeleteScheduleDto): Promise<User> {
        const user = await this.getUserById(dto.id)
        return await user.update({is_blocked: true})
    }


    async updateUserById(id: number, dto: UpdateProfileDto, image: any) {
        const user = await this.getUserById(id)
        let filePath = ''
        if (image) {
            filePath = await this.fileService.createFile(image, this.avatarDirectory)
            await this.fileService.deleteFile(user.avatar)
        }
        return await user.update({
            ...dto,
            avatar: filePath || user.avatar
        })
    }


    async updateUser(dto: UpdateUserDto) {
        const user = await this.getUserById(dto.id)
        if (dto.group_name) {
            dto['group_id'] = await this.groupsService.createGroup(dto.group_name)
        }
        return await user.update(dto)
    }


    async updatePassword(user: User, password: string) {
        return await user.update({password})
    }


    async getUserByEmail(email: string): Promise<User> {
        return await this.userRepository.findOne({where: {email, is_blocked: false}})
    }
}
