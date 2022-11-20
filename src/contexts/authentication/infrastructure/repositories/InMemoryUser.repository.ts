import { inject, injectable } from 'inversify';
import { Symbols } from '../../../../env';
import { Either, Result, UniqueEntityID, Paginate, Page, success, exception } from '../../../shared/domain';
import {
    Email,
    EmailAlreadyExistException,
    NotFoundIdException,
    Password,
    UserAggregate,
    UserRepository,
    UserRepositoryErros,
} from '../../domain/user';
import { UserModel } from '../models';
import { UserSerializer } from '../serializers';

const UserDB: UserModel[] = [];

@injectable()
export class InMemoryUserRepository implements UserRepository {
    constructor(@inject(Symbols.UserSerializer) private userSerializer: UserSerializer) {}

    async isEmailAvailable(email: Email): Promise<Either<UserRepositoryErros, Result<void>>> {
        if (UserDB.find(user => user.email === email.value)) return exception(EmailAlreadyExistException.create());

        return success(Result.ok());
    }

    async create(props: UserAggregate): Promise<Either<UserRepositoryErros, Result<void>>> {
        const isEmailAvailable = await this.isEmailAvailable(props.props.email);

        if (isEmailAvailable.isException()) return exception(isEmailAvailable.error);

        UserDB.push({
            ...this.userSerializer.fromEntityToDTO(props),
            status: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        });

        return success(Result.ok());
    }

    async readById(id: UniqueEntityID): Promise<Either<UserRepositoryErros, Result<UserAggregate>>> {
        const foundUser = UserDB.find(user => user.id === id.toString() && user.status);

        if (!foundUser) return exception(NotFoundIdException.create());

        const email = Email.create({ email: foundUser.email });

        if (email.isException()) return exception(email.error);

        const password = Password.create({ password: foundUser.password });

        if (password.isException()) return exception(password.error);

        const user = UserAggregate.create({
            email: email.value.getValue(),
            password: password.value.getValue(),
        });

        if (user.isException()) return exception(user.error);

        return success(Result.ok(user.value));
    }

    async readAll(paginate: Paginate): Promise<Either<UserRepositoryErros, Result<Page<UserAggregate>>>> {
        const page: Page<UserAggregate> = {
            page: paginate.page,
            pp: paginate.pp,
            total: 10,
            data: UserDB.reduce((prev, current) => {
                const serialized = this.userSerializer.fromModelToEntity(current);

                if (serialized.isException()) return prev;

                return [...prev, serialized.value.getValue()];
            }, [] as UserAggregate[]),
        };

        return success(Result.ok(page));
    }

    async updateById(id: UniqueEntityID, props: UserAggregate): Promise<Either<UserRepositoryErros, Result<void>>> {
        throw new Error('Method not implemented.');
    }
    async deleteById(id: UniqueEntityID): Promise<Either<UserRepositoryErros, Result<void>>> {
        throw new Error('Method not implemented.');
    }
}
