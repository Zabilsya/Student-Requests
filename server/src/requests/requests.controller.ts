import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    Query,
    Req,
    UploadedFiles,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {CreateRequestDto} from "./dto/create-request.dto";
import {RequestsService} from './requests.service'
import {FileFieldsInterceptor} from "@nestjs/platform-express";
import {UpdateRequestDto} from "./dto/update-request.dto";
import {CreateMessageDto} from "./dto/create-message.dto";

@Controller('requests')
export class RequestsController {

    constructor(private requestService: RequestsService) {}


    @UseGuards(JwtAuthGuard)
    @Get('/get-all')
    getAllRequests(@Query() query, @Req() request) {
        return this.requestService.getAllRequests(request.user, query)
    }


    @UseGuards(JwtAuthGuard)
    @Get('/get/:id')
    getRequest(@Req() request, @Param('id') id: number) {
        return this.requestService.getRequestById(id, request.user)
    }


    @UseGuards(JwtAuthGuard)
    @Post('/create')
    @UseInterceptors(FileFieldsInterceptor([{ name: 'files', maxCount: 100 }]))
    create(@Req() request, @Body() dto: CreateRequestDto, @UploadedFiles() files?: Express.Multer.File[]) {
        return this.requestService.createRequest(request.user.id, dto, files)
    }


    @UseGuards(JwtAuthGuard)
    @Put('/update')
    update(@Req() request, @Body() dto: UpdateRequestDto) {
        return this.requestService.updateRequest(request.user.id, dto)
    }


    @UseGuards(JwtAuthGuard)
    @Post('/create-message-files')
    @UseInterceptors(FileFieldsInterceptor([{ name: 'files', maxCount: 10 }]))
    createMessageFiles(@Body() dto: CreateMessageDto, @UploadedFiles() files?: Express.Multer.File[]) {
        return this.requestService.createMessageAndFiles(dto, files)
    }
}
