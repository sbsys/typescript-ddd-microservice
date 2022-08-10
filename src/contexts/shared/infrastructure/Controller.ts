import { Request, Response } from 'express';

export abstract class Controller {
    constructor(protected req: Request, protected res: Response) {}

    protected abstract implementation(): Promise<void>;

    public execute(req: Request, res: Response): void {
        this.req = req;
        this.res = res;

        this.implementation();
    }

    public static jsonResponse<T>(res: Response, code: number, data?: T) {
        return res.status(code).json(data);
    }

    public ok<T>(data?: T) {
        return Controller.jsonResponse<T | string>(this.res, 200, data);
    }

    public created<T>(data?: T) {
        return Controller.jsonResponse<T | string>(this.res, 201, data);
    }

    public clientError<T>(data?: T) {
        return Controller.jsonResponse<T | string>(this.res, 400, data ? data : 'Unauthorized');
    }

    public unauthorized<T>(data?: T) {
        return Controller.jsonResponse<T | string>(this.res, 401, data ? data : 'Unauthorized');
    }

    public paymentRequired<T>(data?: T) {
        return Controller.jsonResponse<T | string>(this.res, 402, data ? data : 'Payment required');
    }

    public forbidden<T>(data?: T) {
        return Controller.jsonResponse<T | string>(this.res, 403, data ? data : 'Forbidden');
    }

    public notFound<T>(data?: T) {
        return Controller.jsonResponse<T | string>(this.res, 404, data ? data : 'Not found');
    }

    public conflict<T>(data?: T) {
        return Controller.jsonResponse<T | string>(this.res, 409, data ? data : 'Conflict');
    }

    public tooMany<T>(data?: T) {
        return Controller.jsonResponse<T | string>(this.res, 429, data ? data : 'Too many requests');
    }

    public fail<T>(data?: T) {
        return Controller.jsonResponse<T | string>(this.res, 500, data ? data : 'Internal server error');
    }
}
