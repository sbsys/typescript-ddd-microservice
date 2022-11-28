import { Result, ValueObject } from '../../../shared/domain';
import { UserError } from './User.error';

export interface EmailProps {
    email: string;
}

export class Email extends ValueObject<EmailProps> {
    public get value(): string {
        return this.props.email;
    }

    public static create(props: EmailProps): Result<UserError, Email> {
        if (!props.email || props.email.length === 0) return Result.Error(UserError.NotValidEmailError());

        return Result.Success(new Email(props));
    }
}
