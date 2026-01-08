import { Body, Controller, Get, Post, UsePipes } from "@nestjs/common";
import { AuthenticationService } from "../service/authentication.service";
import { ZodValidationPipe } from "src/common/pipe/zod-validation.pipe";
import { ZaloTokenDtoRequest, ZaloTokenDtoRequestSchema } from "../dto/zalo-token.dto.request";

@Controller('auth')
export class AuthenticationController {
    constructor(
        private authService: AuthenticationService,
    ) { }

    @Post('zalo-login')
    @UsePipes(new ZodValidationPipe(ZaloTokenDtoRequestSchema))
    async zaloUserLogIn(@Body() zaloTokenDtoRequest: ZaloTokenDtoRequest): Promise<{ accessToken: string }> {
        return await this.authService.loginUser(zaloTokenDtoRequest.zaloAccessToken);
    }
}