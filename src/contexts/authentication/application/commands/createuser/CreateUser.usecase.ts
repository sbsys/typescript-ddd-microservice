import { injectable } from 'inversify';
import { UseCase } from '../../../../shared/application';
import { Either, exception, Result, success } from '../../../../shared/domain';
import { Email, InvalidUserEmailError, InvalidUserPasswordError, Password } from '../../../domain/user';
import { CreateUserDTO } from './CreateUser.dto';

type CreateUserErros = InvalidUserEmailError | InvalidUserPasswordError;

@injectable()
export class CreateUserUseCase implements UseCase<CreateUserDTO, CreateUserErros, void> {
    execute(
        request: CreateUserDTO
    ): Either<CreateUserErros, Result<void>> | Promise<Either<CreateUserErros, Result<void>>> {
        const email = Email.create({ email: request.email });

        if (email.isException()) return exception(email.value);

        const password = Password.create({ password: request.password });

        if (password.isException()) return exception(password.value);

        return success(Result.ok());
    }
}
