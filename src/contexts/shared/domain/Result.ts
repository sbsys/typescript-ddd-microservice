/* eslint-disable @typescript-eslint/no-explicit-any */
export class Result<T> {
    public isSuccess: boolean;
    public isException: boolean;
    public exception: T | undefined;
    private _value: T | undefined;

    public constructor(isSuccess: boolean, exception?: T, value?: T) {
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

    public getValue(): T {
        if (!this.isSuccess) throw new Error("Can't get the value of an error result. Use 'errorValue' instead.");

        return this._value as T;
    }

    public getExceptionValue(): T {
        return this.exception as T;
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

export type Either<EXCEPTION, SUCCESS> = Exception<EXCEPTION, SUCCESS> | Success<EXCEPTION, SUCCESS>;

export class Exception<EXCEPTION, SUCCESS> {
    readonly error: EXCEPTION;

    constructor(value: EXCEPTION) {
        this.error = value;
    }

    isException(): this is Exception<EXCEPTION, SUCCESS> {
        return true;
    }

    isSuccess(): this is Success<EXCEPTION, SUCCESS> {
        return false;
    }
}

export class Success<EXCEPTION, SUCCESS> {
    readonly value: SUCCESS;

    constructor(value: SUCCESS) {
        this.value = value;
    }

    isException(): this is Exception<EXCEPTION, SUCCESS> {
        return false;
    }

    isSuccess(): this is Success<EXCEPTION, SUCCESS> {
        return true;
    }
}

export const exception = <EXCEPTION, SUCCESS>(e: EXCEPTION): Either<EXCEPTION, SUCCESS> => {
    return new Exception(e);
};

export const success = <EXCEPTION, SUCCESS>(s: SUCCESS): Either<EXCEPTION, SUCCESS> => {
    return new Success<EXCEPTION, SUCCESS>(s);
};
