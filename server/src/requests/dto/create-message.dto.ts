import {IsNumberString, IsOptional, IsString} from "class-validator";

export class CreateMessageDto {
    @IsNumberString({}, {message: 'Идентификатор автора сообщения должен быть числовым'})
    readonly author_id: number

    @IsNumberString({}, {message: 'Идентификатор обращения должен быть числовым'})
    readonly request_id: number

    @IsOptional()
    @IsString({message: 'Текст сообщения должен быть строкой'})
    readonly text: string
}