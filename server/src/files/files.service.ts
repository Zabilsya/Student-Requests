import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import * as path from 'path'
import * as fs from 'fs'
import * as uuid from 'uuid'
import {existsSync} from "fs";

interface ICreatedFile {
    path: string
    name: string
}

@Injectable()
export class FilesService {

    async createFile(file: any, fileDirectory: string): Promise<ICreatedFile> {
        try {
            const format = path.extname(file.originalname)
            const fileName = uuid.v4() + format
            const filePath = path.resolve(__dirname, '..', `static/${fileDirectory}`)
            if (!existsSync(filePath)) {
                fs.mkdirSync(filePath, {recursive: true})
            }
            const fullPath = path.join(filePath, fileName)
            const partPath = path.join(fileDirectory, fileName)
            fs.writeFileSync(fullPath, file.buffer)
            return {path: partPath, name: file.originalname}
        } catch (e) {
            throw new HttpException('Произошла ошибка при записи файлов', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async deleteFile(filePath: string): Promise<boolean> {
        try {
            const fullPath = path.resolve(__dirname, '..', `static/${filePath}`)
            if (existsSync(fullPath)) {
                fs.unlinkSync(fullPath)
            }
            return true
        } catch (e) {
            throw new HttpException('Произошла ошибка при удалении файлов', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
