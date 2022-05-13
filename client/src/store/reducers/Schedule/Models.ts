import {IFile} from "../../../types/file";

export interface ISchedule {
    id: number
    title: string
    files: IFile[]
}

export interface IChangeSchedule {
    id: number
    title: string
    files: File[]
    filesFromServer: IFile[]
    deletedFiles: IFile[]
}