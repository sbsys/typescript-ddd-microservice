import { Result, ValueObject } from '../../../shared/domain';
import { NotValidEmailException } from './User.exceptions';

export type CreateEmailExceptions = NotValidEmailException;

export interface EmailProps {
    email: string;
}

export class Email extends ValueObject<EmailProps> {
    public get value(): string {
        return this.props.email;
    }

    public static create(props: EmailProps): Result<CreateEmailExceptions, Email> {
        if (!props.email || props.email.length === 0) return Result.Exception(NotValidEmailException.create(props));

        return Result.Success(new Email(props));
    }
}
