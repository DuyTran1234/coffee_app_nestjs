import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entity/user.entity";
import { UserController } from "./controller/user.controller";
import { UserService } from "./service/user.service";
import { CaslModule } from "src/casl/casl.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        CaslModule,
    ],
    providers: [UserService],
    controllers: [UserController],
    exports: [
        UserService,
    ]
})
export class UserModule { }