import {forwardRef, Module} from '@nestjs/common';
import { RecoveryTokensService } from './recovery-tokens.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {RecoveryToken} from "./recovery-tokens.model";
import {UsersModule} from "../users/users.module";

@Module({
  providers: [RecoveryTokensService],
  imports: [
    SequelizeModule.forFeature([RecoveryToken]),
    forwardRef(() => UsersModule),
  ],
  exports: [RecoveryTokensService]
})
export class RecoveryTokensModule {}
