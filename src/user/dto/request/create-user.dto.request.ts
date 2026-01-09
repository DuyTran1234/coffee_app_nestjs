import UserZodSchema from "src/user/zod-schema/user-schema.zod";
import z from "zod/v3";

export const CreateUserDtoRequestZodSchema = z.object({
    username: UserZodSchema.username,
    fullname: UserZodSchema.fullname,
    dob: UserZodSchema.dob.optional(),
    phoneNumber: UserZodSchema.phoneNumber.optional(),
}).strict();

export class CreateUserDtoRequest
    extends (class { } as new () => z.infer<typeof CreateUserDtoRequestZodSchema>) { }