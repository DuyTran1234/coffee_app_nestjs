import { EmployeeZodSchema } from "src/employee/zod-schema/employee-schema.zod";
import z from "zod/v3";

export const EmployeeLoginDtoSchema = z.object({
    username: EmployeeZodSchema.username,
    pwd: EmployeeZodSchema.pwd,
}).strict();

export class EmployeeLoginDto
    extends (class { } as new () => z.infer<typeof EmployeeLoginDtoSchema>) { }