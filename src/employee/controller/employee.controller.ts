import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { AuthenticationGuard } from "src/authentication/guard/authentication.guard";
import { Role } from "src/casl/enum/role.enum";
import { Roles } from "src/common/decorator/role.decorator";
import { CommonPaginationDtoRequest, CommonPaginationDtoRequestSchema } from "src/common/dto/request/common-pagination.dto.request";
import { ZodValidationPipe } from "src/common/pipe/zod-validation.pipe";
import { UserEmployeeService } from "src/user/service/user-employee.service";
import { UsersDtoResponse } from "../dto/response/users.dto.response";


@Controller('employee')
export class EmployeeController {
    constructor(
        private userEmployeeService: UserEmployeeService,
    ) { }

    @Get('get-users')
    @Roles(Role.ADMIN, Role.EMPLOYEE)
    @UseGuards(AuthenticationGuard)
    async getUsersPagination(
        @Query(new ZodValidationPipe(CommonPaginationDtoRequestSchema)) dto: CommonPaginationDtoRequest
    ): Promise<UsersDtoResponse> {
        const { users, total } = await this.userEmployeeService.getUsersPagination(dto.page, dto.limit);
        return plainToInstance(
            UsersDtoResponse, { users, total },
            {
                groups: [Role.EMPLOYEE],
            }
        );
    }
}