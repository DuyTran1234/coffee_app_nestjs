import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Employee } from "../entity/employee.entity";
import { Repository } from "typeorm";
import { CaslAbilityFactory } from "src/casl/service/casl-ability.service";


@Injectable()
export class EmployeeService {
    constructor(
        @InjectRepository(Employee) private employeeRepository: Repository<Employee>,
        private caslAbility: CaslAbilityFactory,
    ) { }

    async createEmployee() {
        
    }
}