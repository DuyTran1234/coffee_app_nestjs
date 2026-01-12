import z from "zod/v3";

export const CommonPaginationDtoRequestSchema = z.object({
    page: z.coerce.number().min(0).max(1_000_000),
    limit: z.coerce.number().min(5).max(500),
}).strict();

export class CommonPaginationDtoRequest
    extends (class { } as new () => z.infer<typeof CommonPaginationDtoRequestSchema>) { }