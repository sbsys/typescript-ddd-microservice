import { Either, exception, Result, success, ValueObject } from '../../../shared/domain';
import { NotValidEmailException } from './User.exceptions';

export interface EmailProps {
    email: string;
}

export class Email extends ValueObject<EmailProps> {
    public get value(): string {
        return this.props.email;
    }

    public static create(props: EmailProps): Either<NotValidEmailException, Result<Email>> {
        if (!props.email || props.email.length === 0) return exception(NotValidEmailException.create(props));

        return success(Result.ok<Email>(new Email(props)));
    }
}
