import {Controller, Get, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {GroupsService} from "./groups.service";

@Controller('groups')
export class GroupsController {
    constructor(private groupsService: GroupsService) {}

    @UseGuards(JwtAuthGuard)
    @Get('/get-all')
    get() {
        return this.groupsService.getGroups()
    }
}
