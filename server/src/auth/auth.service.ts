import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import {User} from "../users/users.model";
import * as bcrypt from 'bcryptjs';
import {LoginDto} from "./dto/login.dto";
import {ChangePasswordDto} from "./dto/change-password.dto";
import {RecoveryTokensService} from "../recovery-tokens/recovery-tokens.service";


@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private recoveryTokensService: RecoveryTokensService,
        private jwtService: JwtService
    ) {}


    async login(dto: LoginDto): Promise<string> {
        const user = await this.validateUser(dto)
        return await this.generateToken(user)
    }


    async changePassword(dto: ChangePasswordDto): Promise<User> {
        const user = await this.usersService.getUserByEmail(dto.email)
        if (!user) {
            throw new HttpException('Неккоректный Email', HttpStatus.BAD_REQUEST)
        }
        await this.recoveryTokensService.isValidToken(dto)
        if (dto.password !== dto.confirmPassword) {
            throw new HttpException('Пароли не совпадают', HttpStatus.BAD_REQUEST)
        }
        const hashedPassword = await bcrypt.hash(dto.password, 5)
        const updatedUser = await this.usersService.updatePassword(user, hashedPassword)
        await this.recoveryTokensService.deleteToken(updatedUser.id)

        return updatedUser
    }


    async generateToken(user: User): Promise<string> {
        const payload = {id: user.id, email: user.email, user_type: user.user_type}
        return this.jwtService.sign(payload)
    }


    private async validateUser(dto: LoginDto): Promise<User> {
        const user = await this.usersService.getUserByEmail(dto.email)
        if (!user) {
            throw new HttpException({email: 'Неккоректный Email'}, HttpStatus.BAD_REQUEST)
        }
        const isPasswordEquals = await bcrypt.compare(dto.password, user.password)
        if (!isPasswordEquals) {
            throw new HttpException({password: 'Неккоректный пароль'}, HttpStatus.BAD_REQUEST)
        }
        return user
    }
}
