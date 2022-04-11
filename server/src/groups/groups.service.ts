import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Group} from "./groups.model";

@Injectable()
export class GroupsService {
    constructor(@InjectModel(Group) private groupRepository: typeof Group) {}

    async createGroup(name: string): Promise<number> {
        const nameUpper = name.toUpperCase()
        const group = await this.groupRepository.findOne({where: {name: nameUpper}})
        if (group) {
            return group.id
        }
        const newGroup = await this.groupRepository.create({name: nameUpper})
        return newGroup.id
    }
}
