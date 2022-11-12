import { injectable } from 'inversify';
import { UseCase } from '../../../../shared/application';
import { Either, exception, Result, success } from '../../../../shared/domain';
import { Email, NotValidEmailException, NotValidPasswordException, Password, UserAggregate } from '../../../domain/User';
import { CreateUserDTO } from './CreateUser.dto';

type CreateUserErros = NotValidEmailException | NotValidPasswordException;

@injectable()
export class CreateUserUseCase implements UseCase<CreateUserDTO, CreateUserErros, void> {
    execute(
        request: CreateUserDTO
    ): Either<CreateUserErros, Result<void>> | Promise<Either<CreateUserErros, Result<void>>> {
        const email = Email.create({ email: request.email });

        if (email.isException()) return exception(email.error);

        const password = Password.create({ password: request.password });

        if (password.isException()) return exception(password.error);

        const user = UserAggregate.createToSave({
            email: email.value.getValue(),
            password: password.value.getValue(),
        });

        if (user.isSuccess()) console.log(user.value.domainEvents[0]);

        return success(Result.ok());
    }
}
