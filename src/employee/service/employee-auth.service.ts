import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Employee } from "../entity/employee.entity";
import { Repository } from "typeorm";

@Injectable()
export class EmployeeAuthService {
    constructor(
        @InjectRepository(Employee) private employeeRepository: Repository<Employee>,
    ) { }

    async getEmployeeByUsername(usernameDto: string): Promise<Employee | null> {
        return await this.employeeRepository.findOneBy({
            username: usernameDto
        });
    }

}