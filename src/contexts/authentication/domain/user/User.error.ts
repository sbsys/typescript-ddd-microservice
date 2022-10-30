import { DomainError, Result } from '../../../shared/domain';

export type CreateUserErrors = 'INVALID_USER_NAME';

export class InvalidUserNameError<T> extends Result<DomainError<CreateUserErrors, T>> {
    constructor(error?: T) {
        super(false, {
            message: 'INVALID_USER_NAME',
            error,
        });
    }

    public static create<T>(error?: T): InvalidUserNameError<T> {
        return new InvalidUserNameError(error);
    }
}
