import {IsEmail, IsString, Length} from "class-validator";

export class ChangePasswordDto {
    @IsString({message: 'Email должен быть строкой'})
    @IsEmail({},{message: 'Неккоректный Email'})
    readonly email: string

    @IsString({message: 'Пароль должен быть строкой'})
    @Length(6, 16, {message: 'Пароль должен быть от 6 до 16 символов'})
    readonly password: string

    @IsString({message: 'Пароль должен быть строкой'})
    @Length(6, 16, {message: 'Пароль должен быть от 6 до 16 символов'})
    readonly confirmPassword: string

    @IsString({message: 'Токен должен быть строкой'})
    readonly token: string
}