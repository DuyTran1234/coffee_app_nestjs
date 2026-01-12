import { Exclude, Expose } from "class-transformer";
import { Role } from "src/casl/enum/role.enum";

export class UserDtoResponse {
    id: number;
    username: string;
    fullname: string;
    dob: Date
    phoneNumber: string;

    @Expose({
        groups: [Role.ADMIN, Role.EMPLOYEE]
    })
    role: string;
}