import { BadRequestException, HttpException, Injectable } from "@nestjs/common";

@Injectable()
export class AuthenticationService {
    constructor(

    ) { }

    async zaloUserLogIn(accessToken: string) {
        const res = await fetch('https://graph.zalo.me/v2.0/me', {
            method: 'GET',
            headers: {
                'access_token': accessToken,
                'Content-Type': 'application/json',
            }
        });
        if (!res.ok) {
            throw new BadRequestException('zalo api login error');
        }
        const data = await res.json();
        if (data.error != 0) {
            throw new BadRequestException('access_token zalo invalid');
        }
        return data;
    }
}