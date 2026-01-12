import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { HashServiceHelper } from "src/common/hash/hash-service";
import { ILike, Repository } from "typeorm";
import { CreateEmployeeDtoRequest } from "../dto/request/create-employee.dto.request";
import { UpdateEmployeeDtoRequest } from "../dto/request/update-employee.dto.request";
import { Employee } from "../entity/employee.entity";


@Injectable()
export class EmployeeAdminService {
    constructor(
        @InjectRepository(Employee) private employeeRepository: Repository<Employee>,
    ) { }

    async createEmployee(createEmployeeDto: CreateEmployeeDtoRequest): Promise<Employee | null> {
        const findEmployee = await this.employeeRepository.findOneBy({
            username: createEmployeeDto.username,
        });
        if (findEmployee) {
            throw new BadRequestException('create employee existed');
        }
        createEmployeeDto.pwd = await HashServiceHelper.hashData(createEmployeeDto.pwd);
        const employee = this.employeeRepository.create(createEmployeeDto);
        return await this.employeeRepository.save(employee);
    }

    async getEmployeesPagination(
        page: number, limit: number
    ): Promise<{ employees: Employee[], total: number }> {
        const [employees, total] = await this.employeeRepository.findAndCount({
            take: limit,
            skip: page * limit,
        });
        return { employees, total };
    }

    async getEmployeesByUsernameFuzzy(usernameDto: string): Promise<{ employees: Employee[], total: number }> {
        const [employees, total] = await this.employeeRepository.findAndCount({
            where: {
                username: ILike(`%${usernameDto}%`)
            }
        });
        return { employees, total };
    }

    async updateEmployeeById(updateEmployeeDto: UpdateEmployeeDtoRequest): Promise<Employee> {
        const findEmployee = await this.employeeRepository.findOneBy({ id: updateEmployeeDto.id });
        if (!findEmployee) {
            throw new NotFoundException('cannot find update employee');
        }
        if (updateEmployeeDto.pwd) {
            updateEmployeeDto.pwd = await HashServiceHelper.hashData(updateEmployeeDto.pwd);
        }
        Object.assign(findEmployee, updateEmployeeDto);
        return await this.employeeRepository.save(findEmployee);
    }

    async deleteEmployeeById(idDto: number): Promise<boolean> {
        const findEmployee = await this.employeeRepository.findOneBy({ id: idDto });
        if (!findEmployee) {
            throw new NotFoundException('not found delete employee');
        }
        const del = await this.employeeRepository.remove(findEmployee);
        return true;
    }
}