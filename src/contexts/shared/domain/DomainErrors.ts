import { DomainError } from './DomainError';
import { Result } from './Result';

export type CommonErrors = 'UNEXPECTED_ERROR' | 'NOT_FOUND_ERROR';

export class UnexpectedError<T> extends Result<DomainError<CommonErrors, T>> {
    constructor(error?: T) {
        super(false, {
            message: 'UNEXPECTED_ERROR',
            error,
        });
    }

    public static create<T>(error?: T): UnexpectedError<T> {
        return new UnexpectedError(error);
    }
}

export class NotFoundError<T> extends Result<DomainError<CommonErrors, T>> {
    constructor(error?: T) {
        super(false, {
            message: 'NOT_FOUND_ERROR',
            error,
        });
    }

    public static create<T>(error?: T): NotFoundError<T> {
        return new NotFoundError(error);
    }
}
