import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import { ZodValidationPipe } from "src/common/pipe/zod-validation.pipe";
import { AuthenticationService } from "../service/authentication.service";
import { ZaloTokenDto, ZaloTokenDtoSchema } from "../dto/zalo-token.dto";
import { EmployeeLoginDto, EmployeeLoginDtoSchema } from "../dto/employee-login.dto";

@Controller('auth')
export class AuthenticationController {
    constructor(
        private authService: AuthenticationService,
    ) { }

    @Post('zalo-login')
    @UsePipes(new ZodValidationPipe(ZaloTokenDtoSchema))
    async zaloUserLogIn(@Body() zaloTokenDtoRequest: ZaloTokenDto): Promise<{ accessToken: string }> {
        return await this.authService.loginUser(zaloTokenDtoRequest.zaloAccessToken);
    }

    @Post('employee-login')
    @UsePipes(new ZodValidationPipe(EmployeeLoginDtoSchema))
    async employeeLogin(@Body() employeeLogin: EmployeeLoginDto): Promise<{ accessToken: string }> {
        return await this.authService.loginEmployee(employeeLogin);
    }
}