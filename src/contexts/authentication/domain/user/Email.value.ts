import { Either, exception, Result, success, ValueObject } from '../../../shared/domain';
import { InvalidUserEmailError } from './User.error';

export interface EmailProps {
    email: string;
}

export class Email extends ValueObject<EmailProps> {
    public get value(): string {
        return this.props.email;
    }

    public static create(props: EmailProps): Either<InvalidUserEmailError, Result<Email>> {
        if (!props.email || props.email.length === 0) return exception(InvalidUserEmailError.create(props));

        return success(Result.ok<Email>(new Email(props)));
    }
}
