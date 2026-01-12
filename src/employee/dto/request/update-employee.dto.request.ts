import { EmployeeZodSchema } from "src/employee/zod-schema/employee-schema.zod";
import z from "zod/v3";

export const UpdateEmployeeDtoRequestSchema = z.object({
    id: EmployeeZodSchema.id,
    username: EmployeeZodSchema.username.optional(),
    fullname: EmployeeZodSchema.fullname.optional(),
    pwd: EmployeeZodSchema.pwd.optional(),
    address: EmployeeZodSchema.address.optional(),
    phoneNumber: EmployeeZodSchema.phoneNumber.optional(),
    role: EmployeeZodSchema.role.optional(),
}).strict();

export class UpdateEmployeeDtoRequest
    extends (class { } as new () => z.infer<typeof UpdateEmployeeDtoRequestSchema>) { }