import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { AuthenticationService } from "./service/authentication.service";
import { AuthenticationController } from "./controller/authentication.controller";

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
                        expiresIn: 3600, // one hour
                    },
                };
            },
            inject: [ConfigService],
        }),
    ],
    providers: [
        AuthenticationService,
    ],
    controllers: [
        AuthenticationController,
    ],
})
export class AuthenticationModule { }