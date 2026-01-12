import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entity/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserEmployeeService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
    ) { }

    async getUsersPagination(page: number, limit: number): Promise<{ users: User[], total: number }> {
        const total = await this.userRepository.count();
        const users = await this.userRepository.find({
            take: limit,
            skip: page * limit,
        });
        return { users, total };
    }
}