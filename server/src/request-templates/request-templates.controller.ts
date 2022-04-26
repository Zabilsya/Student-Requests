import {Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {RequestTemplatesService} from "./request-templates.service";
import {CreateRequestTemplateDto} from "./dto/create-request-template.dto";
import {UpdateRequestTemplateDto} from "./dto/update-request-template.dto";

@Controller('request-templates')
export class RequestTemplatesController {

    constructor(private requestTemplatesService: RequestTemplatesService) {}


    @UseGuards(JwtAuthGuard)
    @Get('/get-all')
    get(@Query() query) {
        return this.requestTemplatesService.getTemplates(query)
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
