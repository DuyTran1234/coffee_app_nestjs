import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Role } from "src/casl/enum/role.enum";
import { ROLE_KEY } from "src/common/decorator/role.decorator";
import { AccountJwt } from "../entity/account-jwt.entity";

@Injectable()
export class AuthenticationGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private reflector: Reflector,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        const token = this.getTokenFromHeader(req);
        if (!token) {
            throw new UnauthorizedException('accessToken not found');
        }
        try {
            const accountJwt = await this.jwtService.verifyAsync(token) as AccountJwt;
            const requireRoles = this.reflector.getAllAndOverride<Role[]>(ROLE_KEY, [
                context.getHandler(), context.getClass()
            ]);
            if (!requireRoles) {
                return true;
            }
            const checkRole = requireRoles.some((role: Role) => role === accountJwt.role);
            if (!checkRole) {
                throw new UnauthorizedException('restricted authorized');
            }
            req['accountJwt'] = accountJwt;
        } catch (error) {
            throw new UnauthorizedException(error?.message ?? 'accessToken invalid')
        }
        return true;
    }

    getTokenFromHeader(request: Request): string | null {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : null;
    }
}