import { BadRequestException, ForbiddenException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AccountJwt } from "src/authentication/entity/account-jwt.entity";
import { Action } from "src/casl/enum/action.enum";
import { CaslAbilityFactory } from "src/casl/service/casl-ability.service";
import { Repository } from "typeorm";
import { CreateUserDtoRequest } from "../dto/request/create-user.dto.request";
import { UpdateUserDtoRequeset } from "../dto/request/update-user.dto.request";
import { User } from "../entity/user.entity";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private caslAbility: CaslAbilityFactory,
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

    async updateUser(accountJwt: AccountJwt, updateUserDto: UpdateUserDtoRequeset): Promise<User | null> {
        const findUser = await this.userRepository.findOneBy({ id: updateUserDto.id });
        if (!findUser) {
            throw new BadRequestException('update user not found');
        }
        const ability = this.caslAbility.createForAccountJwt(accountJwt);
        if (!ability.can(Action.UPDATE, findUser)) {
            throw new ForbiddenException('restrict resource');
        }
        Object.assign(findUser, updateUserDto);
        return await this.userRepository.save(findUser);
    }

    async getUserById(accountJwt: AccountJwt, getUserId: number): Promise<User | null> {
        const findUser = await this.userRepository.findOneBy({ id: getUserId });
        if (!findUser) {
            throw new BadRequestException('get user not found');
        }
        const ability = this.caslAbility.createForAccountJwt(accountJwt);
        if (!ability.can(Action.READ, findUser)) {
            throw new ForbiddenException('restrict resource');
        }
        return findUser;
    }

    async deleteUserById(userId: number) {
        
    }
}