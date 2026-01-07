import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthenticationService } from "../service/authentication.service";

@Controller('auth')
export class AuthenticationController {
    constructor(
        private authService: AuthenticationService,
    ) { }

    @Post('zalo-login')
    async zaloUserLogIn(@Body() { accessToken }: any): Promise<{ username, fullname } | null> {
        const data = await this.authService.zaloUserLogIn(accessToken);
        return {
            username: data.id,
            fullname: data.name,
        };
    }
}