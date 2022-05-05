import {IsNumberString} from "class-validator";

export class UpdateRequestDto {
    @IsNumberString({}, {message: 'Идентификатор запроса должен быть числовым'})
    readonly id: number

    @IsNumberString({}, {message: 'Идентификатор статуса запроса должен быть числовым'})
    readonly status_id: number
}