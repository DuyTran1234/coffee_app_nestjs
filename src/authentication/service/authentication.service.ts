import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { HashServiceHelper } from "src/common/hash/hash-service";
import { EmployeeAuthService } from "src/employee/service/employee-auth.service";
import { CreateUserDtoRequest } from "src/user/dto/request/create-user.dto.request";
import { UserAuthService } from "src/user/service/user-auth.service";
import { EmployeeLoginDto } from "../dto/employee-login.dto";
import { AccountJwt } from "../entity/account-jwt.entity";

@Injectable()
export class AuthenticationService {
    constructor(
        private userAuthService: UserAuthService,
        private employeeAuthService: EmployeeAuthService,
        private jwtService: JwtService,
    ) { }

    async handleZaloAccessToken(accessToken: string): Promise<CreateUserDtoRequest> {
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

    async loginUser(zaloToken: string): Promise<{ accessToken: string }> {
        const zaloUser = await this.handleZaloAccessToken(zaloToken);
        const user = await this.userAuthService.createUserWithToken(zaloUser);
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

    async loginEmployee(employeeLogin: EmployeeLoginDto): Promise<{ accessToken: string }> {
        const employee = await this.employeeAuthService.getEmployeeByUsername(employeeLogin.username);
        if (!employee) {
            throw new UnauthorizedException('login employee error');
        }
        const checkPwd = await HashServiceHelper.compareHash(employeeLogin.pwd, employee.pwd);
        if (!checkPwd) {
            throw new UnauthorizedException('wrong password');
        }
        const payload = {
            id: employee.id,
            username: employee.username,
            role: employee.role,
        } as AccountJwt;
        const token = await this.jwtService.signAsync(payload);
        return {
            accessToken: token,
        };
    }
}