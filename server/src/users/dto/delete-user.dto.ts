import {IsNumber} from "class-validator";

export class DeleteUserDto {
    @IsNumber({}, {message: 'Идентификатор должен быть числом'})
    readonly id: number
}