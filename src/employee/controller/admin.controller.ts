import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards, UsePipes } from "@nestjs/common";
import { AuthenticationGuard } from "src/authentication/guard/authentication.guard";
import { Role } from "src/casl/enum/role.enum";
import { Roles } from "src/common/decorator/role.decorator";
import { CreateEmployeeDtoRequest, CreateEmployeeDtoRequestSchema } from "../dto/request/create-employee.dto.request";
import { ZodValidationPipe } from "src/common/pipe/zod-validation.pipe";
import { EmployeeAdminService } from "../service/employee-admin.service";
import { plainToInstance } from "class-transformer";
import { EmployeeDtoResponse } from "../dto/response/employee.dto.response";
import { CommonPaginationDtoRequest, CommonPaginationDtoRequestSchema } from "src/common/dto/request/common-pagination.dto.request";
import { EmployeesDtoResponse } from "../dto/response/employees.dto.response";
import z from "zod/v3";
import { UpdateEmployeeDtoRequest } from "../dto/request/update-employee.dto.request";


@Controller('admin')
export class AdminController {
    constructor(
        private employeeAdminService: EmployeeAdminService,
    ) { }

    @Post('create-employee')
    @Roles(Role.ADMIN)
    @UseGuards(AuthenticationGuard)
    @UsePipes(new ZodValidationPipe(CreateEmployeeDtoRequestSchema))
    async createEmployee(@Body() createEmployee: CreateEmployeeDtoRequest): Promise<EmployeeDtoResponse> {
        const createUser = await this.employeeAdminService.createEmployee(createEmployee);
        return plainToInstance(EmployeeDtoResponse, createUser);
    }

    @Get('get-employees-pagination')
    @Roles(Role.ADMIN)
    @UseGuards(AuthenticationGuard)
    async getEmployeesPagination(
        @Query(new ZodValidationPipe(CommonPaginationDtoRequestSchema)) dto: CommonPaginationDtoRequest
    ): Promise<EmployeesDtoResponse> {
        const { employees, total } = await this.employeeAdminService.getEmployeesPagination(
            dto.page, dto.limit
        );
        return plainToInstance(EmployeesDtoResponse, { employees, total });
    }

    @Get('get-employees-username-fuzzy/:username')
    @Roles(Role.ADMIN)
    @UseGuards(AuthenticationGuard)
    async getEmployeesByUsernameFuzzy(
        @Param('username', new ZodValidationPipe(z.string().max(255))) usernameDto: string
    ): Promise<EmployeesDtoResponse> {
        const { employees, total } = await this.employeeAdminService.getEmployeesByUsernameFuzzy(usernameDto);
        return plainToInstance(EmployeesDtoResponse, { employees, total });
    }

    @Patch('update-employee')
    @Roles(Role.ADMIN)
    @UseGuards(AuthenticationGuard)
    async updateEmployeeById(
        @Body() updateEmployeeDto: UpdateEmployeeDtoRequest,
    ): Promise<EmployeeDtoResponse> {
        const employee = await this.employeeAdminService.updateEmployeeById(updateEmployeeDto);
        return plainToInstance(EmployeeDtoResponse, employee);
    }
}