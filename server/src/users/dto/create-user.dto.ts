export class CreateUserDto {
    readonly user_type: number
    readonly name: string
    readonly surname: string
    readonly patronymic?: string
    readonly email: string
    readonly group_name?: string
    readonly position?: string
}