import {IsDateString, IsEmail, IsNumber, IsOptional, IsPhoneNumber, IsString} from "class-validator";

export class CreateUserDto {
    @IsNumber({}, {message: 'Некорректный тип пользователя'})
    readonly user_type: number

    @IsString({message: 'Имя должно быть строкой'})
    readonly name: string

    @IsString({message: 'Фамилия должна быть строкой'})
    readonly surname: string

    @IsOptional()
    @IsString({message: 'Отчество должно быть строкой'})
    readonly patronymic?: string

    @IsString({message: 'Email должен быть строкой'})
    @IsEmail({},{message: 'Неккоректный Email'})
    readonly email: string

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