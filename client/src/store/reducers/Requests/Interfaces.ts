import {IUser} from "../Users/Models";
import {IRequestTemplate} from "../RequestTemplates/Models";
import {IFile} from "../../../types/file";
import {RequestStatuses} from "../../../const";

export interface IStatus {
    id: number,
    name: string
}

export interface IRequest {
    id: number
    template: IRequestTemplate
    creator_user: IUser
    acceptor_user: IUser | null
    status: IStatus
    files: IFile[]
    messages: IMessage[]
    createdAt: string
    updatedAt: string
}

export interface IRequestFilter {
    page: number
    template_id: number,
    status_id: RequestStatuses
}

export interface ICreateRequest {
    template_id: number,
    files: File[]
}

export interface IMessage {
    id: number
    text: string
    request: IRequest
    author: IUser
    is_files: boolean
    createdAt: string
}

export interface ICreateMessage {
    text: string
    request_id: number
    author_id: number
}