import {IsBoolean, IsNumber, IsObject, IsOptional, IsString} from "class-validator";
import {NewsFile} from "../news-file.model";

export class UpdateNewsDto {

    @IsNumber({},{message: 'Идентификатор должен быть числом'})
    readonly id: number

    @IsOptional()
    @IsString({message: 'Заголовок должен быть строкой'})
    readonly title?: string

    @IsOptional()
    @IsString({message: 'Текст новости должен быть строкой'})
    readonly text?: string

    @IsBoolean({message: 'Флаг дял изменения списка групп должен быть логическим значением'})
    readonly is_groups_change: boolean

    @IsOptional()
    @IsNumber({},{each: true, message: 'Группы должны быть массивом'})
    readonly groups_id?: number[]

    @IsOptional()
    @IsObject({each: true, message: 'Список файлов должен быть массивом объектов'})
    readonly deleted_docs?: NewsFile[]
}