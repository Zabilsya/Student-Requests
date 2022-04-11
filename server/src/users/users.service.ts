import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./users.model";
import MailService from "../mail/mail.service";
import {CreateUserDto} from "./dto/create-user.dto";
import * as generatePassword from "password-generator";
import * as bcrypt from 'bcryptjs';
import {GroupsService} from "../groups/groups.service";

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User) private userRepository: typeof User,
        private groupsService: GroupsService
    ) {}

    async createUser(data: CreateUserDto): Promise<User> {
        //TODO::валидация
        if (data.group_name) {
            data['group_id'] = await this.groupsService.createGroup(data.group_name)
        }
        const password = generatePassword(10, false, /[\w[1-9]/)
        const hashedPassword = await bcrypt.hash(password, 5)
        MailService.sendEmail({to: data.email, subject: 'Пароль', text: `Ваш пароль: ${password}`})

        return await this.userRepository.create({...data, password: hashedPassword})
    }


}
