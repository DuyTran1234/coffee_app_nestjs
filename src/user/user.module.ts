import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entity/user.entity";
import { UserController } from "./controller/user.controller";
import { UserService } from "./service/user.service";
import { CaslModule } from "src/casl/casl.module";
import { UserAuthService } from "./service/user-auth.service";
import { UserEmployeeService } from "./service/user-employee.service";
import { UserAdminService } from "./service/user-admin.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        CaslModule,
    ],
    providers: [
        UserService,
        UserAuthService,
        UserEmployeeService,
        UserAdminService,
    ],
    controllers: [UserController],
    exports: [
        UserService,
        UserAuthService,
        UserEmployeeService,
        UserAdminService,
    ]
})
export class UserModule { }