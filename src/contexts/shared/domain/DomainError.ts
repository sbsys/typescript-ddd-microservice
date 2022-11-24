export interface IDomainError<MESSAGE, EXCEPTION> {
    message: MESSAGE;
    exception: EXCEPTION;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export abstract class DomainError<MESSAGE, EXCEPTION = any> implements IDomainError<MESSAGE, EXCEPTION> {
    message: MESSAGE;
    exception: EXCEPTION;

    protected constructor(message: MESSAGE, exception: EXCEPTION) {
        this.message = message;
        this.exception = exception;
    }
}
