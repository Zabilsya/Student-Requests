import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {SequelizeModule} from "@nestjs/sequelize";
import { UsersModule } from './users/users.module';
import {ConfigModule} from "@nestjs/config";
import {User} from "./users/users.model";
import {UserType} from "./users/user-types.model";
import { GroupsModule } from './groups/groups.module';
import {Group} from "./groups/groups.model";
import { AuthModule } from './auth/auth.module';
import { RecoveryTokensModule } from './recovery-tokens/recovery-tokens.module';
import {RecoveryToken} from "./recovery-tokens/recovery-tokens.model";
import { ScheduleModule } from './schedule/schedule.module';
import { FilesModule } from './files/files.module';
import {ServeStaticModule} from "@nestjs/serve-static";
import { RequestTemplatesModule } from './request-templates/request-templates.module';
import {Schedule} from "./schedule/schedule.model";
import {ScheduleTitle} from "./schedule/schedule-title.model";
import * as path from 'path'
import {RequestTemplate} from "./request-templates/request-templates.model";
import { NewsModule } from './news/news.module';
import {News} from "./news/news.model";
import {NewsGroup} from "./news/news-group.model";
import {NewsFile} from "./news/news-file.model";


@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
      ConfigModule.forRoot({
          envFilePath: '.env'
      }),
      ServeStaticModule.forRoot({
          rootPath: path.resolve(__dirname, 'static')
      }),
      SequelizeModule.forRoot({
        dialect: 'postgres',
        host: process.env.DATABASE_HOST,
        port: +process.env.DATABASE_PORT,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        models: [User, UserType, Group, RecoveryToken, Schedule, ScheduleTitle, RequestTemplate, News, NewsGroup, NewsFile],
        autoLoadModels: true
      }),
      UsersModule,
      GroupsModule,
      AuthModule,
      RecoveryTokensModule,
      ScheduleModule,
      FilesModule,
      RequestTemplatesModule,
      NewsModule
  ],
})
export class AppModule {}
