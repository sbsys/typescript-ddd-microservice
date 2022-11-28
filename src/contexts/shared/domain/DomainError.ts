export type KindError = 'unexpected' | 'notfound' | 'notvalid' | 'conflict';

export type CommonsErrorMessage = `commons.errors.${'unexpected'}`;

export class DomainError<MESSAGES, ARGS = unknown> {
    kind: KindError;
    message: MESSAGES;
    args?: ARGS;

    protected constructor(kind: KindError, message: MESSAGES, args?: ARGS) {
        this.kind = kind;
        this.message = message;
        this.args = args;
    }

    protected static create<MESSAGES, ARGS = unknown>(
        kind: KindError,
        message: MESSAGES,
        args?: ARGS
    ): DomainError<MESSAGES, ARGS> {
        return new DomainError(kind, message, args);
    }

    public static UnExpectedError<ARGS = unknown>(args?: ARGS): DomainError<CommonsErrorMessage, ARGS> {
        return this.create('unexpected', 'commons.errors.unexpected', args);
    }
}
