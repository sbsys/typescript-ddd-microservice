import { inject, injectable } from 'inversify';
import { Symbols } from '../../../../env';
import { Result, UniqueEntityID, Paginate, Page } from '../../../shared/domain';
import { Email, UserAggregate, UserError, UserRepository } from '../../domain/user';
import { UserModel } from '../models';
import { UserSerializer } from '../serializers';

const UserDB: UserModel[] = [];

@injectable()
export class InMemoryUserRepository implements UserRepository {
    constructor(@inject(Symbols.UserSerializer) private userSerializer: UserSerializer) {}

    async isEmailAvailable(email: Email): Promise<Result<UserError, void>> {
        if (UserDB.find(user => user.email === email.value) !== undefined)
            return Result.Error(UserError.EmailAlreadyExistError());

        return Result.Success();
    }

    async create(props: UserAggregate): Promise<Result<UserError, void>> {
        const isEmailAvailable = await this.isEmailAvailable(props.props.email);

        if (isEmailAvailable.isError) return Result.Error(isEmailAvailable.getError());

        UserDB.push({
            ...this.userSerializer.fromEntityToDTO(props),
            status: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        });

        return Result.Success();
    }

    async readById(id: UniqueEntityID): Promise<Result<UserError, UserAggregate>> {
        const foundUser = UserDB.find(user => user.id === id.toString() && user.status);

        if (!foundUser) return Result.Error(UserError.UnExpectedError());

        const user = this.userSerializer.fromModelToEntity(foundUser);

        if (user.isError) return Result.Error(user.getError());

        return Result.Success(user.getSuccess());
    }

    async readAll(paginate: Paginate): Promise<Result<UserError, Page<UserAggregate>>> {
        const data = UserDB.map(user => this.userSerializer.fromModelToEntity(user));

        const foundException = Result.Combine(data);

        if (foundException.isError) return Result.Error(foundException.getError());

        const page: Page<UserAggregate> = {
            page: paginate.page,
            pp: paginate.pp,
            total: 10,
            data: data.map(user => user.getSuccess()),
        };

        return Result.Success(page);
    }

    async updateById(id: UniqueEntityID, props: UserAggregate): Promise<Result<UserError, void>> {
        const foundedIndex = UserDB.findIndex(user => user.id === id.toString());

        if (foundedIndex === -1) return Result.Error(UserError.NotFoundIdError());

        UserDB[foundedIndex] = {
            ...UserDB[foundedIndex],
            email: props.props.email.value,
            password: props.props.password.value,
            updatedAt: new Date().toISOString(),
        } as UserModel;

        return Result.Success();
    }

    async deleteById(id: UniqueEntityID): Promise<Result<UserError, void>> {
        const foundedIndex = UserDB.findIndex(user => user.id === id.toString());

        if (foundedIndex === -1) return Result.Error(UserError.NotFoundIdError());

        UserDB[foundedIndex] = {
            ...UserDB[foundedIndex],
            status: false,
            updatedAt: new Date().toISOString(),
            deletedAt: new Date().toISOString(),
        } as UserModel;

        return Result.Success();
    }
}
