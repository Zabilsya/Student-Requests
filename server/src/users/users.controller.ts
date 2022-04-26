import {
    Body,
    Controller,
    Delete,
    Get, Param,
    Post,
    Put,
    Query,
    Req,
    UploadedFiles,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {UpdateProfileDto} from "./dto/update-profile.dto";
import {FileFieldsInterceptor, FileInterceptor} from "@nestjs/platform-express";
import {UpdateUserDto} from "./dto/update-user.dto";

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    // @UseGuards(JwtAuthGuard)
    @Post('/create')
    create(@Body() dto: CreateUserDto) {
        return this.usersService.createUser(dto)
    }


    @UseGuards(JwtAuthGuard)
    @Put('/update-profile')
    @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 }]))
    updateProfile(@Body() dto: UpdateProfileDto, @Req() request, @UploadedFiles() file: { image?: Express.Multer.File }) {
        return this.usersService.updateUserById(request.user.id, dto, file)
    }


    @UseGuards(JwtAuthGuard)
    @Put('/update')
    update(@Body() dto: UpdateUserDto) {
        return this.usersService.updateUser(dto)
    }


    @UseGuards(JwtAuthGuard)
    @Delete('/delete/:id')
    delete(@Param('id') id: number) {
        return this.usersService.deleteUser(id)
    }


    @UseGuards(JwtAuthGuard)
    @Get('/get-all-users')
    getAllUsers(@Query() query) {
        return this.usersService.getAllUsers(query)
    }


    @UseGuards(JwtAuthGuard)
    @Get('/get-profile')
    getProfile(@Req() request) {
        return this.usersService.getUserById(request.user.id)
    }
}
