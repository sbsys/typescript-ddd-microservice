/* eslint-disable @typescript-eslint/no-explicit-any */
export class Result<ERROR, SUCCESS> {
    public isError: boolean;
    private _error?: ERROR;

    public isSuccess: boolean;
    private _success?: SUCCESS;

    private constructor(isOK: boolean, error?: ERROR, success?: SUCCESS) {
        if (isOK && error) throw new Error('InvalidOperation: A result cannot be successful and contain an error');

        if (!isOK && !error) throw new Error('InvalidOperation: A failing result needs to contain an error');

        this.isError = !isOK;
        this._error = error;

        this.isSuccess = isOK;
        this._success = success;

        Object.freeze(this);
    }

    public getSuccess(): SUCCESS {
        if (!this.isSuccess) throw new Error("InvalidOperation: Can't get a success value");

        return this._success as SUCCESS;
    }

    public getError(): ERROR {
        if (!this.isError) throw new Error("InvalidOperation: Can't get an error value");

        return this._error as ERROR;
    }

    public static Success<ERROR, SUCCESS>(success?: SUCCESS): Result<ERROR, SUCCESS> {
        return new Result<ERROR, SUCCESS>(true, undefined, success);
    }

    public static Error<ERROR, SUCCESS>(exception: ERROR): Result<ERROR, SUCCESS> {
        return new Result<ERROR, SUCCESS>(false, exception);
    }

    public static Combine<ERROR>(results: Result<ERROR, any>[]): Result<ERROR, void> {
        const foundException = results.find(result => result.isError);

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
