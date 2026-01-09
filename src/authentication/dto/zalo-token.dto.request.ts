import z from "zod/v3";

export const ZaloTokenDtoRequestSchema = z.object({
    zaloAccessToken: z.string().max(512, { message: 'Tối đa 512 ký tự' }),
}).strict();

export class ZaloTokenDtoRequest
    extends (class { } as new () => z.infer<typeof ZaloTokenDtoRequestSchema>) { }