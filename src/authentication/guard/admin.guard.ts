import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { AccountJwt } from "../entity/account-jwt.entity";
import { Role } from "src/casl/enum/role.enum";

@Injectable()
export class AdminAuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        const accountJwt = req['accountJwt'] as AccountJwt;
        return accountJwt.role === Role.ADMIN;
    }
}