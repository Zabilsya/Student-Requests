import {IsNumber, IsNumberString, IsOptional, IsString} from "class-validator";

export class CreateNewsDto {

    @IsString({message: 'Заголовок должен быть строкой'})
    readonly title: string

    @IsString({message: 'Текст новости должна быть строкой'})
    readonly text: string

    @IsNumberString({},{each: true, message: 'Группы должны быть массивом'})
    readonly groups_id: number[]
}