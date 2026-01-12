import { Role } from "src/casl/enum/role.enum";
import z from "zod/v3";

export const EmployeeZodSchema = {
    id: z.coerce.number().min(1).max(100_000_000),

    username: z.string()
        .min(5, { message: 'Tối đa 5 ký tự' })
        .max(255, { message: 'Tối đa 255 ký tự' }),

    fullname: z.string()
        .min(5, { message: 'Tối đa 5 ký tự' })
        .max(255, { message: 'Tối đa 255 ký tự' }),

    pwd: z.string()
        .min(5, { message: 'Tối đa 5 ký tự' })
        .max(30, { message: 'Tối đa 30 ký tự' }),

    address: z.string()
        .min(5, { message: 'Tối đa 5 ký tự' })
        .max(255, { message: 'Tối đa 255 ký tự' }),

    phoneNumber: z.string()
        .min(5, { message: 'Tối đa 5 ký tự' })
        .max(255, { message: 'Tối đa 15 ký tự' }),

    role: z.enum([Role.ADMIN, Role.EMPLOYEE]),
};