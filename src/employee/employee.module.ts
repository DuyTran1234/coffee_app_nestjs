import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Employee } from "./entity/employee.entity";
import { CaslModule } from "src/casl/casl.module";
import { EmployeeAdminService } from "./service/employee-admin.service";
import { EmployeeAuthService } from "./service/employee-auth.service";
import { UserModule } from "src/user/user.module";
import { EmployeeController } from "./controller/employee.controller";
import { AdminController } from "./controller/admin.controller";


@Module({
    imports: [
        TypeOrmModule.forFeature([Employee]),
        CaslModule,
        UserModule,
    ],
    providers: [
        EmployeeAdminService,
        EmployeeAuthService,
    ],
    controllers: [
        AdminController,
        EmployeeController,
    ],
    exports: [
        EmployeeAdminService,
        EmployeeAuthService
    ]
})
export class EmployeeModule { }