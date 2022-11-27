import { inject, injectable } from 'inversify';
import { Symbols } from '../../../../env';
import { UseCase } from '../../../shared/application';
import { DomainEvents, Result, UniqueEntityID } from '../../../shared/domain';
import { Email, Password, UserAggregate, UserExceptions, UserRepository } from '../../domain/user';

export type CreateUserRequest = {
    email: string;
    password: string;
};

type RESPONSE = Result<UserExceptions, void>;

@injectable()
export class CreateUserUseCase implements UseCase<CreateUserRequest, RESPONSE> {
    constructor(@inject(Symbols.UserRepository) private userRepository: UserRepository) {}

    async execute(request: CreateUserRequest): Promise<RESPONSE> {
        const email = Email.create({ email: request.email });

        if (email.isException) return Result.Exception(email.getExceptionValue());

        const password = Password.create({ password: request.password });

        if (password.isException) return Result.Exception(password.getExceptionValue());

        const user = UserAggregate.createToSave(
            {
                email: email.getSuccessValue(),
                password: password.getSuccessValue(),
            },
            new UniqueEntityID()
        );

        if (user.isException) return Result.Exception(user.getExceptionValue());

        const stored = await this.userRepository.create(user.getSuccessValue());

        if (stored.isException) {
            DomainEvents.removeAggregateFromMarkedDispatchList(user.getSuccessValue());

            return Result.Exception(stored.getExceptionValue());
        }

        return Result.Success();
    }
}
