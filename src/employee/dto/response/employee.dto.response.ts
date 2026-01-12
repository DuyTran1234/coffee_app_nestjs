import { Exclude } from "class-transformer";

export class EmployeeDtoResponse {
    id: number;
    username: string;
    fullname: string;
    address: string;
    phoneNumber: string;
    role: string;

    @Exclude()
    pwd: string;
}