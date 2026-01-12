import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entity/user.entity";
import { Repository } from "typeorm";
import { CreateUserDtoRequest } from "../dto/request/create-user.dto.request";

@Injectable()
export class UserAuthService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
    ) { }

    // use zalo token for verify, therefore create user after user login with zalo token
    async createUserWithToken(createUser: CreateUserDtoRequest): Promise<User | null> {
        const findUser = await this.userRepository.findOneBy({
            username: createUser.username,
        })
        if (findUser) {
            return findUser;
        }
        const user = this.userRepository.create({ role: 'user', ...createUser });
        return await this.userRepository.save(user);
    }

}