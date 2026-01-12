import { EmployeeZodSchema } from "src/employee/zod-schema/employee-schema.zod";
import z from "zod/v3";

export const CreateEmployeeDtoRequestSchema = z.object({
    username: EmployeeZodSchema.username,
    fullname: EmployeeZodSchema.fullname,
    pwd: EmployeeZodSchema.pwd,
    address: EmployeeZodSchema.address.optional(),
    phoneNumber: EmployeeZodSchema.phoneNumber.optional(),
    role: EmployeeZodSchema.role,
}).strict();

export class CreateEmployeeDtoRequest
    extends (class { } as new () => z.infer<typeof CreateEmployeeDtoRequestSchema>) { }