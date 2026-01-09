import UserZodSchema from "src/user/zod-schema/user-schema.zod";
import z from "zod/v3";

export const ReadUserDtoRequestSchema = UserZodSchema.id;