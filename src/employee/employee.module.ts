import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Employee } from "./entity/employee.entity";
import { CaslModule } from "src/casl/casl.module";
import { EmployeeService } from "./service/employee.service";


@Module({
    imports: [
        TypeOrmModule.forFeature([Employee]),
        CaslModule,
    ],
    providers: [EmployeeService],
    controllers: [],
    exports: [EmployeeService]
})
export class EmployeeModule { }