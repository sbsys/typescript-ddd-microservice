import { inject, injectable } from 'inversify';
import { Symbols } from '../../../../env';
import { Result, UniqueEntityID, Paginate, Page } from '../../../shared/domain';
import {
    Email,
    EmailAlreadyExistException,
    NotFoundIdException,
    UserAggregate,
    UserExceptions,
    UserRepository,
} from '../../domain/user';
import { UserModel } from '../models';
import { UserSerializer } from '../serializers';

const UserDB: UserModel[] = [];

@injectable()
export class InMemoryUserRepository implements UserRepository {
    constructor(@inject(Symbols.UserSerializer) private userSerializer: UserSerializer) {}

    async isEmailAvailable(email: Email): Promise<Result<UserExceptions, void>> {
        if (UserDB.find(user => user.email === email.value))
            return Result.Exception(EmailAlreadyExistException.create());

        return Result.Success();
    }

    async create(props: UserAggregate): Promise<Result<UserExceptions, void>> {
        const isEmailAvailable = await this.isEmailAvailable(props.props.email);

        if (isEmailAvailable.isException) return Result.Exception(isEmailAvailable.getExceptionValue());

        UserDB.push({
            ...this.userSerializer.fromEntityToDTO(props),
            status: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        });

        return Result.Success();
    }

    async readById(id: UniqueEntityID): Promise<Result<UserExceptions, UserAggregate>> {
        const foundUser = UserDB.find(user => user.id === id.toString() && user.status);

        if (!foundUser) return Result.Exception(NotFoundIdException.create());

        const user = this.userSerializer.fromModelToEntity(foundUser);

        if (user.isException) return Result.Exception(user.getExceptionValue());

        return Result.Success(user.getSuccessValue());
    }

    async readAll(paginate: Paginate): Promise<Result<UserExceptions, Page<UserAggregate>>> {
        const data = UserDB.map(user => this.userSerializer.fromModelToEntity(user));

        const foundException = Result.Combine(data);

        if (foundException) return Result.Exception(foundException.getExceptionValue());

        const page: Page<UserAggregate> = {
            page: paginate.page,
            pp: paginate.pp,
            total: 10,
            data: data.map(user => user.getSuccessValue()),
        };

        return Result.Success(page);
    }

    async updateById(id: UniqueEntityID, props: UserAggregate): Promise<Result<UserExceptions, void>> {
        const foundedIndex = UserDB.findIndex(user => user.id === id.toString());

        if (foundedIndex === -1) return Result.Exception(NotFoundIdException.create());

        UserDB[foundedIndex] = {
            ...UserDB[foundedIndex],
            email: props.props.email.value,
            password: props.props.password.value,
            updatedAt: new Date().toISOString(),
        } as UserModel;

        return Result.Success();
    }

    async deleteById(id: UniqueEntityID): Promise<Result<UserExceptions, void>> {
        const foundedIndex = UserDB.findIndex(user => user.id === id.toString());

        if (foundedIndex === -1) return Result.Exception(NotFoundIdException.create(id));

        UserDB[foundedIndex] = {
            ...UserDB[foundedIndex],
            status: false,
            updatedAt: new Date().toISOString(),
            deletedAt: new Date().toISOString(),
        } as UserModel;

        return Result.Success();
    }
}
