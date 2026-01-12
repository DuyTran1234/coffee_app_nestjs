import { AbilityBuilder, createMongoAbility, ExtractSubjectType, InferSubjects, MongoAbility } from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { User } from "src/user/entity/user.entity";
import { Action } from "../enum/action.enum";
import { AccountJwt } from "src/authentication/entity/account-jwt.entity";
import { Role } from "../enum/role.enum";
import { Employee } from "src/employee/entity/employee.entity";

type Subjects = InferSubjects<typeof User | typeof Employee> | 'all';

export type AppAbility = MongoAbility<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
    createForAccountJwt(accountJwt: AccountJwt) {
        const { can, build } = new AbilityBuilder(createMongoAbility);
        if (accountJwt.role === Role.ADMIN) {
            can(Action.MANAGE, 'all');
        } else if (accountJwt.role === Role.EMPLOYEE) {
            can(Action.READ, Employee);
            can(Action.READ, User);
        } else if (accountJwt.role === Role.USER) {
            can(Action.READ, User, { id: accountJwt.id });
            can(Action.UPDATE, User, { id: accountJwt.id });
        } else {

        }
        return build({
            detectSubjectType: (item) => {
                return item.constructor as ExtractSubjectType<Subjects>;
            }
        });
    }
}