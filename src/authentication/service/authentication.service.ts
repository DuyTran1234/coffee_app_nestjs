import { BadRequestException, HttpException, Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "src/user/service/user.service";
import { CreateUserDtoRequest } from "src/user/dto/request/create-user.dto.request";
import { JwtService } from "@nestjs/jwt";
import { AccountJwt } from "../entity/account-jwt.entity";

@Injectable()
export class AuthenticationService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) { }

    async handleZaloAccessToken(accessToken: string): Promise<{ username: string, fullname: string }> {
        const res = await fetch('https://graph.zalo.me/v2.0/me', {
            method: 'GET',
            headers: {
                'access_token': accessToken,
                'Content-Type': 'application/json',
            }
        });
        if (!res.ok) {
            throw new BadRequestException('zalo api login error');
        }
        const data = await res.json();
        if (data.error != 0) {
            throw new BadRequestException('access_token zalo invalid');
        }
        return {
            username: data.id,
            fullname: data.name,
        };
    }

    async loginUser(accessToken: string): Promise<{ accessToken: string }> {
        const zaloUser = await this.handleZaloAccessToken(accessToken) as CreateUserDtoRequest;
        const user = await this.userService.createUser(zaloUser);
        if (!user) {
            throw new UnauthorizedException('login user error');
        }
        const payload = {
            id: user.id,
            username: user.username,
            role: user.role,
        } as AccountJwt;
        return {
            accessToken: await this.jwtService.signAsync(payload),
        };
    }
}