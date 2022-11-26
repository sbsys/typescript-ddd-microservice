import { inject, injectable } from 'inversify';
import { Symbols } from '../../../../../env';
import { UseCase } from '../../../../shared/application';
import { Result, UniqueEntityID } from '../../../../shared/domain';
import { Email, Password, UserAggregate, UserExceptions, UserRepository } from '../../../domain/user';
import { CreateUserRequest } from './CreateUser.request';

type RESPONSE = Result<UserExceptions, void>;

@injectable()
export class CreateUserUseCase implements UseCase<CreateUserRequest, RESPONSE> {
    constructor(@inject(Symbols.UserRepository) private userRepository: UserRepository) {}

    async execute(request: CreateUserRequest): Promise<RESPONSE> {
        const email = Email.create({ email: request.email });

        if (email.isException) return Result.Exception(email.getExceptionValue());

        const isEmailAvailable = await this.userRepository.isEmailAvailable(email.getSuccessValue());

        if (isEmailAvailable.isException) return Result.Exception(isEmailAvailable.getExceptionValue());

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

        if (stored.isException) return Result.Exception(stored.getExceptionValue());

        return Result.Success();
    }
}
