import {IUser} from "../Users/Models";

export interface IRequestTemplate {
    id: number
    name: string
    is_offline: boolean
    user: IUser
}

export interface IChangeTemplate {
    id?: number
    name: string
    is_offline: boolean
    user_id: number
}