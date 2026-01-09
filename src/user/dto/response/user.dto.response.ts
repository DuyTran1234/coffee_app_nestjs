import { Exclude } from "class-transformer";

export class UserDtoResponse {
    @Exclude()
    id: number;

    username: string;
    fullname: string;
    dob: Date
    phoneNumber: string;

    @Exclude()
    role: string;

}