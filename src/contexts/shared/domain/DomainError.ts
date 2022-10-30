// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface DomainError<MESSAGE, EXCEPTION = any> {
    message: MESSAGE;
    error?: EXCEPTION;
}
