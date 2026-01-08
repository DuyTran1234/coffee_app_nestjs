import { AbilityBuilder, createMongoAbility, InferSubjects, MongoAbility } from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { User } from "src/user/entity/user.entity";
import { Action } from "../enum/action.enum";
import { AccountJwt } from "src/authentication/entity/account-jwt.entity";
import { Role } from "../enum/role.enum";

type Subjects = InferSubjects<typeof User> | 'all';

export type AppAbility = MongoAbility<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
    createForAccountJwt(accountJwt: AccountJwt) {
        const { can, build } = new AbilityBuilder(createMongoAbility);
        if (accountJwt.role === Role.ADMIN) {
            can(Action.MANAGE, 'all');
        } else if (accountJwt.role === Role.EMPLOYEE) {

        } else if (accountJwt.role === Role.USER) {
            can(Action.READ, User, { id: accountJwt.id });
            can(Action.UPDATE, User, { id: accountJwt.id });
        } else {

        }
    }
}