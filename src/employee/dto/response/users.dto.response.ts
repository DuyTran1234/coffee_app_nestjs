import { Type } from "class-transformer";
import { UserDtoResponse } from "src/user/dto/response/user.dto.response";

export class UsersDtoResponse {
    @Type(() => UserDtoResponse)
    users: UserDtoResponse[];

    total: number;
}