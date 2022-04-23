import {IsDateString, IsEmail, IsNumber, IsOptional, IsPhoneNumber, IsString} from "class-validator";

export class UpdateUserDto {
    @IsNumber({}, {message: 'Идентификатор должен быть числом'})
    readonly id: number

    @IsOptional()
    @IsNumber({}, {message: 'Некорректный тип пользователя'})
    readonly user_type: number

    @IsOptional()
    @IsString({message: 'Имя должно быть строкой'})
    readonly name: string

    @IsOptional()
    @IsString({message: 'Фамилия должна быть строкой'})
    readonly surname: string

    @IsOptional()
    @IsString({message: 'Отчество должно быть строкой'})
    readonly patronymic?: string

    @IsOptional()
    @IsString({message: 'Email должен быть строкой'})
    @IsEmail({},{message: 'Неккоректный Email'})
    readonly email: string

    @IsOptional()
    @IsString({message: "Номер телефона должен быть строкой"})
    @IsPhoneNumber('RU', {message: "Некорректный номер телефона"})
    readonly phone_number: string

    @IsDateString({}, {message: "Неккоретная дата рождения"})
    date_of_birth: Date

    @IsOptional()
    @IsString({message: 'Группа должна быть строкой'})
    readonly group_name?: string

    @IsOptional()
    @IsString({message: 'Должность должна быть строкой'})
    readonly position?: string
}