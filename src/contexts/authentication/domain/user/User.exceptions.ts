import { DomainError, Result } from '../../../shared/domain';

export type UserErrorMessage = 'exceptions.email.notvalid' | 'exceptions.password.notvalid';

export class NotValidEmailException extends Result<DomainError<UserErrorMessage>> {
    constructor(error?: unknown) {
        super(false, {
            message: 'exceptions.email.notvalid',
            error,
        });
    }

    public static create(error?: unknown): NotValidEmailException {
        return new NotValidEmailException(error);
    }
}

export class NotValidPasswordException extends Result<DomainError<UserErrorMessage>> {
    constructor(error?: unknown) {
        super(false, {
            message: 'exceptions.password.notvalid',
            error,
        });
    }

    public static create(error?: unknown): NotValidPasswordException {
        return new NotValidPasswordException(error);
    }
}
