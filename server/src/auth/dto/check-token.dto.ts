import {IsString} from "class-validator";

export class CheckTokenDto {
    @IsString({message: 'Email должен быть строкой'})
    readonly token: string
}