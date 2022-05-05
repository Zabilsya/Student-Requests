import {IFile} from "../../../types/file";

export interface ISchedule {
    id: number
    title: string
    files: IFile[]
}