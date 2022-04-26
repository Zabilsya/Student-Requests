import {IsBoolean, IsNumber, IsOptional, IsString} from "class-validator";

export class UpdateRequestTemplateDto {

    @IsNumber({},{message: 'Идентификатор должен быть числом'})
    readonly id: number

    @IsOptional()
    @IsString({message: 'Название должно быть строкой'})
    readonly name: string

    @IsOptional()
    @IsNumber({}, {message: 'Идентификатор пользователя должен быть числовым'})
    readonly user_id: number

    @IsOptional()
    @IsBoolean({message: 'Поле оффлайн-записи должно быть логическим'})
    readonly is_offline: boolean
}