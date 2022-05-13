import {IsNumberString, IsObject, IsOptional, IsString} from "class-validator";

export class UpdateScheduleDto {
    @IsNumberString({}, {message: 'Идентификатор должен быть числом или строкой'})
    readonly id: number

    @IsOptional()
    @IsString({message: 'Заголовок должен быть строкой'})
    readonly title?: string

    @IsOptional()
    @IsString({each: true, message: 'Список файлов должен быть массивом объектов'})
    readonly deleted_files?: string
}