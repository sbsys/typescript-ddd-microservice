import { Result, ValueObject } from '../../../shared/domain';
import { UserError } from './User.error';

export interface PasswordProps {
    password: string;
}

export class Password extends ValueObject<PasswordProps> {
    public get value(): string {
        return this.props.password;
    }

    public static create(props: PasswordProps): Result<UserError, Password> {
        if (!props.password || props.password.length === 0) return Result.Error(UserError.NotValidPasswordError(props));

        return Result.Success(new Password(props));
    }
}
