import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entity/user.entity";
import { UserController } from "./controller/user.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
    ],
    providers: [],
    controllers: [UserController],
})
export class UserModule { }