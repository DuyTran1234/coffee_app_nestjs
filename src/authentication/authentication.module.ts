import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "src/user/user.module";
import { AuthenticationController } from "./controller/authentication.controller";
import { AuthenticationService } from "./service/authentication.service";

@Module({
    imports: [
        JwtModule.registerAsync({
            global: true,
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => {
                return {
                    global: true,
                    secret: configService.get('JWT_SECRET_KEY'),
                    signOptions: {
                        expiresIn: '30s',
                    },
                };
            },
            inject: [ConfigService],
        }),
        UserModule,
    ],
    providers: [
        AuthenticationService,
    ],
    controllers: [
        AuthenticationController,
    ],
})
export class AuthenticationModule { }