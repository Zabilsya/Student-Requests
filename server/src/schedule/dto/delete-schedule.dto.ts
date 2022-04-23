import {IsNumber} from "class-validator";

export class DeleteScheduleDto {
    @IsNumber({}, {message: 'Идентификатор должен быть числом'})
    readonly id: number
}