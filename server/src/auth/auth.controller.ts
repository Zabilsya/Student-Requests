import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {LoginDto} from "./dto/login.dto";
import {SendTokenDto} from "../recovery-tokens/dto/send-token.dto";
import {RecoveryTokensService} from "../recovery-tokens/recovery-tokens.service";
import {ConfirmTokenDto} from "../recovery-tokens/dto/confirm-token.dto";
import {ChangePasswordDto} from "./dto/change-password.dto";

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService,
        private recoveryTokensService: RecoveryTokensService,
    ) {}


    @Post('/login')
    login(@Body() dto: LoginDto) {
        return this.authService.login(dto)
    }


    @Post('/send-token')
    sendToken(@Body() dto: SendTokenDto) {
        return this.recoveryTokensService.sendTokenToEmail(dto)
    }


    @Post('/confirm-token')
    confirmToken(@Body() dto: ConfirmTokenDto) {
        return this.recoveryTokensService.isValidToken(dto)
    }


    @Post('/change-password')
    changePassword(@Body() dto: ChangePasswordDto) {
        return this.authService.changePassword(dto)
    }
}
