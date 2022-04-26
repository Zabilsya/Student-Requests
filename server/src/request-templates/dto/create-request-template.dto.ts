import {IsBoolean, IsNumber, IsString} from "class-validator";

export class CreateRequestTemplateDto {
    @IsString({message: 'Название должно быть строкой'})
    readonly name: string

    @IsNumber({}, {message: 'Идентификатор пользователя должен быть числовым'})
    readonly user_id: number

    @IsBoolean({message: 'Поле оффлайн-записи должно быть логическим'})
    readonly is_offline: boolean
}