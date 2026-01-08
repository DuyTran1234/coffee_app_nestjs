import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { ZodSchema } from "zod/v3";


export class ZodValidationPipe implements PipeTransform {
    constructor(
        private zodSchema: ZodSchema,
    ) { }

    transform(value: any, metadata: ArgumentMetadata) {
        try {
            const parsedValue = this.zodSchema.parse(value);
            if (metadata.metatype) {
                return Object.assign(new (metadata.metatype)(), parsedValue);
            }
            return parsedValue;
        } catch (error) {
            throw new BadRequestException(error || 'ZodValidationPipe error');
        }
    }
}