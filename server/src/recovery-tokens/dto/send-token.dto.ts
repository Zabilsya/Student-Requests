import {IsEmail, IsString} from "class-validator";

export class SendTokenDto {
    @IsString({message: 'Email должен быть строкой'})
    @IsEmail({},{message: 'Неккоректный Email'})
    readonly email: string
}