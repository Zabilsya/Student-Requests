import {Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {RequestTemplatesService} from "./request-templates.service";
import {CreateRequestTemplateDto} from "./dto/create-request-template.dto";
import {UpdateRequestTemplateDto} from "./dto/update-request-template.dto";
import {RequestsService} from "../requests/requests.service";

@Controller('request-templates')
export class RequestTemplatesController {

    constructor(
        private requestTemplatesService: RequestTemplatesService,
        private requestsServices: RequestsService)
    {}


    @UseGuards(JwtAuthGuard)
    @Get('/get')
    get(@Query() query) {
        return this.requestTemplatesService.getTemplates(query)
    }


    @UseGuards(JwtAuthGuard)
    @Get('/get-all')
    getAll() {
        return this.requestTemplatesService.getAllTemplates()
    }


    @UseGuards(JwtAuthGuard)
    @Get('/get-list')
    getList(@Req() request) {
        return this.requestsServices.getTemplatesByUser(request.user)
    }


    @UseGuards(JwtAuthGuard)
    @Post('/create')
    create(@Body() dto: CreateRequestTemplateDto) {
        return this.requestTemplatesService.createTemplate(dto)
    }


    @UseGuards(JwtAuthGuard)
    @Put('/update')
    update(@Body() dto: UpdateRequestTemplateDto) {
        return this.requestTemplatesService.updateTemplate(dto)
    }


    @UseGuards(JwtAuthGuard)
    @Delete('/delete/:id')
    delete(@Param('id') id: number) {
        return this.requestTemplatesService.deleteTemplate(id)
    }
}
