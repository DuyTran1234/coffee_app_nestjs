import UserZodSchema from "src/user/zod-schema/user-schema.zod";
import z from "zod/v3";

export const UpdateUserDtoRequesetSchema = z.object({
    id: UserZodSchema.id,
    fullname: UserZodSchema.fullname.optional(),
    dob: UserZodSchema.dob.optional(),
    phoneNumber: UserZodSchema.phoneNumber.optional(),
}).strict();

export class UpdateUserDtoRequeset
    extends (class { } as new () => z.infer<typeof UpdateUserDtoRequesetSchema>) { }