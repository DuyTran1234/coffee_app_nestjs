import { Type } from "class-transformer";
import { EmployeeDtoResponse } from "./employee.dto.response";

export class EmployeesDtoResponse {
    @Type(() => EmployeeDtoResponse)
    employees: EmployeesDtoResponse[];
    total: number;
}