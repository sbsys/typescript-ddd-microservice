import { inject, injectable } from 'inversify';
import { Symbols } from '../../../../env';
import { UseCase } from '../../../shared/application';
import { Result, UniqueEntityID } from '../../../shared/domain';
import { Email, Password, UserAggregate, UserError, UserRepository } from '../../domain/user';

export type CreateUserRequest = {
    email: string;
    password: string;
};

type RESPONSE = Result<UserError, void>;

@injectable()
export class CreateUserUseCase implements UseCase<CreateUserRequest, RESPONSE> {
    constructor(@inject(Symbols.UserRepository) private userRepository: UserRepository) {}

    async execute(request: CreateUserRequest): Promise<RESPONSE> {
        const email = Email.create({ email: request.email });

        if (email.isError) return Result.Error(email.getError());

        const password = Password.create({ password: request.password });

        if (password.isError) return Result.Error(password.getError());

        const user = UserAggregate.createToSave(
            {
                email: email.getSuccess(),
                password: password.getSuccess(),
            },
            new UniqueEntityID()
        );

        if (user.isError) return Result.Error(user.getError());

        const stored = await this.userRepository.create(user.getSuccess());

        if (stored.isError) return Result.Error(stored.getError());

        user.getSuccess().dispathEvents();

        return Result.Success();
    }
}
