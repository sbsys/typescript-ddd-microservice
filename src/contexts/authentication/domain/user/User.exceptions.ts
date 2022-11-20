import { DomainError, Result } from '../../../shared/domain';

export type UserErrorMessage =
    /* userExceptions */
    | 'user.exceptions.id.notfound'
    /* email exceptions */
    | 'user.exceptions.email.notvalid'
    | 'user.exceptions.email.already'
    /* password exceptions */
    | 'user.exceptions.password.notvalid';

/* id exceptions */
export class NotFoundIdException extends Result<DomainError<UserErrorMessage>> {
    constructor(error?: unknown) {
        super(false, {
            message: 'user.exceptions.id.notfound',
            error,
        });
    }

    public static create(error?: unknown): NotValidEmailException {
        return new NotValidEmailException(error);
    }
}

/* email exceptions */
export class NotValidEmailException extends Result<DomainError<UserErrorMessage>> {
    constructor(error?: unknown) {
        super(false, {
            message: 'user.exceptions.email.notvalid',
            error,
        });
    }

    public static create(error?: unknown): NotValidEmailException {
        return new NotValidEmailException(error);
    }
}

export class EmailAlreadyExistException extends Result<DomainError<UserErrorMessage>> {
    constructor(error?: unknown) {
        super(false, {
            message: 'user.exceptions.email.already',
            error,
        });
    }

    public static create(error?: unknown): NotValidEmailException {
        return new NotValidEmailException(error);
    }
}

/* password exceptions */
export class NotValidPasswordException extends Result<DomainError<UserErrorMessage>> {
    constructor(error?: unknown) {
        super(false, {
            message: 'user.exceptions.password.notvalid',
            error,
        });
    }

    public static create(error?: unknown): NotValidPasswordException {
        return new NotValidPasswordException(error);
    }
}
