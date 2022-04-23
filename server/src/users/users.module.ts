import {forwardRef, Module} from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./users.model";
import {UserType} from "./user-types.model";
import {GroupsModule} from "../groups/groups.module";
import {AuthModule} from "../auth/auth.module";
import {FilesModule} from "../files/files.module";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
      SequelizeModule.forFeature([User, UserType]),
      GroupsModule,
      FilesModule,
      forwardRef(() => AuthModule)
  ],
  exports: [
      UsersService
  ]
})
export class UsersModule {}
