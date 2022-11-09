import { DomainError, Result } from '../../../shared/domain';

export type UserErrors = 'user.email.notfound' | 'user.password.notfound';

export class InvalidUserEmailError extends Result<DomainError<UserErrors>> {
    constructor(error?: unknown) {
        super(false, {
            message: 'user.email.notfound',
            error,
        });
    }

    public static create(error?: unknown): InvalidUserEmailError {
        return new InvalidUserEmailError(error);
    }
}

export class InvalidUserPasswordError extends Result<DomainError<UserErrors>> {
    constructor(error?: unknown) {
        super(false, {
            message: 'user.password.notfound',
            error,
        });
    }

    public static create(error?: unknown): InvalidUserPasswordError {
        return new InvalidUserPasswordError(error);
    }
}
