import { Either, exception, Result, success, ValueObject } from '../../../shared/domain';
import { InvalidUserPasswordError } from './User.error';

export interface PasswordProps {
    password: string;
}

export class Password extends ValueObject<PasswordProps> {
    public get value(): string {
        return this.props.password;
    }

    public static create(props: PasswordProps): Either<InvalidUserPasswordError, Result<Password>> {
        if (!props.password || props.password.length === 0) return exception(InvalidUserPasswordError.create(props));

        return success(Result.ok<Password>(new Password(props)));
    }
}
