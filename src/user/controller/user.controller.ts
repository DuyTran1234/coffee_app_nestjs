import { Body, Controller, Get, Param, Post, Req, UseGuards, UsePipes } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { AccountJwt } from "src/authentication/entity/account-jwt.entity";
import { AuthenticationGuard } from "src/authentication/guard/authentication.guard";
import { Role } from "src/casl/enum/role.enum";
import { Roles } from "src/common/decorator/role.decorator";
import { ZodValidationPipe } from "src/common/pipe/zod-validation.pipe";
import { ReadUserDtoRequestSchema } from "../dto/request/read-user.dto.request";
import { UpdateUserDtoRequeset, UpdateUserDtoRequesetSchema } from "../dto/request/update-user.dto.request";
import { UserDtoResponse } from "../dto/response/user.dto.response";
import { UserService } from "../service/user.service";

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService,
    ) { }

    @Post('update-user')
    @Roles(Role.USER, Role.EMPLOYEE, Role.ADMIN)
    @UseGuards(AuthenticationGuard)
    @UsePipes(new ZodValidationPipe(UpdateUserDtoRequesetSchema))
    async updateUser(@Req() req: Request,
        @Body() updateUserDto: UpdateUserDtoRequeset): Promise<UserDtoResponse> {
        const accountJwt = req['accountJwt'] as AccountJwt;
        const updateUser = await this.userService.updateUser(accountJwt, updateUserDto);
        return plainToInstance(UserDtoResponse, updateUser);
    }

    @Get('get-user/:id')
    @Roles(Role.USER, Role.EMPLOYEE, Role.ADMIN)
    @UseGuards(AuthenticationGuard)
    async getUser(@Req() req: Request,
        @Param('id', new ZodValidationPipe(ReadUserDtoRequestSchema)) id: number)
        : Promise<UserDtoResponse> {
        const accountJwt = req['accountJwt'] as AccountJwt;
        const getUser = await this.userService.getUserById(accountJwt, id);
        return plainToInstance(UserDtoResponse, getUser);
    }
}