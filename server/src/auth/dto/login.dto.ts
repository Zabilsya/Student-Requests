import {IsEmail, IsString} from "class-validator";

export class LoginDto {
    @IsString({message: 'Email должен быть строкой'})
    @IsEmail({},{message: 'Неккоректный Email'})
    readonly email: string
    @IsString({message: 'Пароль должен быть строкой'})
    readonly password: string
}