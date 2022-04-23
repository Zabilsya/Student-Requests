import {
    Body,
    Controller,
    Delete,
    Get,
    Post,
    Put,
    Query,
    Req,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {DeleteUserDto} from "./dto/delete-user.dto";
import {UpdateProfileDto} from "./dto/update-profile.dto";
import {FileInterceptor} from "@nestjs/platform-express";
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
    @UseInterceptors(FileInterceptor('image'))
    updateProfile(@Body() dto: UpdateProfileDto, @UploadedFile() image, @Req() request) {
        return this.usersService.updateUserById(request.user.id, dto, image)
    }


    @UseGuards(JwtAuthGuard)
    @Put('/update')
    update(@Body() dto: UpdateUserDto) {
        return this.usersService.updateUser(dto)
    }


    @Delete('/delete')
    delete(@Body() dto: DeleteUserDto) {
        return this.usersService.deleteUser(dto)
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
