import { UseCase } from '../../../shared/application';
import { Either, exception, success } from '../../../shared/domain';
import { InvalidUserNameError, Name, NameProps, UserAggregate } from '../../domain/user';
import { SignInDTO } from '../dtos';

type SIgnInError = InvalidUserNameError<NameProps> | null;

export class SignInUseCase implements UseCase<SignInDTO, SIgnInError, UserAggregate> {
    execute(
        request?: SignInDTO | undefined
    ): Either<SIgnInError, UserAggregate> | Promise<Either<SIgnInError, UserAggregate>> {
        const name = Name.create({
            value: request?.name as string,
        });

        if (name.isException()) return exception(name.value);

        if (request?.name !== 'admin') return exception(null);

        if (request?.password !== 'qwerty') return exception(null);

        const user = UserAggregate.create({
            name: name.value.getValue() as Name,
        });

        if (user.isException()) return exception(user.value);

        return success(user.value);
    }
}
