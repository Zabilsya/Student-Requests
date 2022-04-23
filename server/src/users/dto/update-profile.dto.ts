import {IsEmail, IsPhoneNumber, IsString} from "class-validator";

export class UpdateProfileDto {
    @IsString({message: 'Email должен быть строкой'})
    @IsEmail({},{message: 'Неккоректный Email'})
    readonly email: string

    @IsString({message: "Номер телефона должен быть строкой"})
    @IsPhoneNumber('RU', {message: "Некорректный номер телефона"})
    readonly phone_number: string
}