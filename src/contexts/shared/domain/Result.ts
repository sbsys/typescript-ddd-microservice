/* eslint-disable @typescript-eslint/no-explicit-any */
export class Result<EXCEPTION, SUCCESS> {
    public isException: boolean;
    private _exception?: EXCEPTION;

    public isSuccess: boolean;
    private _success?: SUCCESS;

    public constructor(isSuccess: boolean, exception?: EXCEPTION, success?: SUCCESS) {
        if (isSuccess && exception)
            throw new Error('InvalidOperation: A result cannot be successful and contain an exception');

        if (!isSuccess && !exception)
            throw new Error('InvalidOperation: A failing result needs to contain an exception');

        this.isException = !isSuccess;
        this.isSuccess = isSuccess;
        this._exception = exception;
        this._success = success;

        Object.freeze(this);
    }

    public getSuccessValue(): SUCCESS {
        if (!this.isSuccess) throw new Error("Can't get the value of an error result. Use 'errorValue' instead.");

        return this._success as SUCCESS;
    }

    public getExceptionValue(): EXCEPTION {
        return this._exception as EXCEPTION;
    }

    public static Success<EXCEPTION, SUCCESS>(success?: SUCCESS): Result<EXCEPTION, SUCCESS> {
        return new Result<EXCEPTION, SUCCESS>(true, undefined, success);
    }

    public static Exception<EXCEPTION, SUCCESS>(exception: EXCEPTION): Result<EXCEPTION, SUCCESS> {
        return new Result<EXCEPTION, SUCCESS>(false, exception);
    }

    public static Combine<EXCEPTION>(results: Result<EXCEPTION, any>[]): Result<EXCEPTION, void> {
        const foundException = results.find(result => result.isException);

        if (foundException) return foundException;

        return Result.Success();
    }
}

/* export type Either<EXCEPTION, SUCCESS> = Exception<EXCEPTION, SUCCESS> | Success<EXCEPTION, SUCCESS>;

export class Exception<EXCEPTION, SUCCESS> {
    readonly result: EXCEPTION;

    constructor(exception: EXCEPTION) {
        this.result = exception;
    }

    isException(): this is Exception<EXCEPTION, SUCCESS> {
        return true;
    }

    isSuccess(): this is Success<EXCEPTION, SUCCESS> {
        return false;
    }
}

export class Success<EXCEPTION, SUCCESS> {
    readonly result: SUCCESS;

    constructor(success: SUCCESS) {
        this.result = success;
    }

    isException(): this is Exception<EXCEPTION, SUCCESS> {
        return false;
    }

    isSuccess(): this is Success<EXCEPTION, SUCCESS> {
        return true;
    }
}

export const exception = <EXCEPTION, SUCCESS>(exception: EXCEPTION): Either<EXCEPTION, SUCCESS> => {
    return new Exception(exception);
};

export const success = <EXCEPTION, SUCCESS>(success: SUCCESS): Either<EXCEPTION, SUCCESS> => {
    return new Success<EXCEPTION, SUCCESS>(success);
}; */
