import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {FilesService} from "../files/files.service";
import {News} from "./news.model";
import {CreateNewsDto} from "./dto/create-news.dto";
import {NewsGroup} from "./news-group.model";
import {NewsFile} from "./news-file.model";
import PaginateService from "../paginate/paginate.service";
import {UsersService} from "../users/users.service";
import {UpdateNewsDto} from "./dto/update-news.dto";

@Injectable()
export class NewsService {
    private docsDirectory = 'news/docs'
    private imageDirectory = 'news/images'

    constructor(
        @InjectModel(News) private newsRepository: typeof News,
        @InjectModel(NewsGroup) private newsGroupRepository: typeof NewsGroup,
        @InjectModel(NewsFile) private newsFileRepository: typeof NewsFile,
        private usersService: UsersService,
        private fileService: FilesService
    ) {}


    async createNews(dto: CreateNewsDto, files: any): Promise<News> {
        let imagePath = ''
        if (files.image) {
            imagePath = await this.saveImage(files.image[0])
        }
        const news = await this.newsRepository.create({title: dto.title, text: dto.text, image: imagePath})
        if (files.docs) {
            await this.saveDocs(news.id, files.docs)
        }
        await this.saveNewsGroup(news.id, dto.groups_id)

        return news
    }


    async getNews(query: any, userData: any) {
        const searchQuery = await this.getSearchQueryForNews(userData)
        const limit = 4
        const { page, offset } = PaginateService.getPaginateParams(limit, query.page)
        const news = await this.newsRepository.findAndCountAll(
            {
                offset,
                limit,
                ...searchQuery
            })

        return {...news, page, totalPages: PaginateService.getTotalPages(limit, news.count)}
    }


    async updateNews(dto: UpdateNewsDto, files: any): Promise<News> {
        const news = await this.getNewsById(dto.id)
        let imagePath = news.image
        if (files.image) {
            await this.deleteImage(news.image)
            imagePath = await this.saveImage(files.image[0])
        }
        if (dto.deleted_docs) {
            await this.deleteDocs(dto.deleted_docs)
        }
        if (dto.is_groups_change) {
            await this.deleteNewsGroups(dto.id)
            await this.saveNewsGroup(news.id, dto.groups_id)
        }
        if (files.docs) {
            await this.saveDocs(news.id, files.docs)
        }
        return await news.update({
            title: dto.title || news.title,
            text: dto.text || news.text,
            image: imagePath
        })
    }


    async deleteNews(id: number) {
        const news = await this.getNewsById(id)
        const newsDocs = await this.newsFileRepository.findAll({where: {news_id: id}})
        await this.deleteDocs(newsDocs)
        await this.deleteImage(news.image)
        await this.deleteNewsGroups(id)
        return await this.newsRepository.destroy({where: {id}})
    }


    async getNewsById(id: number, userData?: any): Promise<News> {
        const news = await this.newsRepository.findOne({where: {id}, include: {all: true}})
        if (!news) {
            throw new HttpException('Новости с таким идентификатором не существует', HttpStatus.NOT_FOUND)
        }
        if (userData && userData.user_type === 3) {
            const user = await this.usersService.getUserById(userData.id)
            const newsGroup = await this.newsGroupRepository.findOne({where: {news_id: id, group_id: user.group_id}})
            if (!newsGroup) {
                throw new HttpException('Вы не имеете доступ к этой новости', HttpStatus.BAD_GATEWAY)
            }
        }
        return news
    }


    async getSearchQueryForNews(userData: any) {
        let searchQuery: object = {include: {all: true}, distinct: true}
        if (userData.user_type === 3) {
            const { group_id } = await this.usersService.getUserById(userData.id)
            const news = await this.newsGroupRepository.findAll({where: {group_id}})
            searchQuery = {...searchQuery, where: {id: news.map(news => news.news_id)}}
        }
        return searchQuery
    }


    private async saveNewsGroup(newsId: number, groupsId: number[]): Promise<void> {
        for (let i = 0; i < groupsId.length; i++) {
            await this.newsGroupRepository.create({news_id: newsId, group_id: groupsId[i]})
        }
    }


    private async saveImage(file: any): Promise<string> {
        const {path} = await this.fileService.createFile(file, this.imageDirectory)
        return path
    }


    private async saveDocs(newsId: number, files: any[]): Promise<void> {
        for (let i = 0; i < files.length; i++) {
            const fileData = await this.fileService.createFile(files[i], this.docsDirectory)
            await this.newsFileRepository.create({file_name: files[i].originalname, file_path: fileData.path, news_id: newsId})
        }
    }


    private async deleteNewsGroups(newsId: number): Promise<number> {
        return await this.newsGroupRepository.destroy({where: {news_id: newsId}})
    }


    private async deleteImage(filePath: string): Promise<boolean> {
        return await this.fileService.deleteFile(filePath)
    }


    private async deleteDocs(filesData: NewsFile[]): Promise<void> {
        for (let i = 0; i < filesData.length; i++) {
            await this.newsFileRepository.destroy({where: {id: filesData[i]['id']}})
            await this.fileService.deleteFile(filesData[i]['file_path'])
        }
    }
}
