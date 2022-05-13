import {IFile} from "../../../types/file";
import {IGroup} from "../Users/Models";
import {ImageType} from "react-images-uploading";
import {IOption} from "../../../types/select";

export interface INews {
    id: number
    title: string
    text: string
    image: string
    files: IFile[]
    groups: IGroup[]
    updatedAt: string
}

export interface IChangeNews {
    id: number
    title: string
    text: string
    groups: IOption[]
    files: File[]
    image: ImageType | null
    isGroupsChange: boolean
    filesFromServer: IFile[]
    deletedFiles: IFile[]
}