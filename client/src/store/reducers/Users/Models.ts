import {UserTypes} from "../../../const";

export interface IGroup {
    id: number
    name: string
}

export interface IUser {
    id: number
    name: string
    surname: string
    patronymic: string
    email: string
    date_of_birth: Date
    group: IGroup
    position: string
    phone_number: string
    user_type: number
}

export interface IUserFilter {
    page: number
    user_type: UserTypes
}