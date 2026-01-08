import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entity/user.entity";
import { Repository } from "typeorm";
import { CreateUserDtoRequest } from "../dto/request/create-user.dto.request";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
    ) { }

    async createUser(createUser: CreateUserDtoRequest): Promise<User | null> {
        const findUser = await this.userRepository.findOneBy({
            username: createUser.username,
        })
        if (findUser) {
            return findUser;
        }
        const user = this.userRepository.create({ role: 'user', ...createUser });
        return await this.userRepository.save(user);
    }

    async updateUser() {

    }
}