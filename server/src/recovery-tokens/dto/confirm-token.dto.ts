import {IsEmail, IsString} from "class-validator";

export class ConfirmTokenDto {
    @IsString({message: 'Email должен быть строкой'})
    @IsEmail({},{message: 'Неккоректный Email'})
    readonly email: string
    @IsString({message: 'Код должен быть строкой'})
    readonly token: string
}