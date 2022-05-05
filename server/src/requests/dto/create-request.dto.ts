import {IsNumberString} from "class-validator";

export class CreateRequestDto {
    @IsNumberString({}, {message: 'Идентификатор шаблона запроса должен быть числовым'})
    readonly template_id: number
}