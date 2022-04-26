import {IsEmail, IsPhoneNumber, IsString, IsOptional} from "class-validator";

export class UpdateProfileDto {

    @IsOptional()
    @IsString({message: 'Email должен быть строкой'})
    @IsEmail({},{message: 'Неккоректный Email'})
    readonly email: string

    @IsOptional()
    @IsString({message: "Номер телефона должен быть строкой"})
    @IsPhoneNumber('RU', {message: "Некорректный номер телефона"})
    readonly phone_number: string
}