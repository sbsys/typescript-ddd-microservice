import { DomainError } from '../../../shared/domain';

export type UserErrorMessage =
    /* userExceptions */
    | 'user.exceptions.id.notfound'
    /* email exceptions */
    | 'user.exceptions.email.notvalid'
    | 'user.exceptions.email.already'
    /* password exceptions */
    | 'user.exceptions.password.notvalid';

export type UserExceptions =
    | NotFoundIdException
    | NotValidEmailException
    | EmailAlreadyExistException
    | NotValidPasswordException;

/* id exceptions */
export class NotFoundIdException extends DomainError<UserErrorMessage> {
    public static create<EXCEPTION>(exception?: EXCEPTION): NotFoundIdException {
        return new NotFoundIdException('user.exceptions.id.notfound', exception);
    }
}

/* email exceptions */
export class NotValidEmailException extends DomainError<UserErrorMessage> {
    public static create<EXCEPTION>(exception?: EXCEPTION): NotValidEmailException {
        return new NotValidEmailException('user.exceptions.email.notvalid', exception);
    }
}

export class EmailAlreadyExistException extends DomainError<UserErrorMessage> {
    public static create<EXCEPTION>(exception?: EXCEPTION): EmailAlreadyExistException {
        return new EmailAlreadyExistException('user.exceptions.email.already', exception);
    }
}

/* password exceptions */
export class NotValidPasswordException extends DomainError<UserErrorMessage> {
    public static create<EXCEPTION>(exception?: EXCEPTION): NotValidPasswordException {
        return new NotValidPasswordException('user.exceptions.password.notvalid', exception);
    }
}
