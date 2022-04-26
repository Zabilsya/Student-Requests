import {
    Body,
    Controller,
    Delete,
    Get, Param,
    Post,
    Put,
    Query,
    Req,
    UploadedFile, UploadedFiles,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {FileFieldsInterceptor} from "@nestjs/platform-express";
import {NewsService} from "./news.service";
import {CreateNewsDto} from "./dto/create-news.dto";
import {UpdateNewsDto} from "./dto/update-news.dto";

@Controller('news')
export class NewsController {

    constructor(private newsService: NewsService) {}


    @UseGuards(JwtAuthGuard)
    @Post('/create')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'image', maxCount: 1 },
        { name: 'docs', maxCount: 10 }
    ]))
    create(@Body() dto: CreateNewsDto, @UploadedFiles() files: { image?: Express.Multer.File, docs?: Express.Multer.File[] }) {
        return this.newsService.createNews(dto, files)
    }


    @UseGuards(JwtAuthGuard)
    @Put('/update')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'image', maxCount: 1 },
        { name: 'docs', maxCount: 10 }
    ]))
    update(@Body() dto: UpdateNewsDto, @UploadedFiles() files: { image?: Express.Multer.File, docs?: Express.Multer.File[] }) {
        return this.newsService.updateNews(dto, files)
    }


    @Delete('/delete/:id')
    delete(@Param('id') id: number) {
        return this.newsService.deleteNews(id)
    }


    @UseGuards(JwtAuthGuard)
    @Get('/get-all')
    getAllNews(@Query() query, @Req() request) {
        return this.newsService.getNews(query, request.user)
    }


    @UseGuards(JwtAuthGuard)
    @Get('/get/:id')
    getProfile(@Req() request, @Param('id') id: number) {
        return this.newsService.getNewsById(id, request.user)
    }
}