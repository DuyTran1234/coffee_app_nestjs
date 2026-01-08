import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class AuthenticationGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        const token = this.getTokenFromHeader(req);
        if (!token) {
            throw new UnauthorizedException('accessToken not found');
        }
        try {
            const accountJwt = await this.jwtService.verifyAsync(token);
            req['accountJwt'] = accountJwt;
        } catch (error) {
            throw new UnauthorizedException('accessToken invalid')
        }
        return true;
    }

    getTokenFromHeader(request: Request): string | null {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : null;
    }
}