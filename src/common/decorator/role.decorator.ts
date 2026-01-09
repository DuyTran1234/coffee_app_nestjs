import { SetMetadata } from "@nestjs/common";
import { Role } from "src/casl/enum/role.enum";


export const ROLE_KEY = 'role_key';
export const Roles = (...roles: Role[]) => SetMetadata(ROLE_KEY, roles);