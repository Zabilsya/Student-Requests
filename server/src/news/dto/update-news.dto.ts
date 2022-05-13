import {IsBoolean, IsBooleanString, IsNumber, IsNumberString, IsObject, IsOptional, IsString} from "class-validator";
import {NewsFile} from "../news-file.model";

export class UpdateNewsDto {

    @IsString({message: 'Идентификатор должен быть строкой'})
    readonly id: number

    @IsOptional()
    @IsString({message: 'Заголовок должен быть строкой'})
    readonly title?: string

    @IsOptional()
    @IsString({message: 'Текст новости должен быть строкой'})
    readonly text?: string

    @IsBooleanString({message: 'Флаг для подтверждения изменения списка групп должен иметь логическое значение'})
    readonly is_groups_change: boolean

    @IsOptional()
    @IsBooleanString({message: 'Флаг для подтверждения удаления картинки должен иметь логическое значение'})
    readonly is_delete_image: boolean

    @IsOptional()
    @IsNumberString({},{each: true, message: 'Группы должны быть массивом'})
    readonly groups_id?: number[]

    @IsOptional()
    @IsString({each: true, message: 'Список файлов должен быть массивом объектов'})
    readonly deleted_files?: string
}