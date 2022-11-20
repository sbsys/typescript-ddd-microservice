import { Either, exception, Result, success, ValueObject } from '../../../shared/domain';
import { NotValidPasswordException } from './User.exceptions';

export type CreatePasswordExceptions = NotValidPasswordException;

export interface PasswordProps {
    password: string;
}

export class Password extends ValueObject<PasswordProps> {
    public get value(): string {
        return this.props.password;
    }

    public static create(props: PasswordProps): Either<CreatePasswordExceptions, Result<Password>> {
        if (!props.password || props.password.length === 0) return exception(NotValidPasswordException.create(props));

        return success(Result.ok<Password>(new Password(props)));
    }
}
