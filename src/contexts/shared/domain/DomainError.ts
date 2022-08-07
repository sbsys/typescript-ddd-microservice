export interface DomainError<T> {
    message: string;
    error?: T;
}
