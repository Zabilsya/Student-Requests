import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import * as generatePassword from "password-generator";
import MailService from "../mail/mail.service";
import {UsersService} from "../users/users.service";
import {InjectModel} from "@nestjs/sequelize";
import {RecoveryToken} from "./recovery-tokens.model";
import {SendTokenDto} from "./dto/send-token.dto";
import {ConfirmTokenDto} from "./dto/confirm-token.dto";

@Injectable()
export class RecoveryTokensService {

    constructor(
        @InjectModel(RecoveryToken) private recoveryTokenRepository: typeof RecoveryToken,
        private userService: UsersService
    ) {}


    async sendTokenToEmail(dto: SendTokenDto): Promise<void> {
        const user = await this.userService.getUserByEmail(dto.email)
        if (!user) {
            throw new HttpException('Пользователь с таким Email не существует', HttpStatus.BAD_REQUEST)
        }
        const recoveryToken = generatePassword(6, false, /\d/)
        await this.saveToken(user.id, recoveryToken)
        MailService.sendMessage({to: user.email, subject: 'Код подтверждения', text: `Ваш код: ${recoveryToken}`})
    }


    async isValidToken(dto: ConfirmTokenDto): Promise<boolean> {
        const user = await this.userService.getUserByEmail(dto.email)
        if (!user) {
            throw new HttpException('Пользователь с таким Email не существует', HttpStatus.BAD_REQUEST)
        }
        const record = await this.recoveryTokenRepository.findOne({where: {user_id: user.id}})
        if (record.token === dto.token) {
            return true
        }
        throw new HttpException('Неправильный код', HttpStatus.BAD_REQUEST)
    }


    private async saveToken(userId: number, token: string): Promise<void> {
        const record = await this.recoveryTokenRepository.findOne({where: {user_id: userId}})
        if (record) {
            await record.update({token})
        } else {
            await this.recoveryTokenRepository.create({user_id: userId, token})
        }
    }


    async deleteToken(userId: number): Promise<number> {
        return await this.recoveryTokenRepository.destroy({where: {user_id: userId}})
    }
}
