import { inject, injectable } from 'inversify';
import { Symbols } from '../../../../../env';
import { UseCase } from '../../../../shared/application';
import { Either, exception, Result, success } from '../../../../shared/domain';
import {
    Email,
    NotValidPasswordException,
    Password,
    UserAggregate,
    UserRepository,
    UserRepositoryErros,
} from '../../../domain/user';
import { CreateUserRequest } from './CreateUser.request';

type CreateUserErros = UserRepositoryErros | NotValidPasswordException | undefined;

@injectable()
export class CreateUserUseCase implements UseCase<CreateUserRequest, CreateUserErros, void> {
    constructor(@inject(Symbols.UserRepository) private userRepository: UserRepository) {}

    async execute(request: CreateUserRequest): Promise<Either<CreateUserErros, Result<void>>> {
        const email = Email.create({ email: request.email });

        if (email.isException()) return exception(email.error);

        const password = Password.create({ password: request.password });

        if (password.isException()) return exception(password.error);

        const user = UserAggregate.createToSave({
            email: email.value.getValue(),
            password: password.value.getValue(),
        });

        if (user.isException()) return exception(user.error);

        const stored = await this.userRepository.create(user.value);

        if (stored.isException()) return exception(stored.error);

        return success(Result.ok());
    }
}
