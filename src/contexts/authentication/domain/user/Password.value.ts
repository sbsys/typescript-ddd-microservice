import { Result, ValueObject } from '../../../shared/domain';
import { NotValidPasswordException } from './User.exceptions';

type CreatePasswordExceptions = NotValidPasswordException;

export interface PasswordProps {
    password: string;
}

export class Password extends ValueObject<PasswordProps> {
    public get value(): string {
        return this.props.password;
    }

    public static create(props: PasswordProps): Result<CreatePasswordExceptions, Password> {
        if (!props.password || props.password.length === 0)
            return Result.Exception(NotValidPasswordException.create(props));

        return Result.Success(new Password(props));
    }
}
