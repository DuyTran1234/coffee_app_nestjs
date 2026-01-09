import { Module } from "@nestjs/common";
import { CaslAbilityFactory } from "./service/casl-ability.service";

@Module({
    providers: [CaslAbilityFactory],
    exports: [CaslAbilityFactory],
})
export class CaslModule { }