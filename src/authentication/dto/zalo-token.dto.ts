import z from "zod/v3";

export const ZaloTokenDtoSchema = z.object({
    zaloAccessToken: z.string().max(512, { message: 'Tối đa 512 ký tự' }),
}).strict();

export class ZaloTokenDto
    extends (class { } as new () => z.infer<typeof ZaloTokenDtoSchema>) { }