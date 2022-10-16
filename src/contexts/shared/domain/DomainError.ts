export interface DomainError<MESSAGE, EXCEPTION> {
    message: MESSAGE;
    error?: EXCEPTION;
}
