/* eslint-disable @typescript-eslint/no-explicit-any */
export class Result<T> {
    public isSuccess: boolean;
    public isException: boolean;
    public exception: T | string | undefined;
    private _value: T | undefined;

    public constructor(isSuccess: boolean, exception?: T | string, value?: T) {
        if (isSuccess && exception)
            throw new Error('InvalidOperation: A result cannot be successful and contain an exception');

        if (!isSuccess && !exception)
            throw new Error('InvalidOperation: A failing result needs to contain an exception');

        this.isSuccess = isSuccess;
        this.isException = !isSuccess;
        this.exception = exception;
        this._value = value;

        Object.freeze(this);
    }

    public getValue(): T | undefined {
        if (!this.isSuccess) {
            console.log(this.exception);
            throw new Error("Can't get the value of an error result. Use 'errorValue' instead.");
        }

        return this._value;
    }

    public exceptionValue(): T | string | undefined {
        return this.exception;
    }

    public static ok<U>(value?: U): Result<U> {
        return new Result<U>(true, undefined, value);
    }

    public static fail<U>(error: any): Result<U> {
        return new Result<U>(false, error);
    }

    public static combine(results: Result<any>[]): Result<any> {
        for (const result of results) if (result.isException) return result;

        return Result.ok();
    }
}

export type Either<E, S> = Exception<E, S> | Success<E, S>;

export class Exception<E, S> {
    readonly value: E;

    constructor(value: E) {
        this.value = value;
    }

    isException(): this is Exception<E, S> {
        return true;
    }

    isSuccess(): this is Success<E, S> {
        return false;
    }
}

export class Success<E, S> {
    readonly value: S;

    constructor(value: S) {
        this.value = value;
    }

    isException(): this is Exception<E, S> {
        return false;
    }

    isSuccess(): this is Success<E, S> {
        return true;
    }
}

export const exception = <E, S>(e: E): Either<E, S> => {
    return new Exception(e);
};

export const success = <E, S>(s: S): Either<E, S> => {
    return new Success<E, S>(s);
};
