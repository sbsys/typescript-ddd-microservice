import { DomainError } from './DomainError';

export type CommonsErrorMessage = 'commons.exceptions.unexpected' | 'commons.exceptions.notfound';

export class UnexpectedError extends DomainError<CommonsErrorMessage> {
    public static create<EXCEPTION>(exception?: EXCEPTION): UnexpectedError {
        return new UnexpectedError('commons.exceptions.unexpected', exception);
    }
}

export class NotFoundError extends DomainError<CommonsErrorMessage> {
    public static create<EXCEPTION>(exception?: EXCEPTION): NotFoundError {
        return new NotFoundError('commons.exceptions.notfound', exception);
    }
}
