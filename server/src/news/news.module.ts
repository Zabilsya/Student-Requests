import { Module } from '@nestjs/common';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import {AuthModule} from "../auth/auth.module";
import {SequelizeModule} from "@nestjs/sequelize";
import {News} from "./news.model";
import {NewsGroup} from "./news-group.model";
import {NewsFile} from "./news-file.model";
import {FilesModule} from "../files/files.module";
import {UsersModule} from "../users/users.module";

@Module({
  controllers: [NewsController],
  providers: [NewsService],
  imports: [
      SequelizeModule.forFeature([News, NewsGroup, NewsFile]),
      AuthModule,
      UsersModule,
      FilesModule
  ]
})
export class NewsModule {}
