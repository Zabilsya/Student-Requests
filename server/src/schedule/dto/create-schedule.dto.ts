import {IsString} from "class-validator";

export class CreateScheduleDto {
    @IsString({message: 'Заголовок должен быть строкой'})
    readonly title: string
}