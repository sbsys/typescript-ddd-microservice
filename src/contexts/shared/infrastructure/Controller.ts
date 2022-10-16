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

    public continue<T>(data?: T) {
        return Controller.jsonResponse<T | string>(this.res, 100, data ?? 'Continue');
    }

    public switchingProtocol<T>(data?: T) {
        return Controller.jsonResponse<T | string>(this.res, 101, data ?? 'Switching protocol');
    }

    public processing<T>(data?: T) {
        return Controller.jsonResponse<T | string>(this.res, 102, data ?? 'Processing');
    }

    public ok<T>(data?: T) {
        return Controller.jsonResponse<T | string>(this.res, 200, data ?? 'Ok');
    }

    public created<T>(data?: T) {
        return Controller.jsonResponse<T | string>(this.res, 201, data ?? 'Created');
    }

    public accepted<T>(data?: T) {
        return Controller.jsonResponse<T | string>(this.res, 202, data ?? 'Accepted');
    }

    public nonAuthoritative<T>(data?: T) {
        return Controller.jsonResponse<T | string>(this.res, 203, data ?? 'Non authoritative');
    }

    public noContent<T>(data?: T) {
        return Controller.jsonResponse<T | string>(this.res, 204, data ?? 'No content');
    }

    public resetContent<T>(data?: T) {
        return Controller.jsonResponse<T | string>(this.res, 205, data ?? 'Reset content');
    }

    public partialContent<T>(data?: T) {
        return Controller.jsonResponse<T | string>(this.res, 206, data ?? 'Partial content');
    }

    public multipleChoices<T>(data?: T) {
        return Controller.jsonResponse<T | string>(this.res, 300, data ?? 'Multiple choices');
    }

    public movedPermanently<T>(data?: T) {
        return Controller.jsonResponse<T | string>(this.res, 301, data ?? 'Moved permanently');
    }

    public found<T>(data?: T) {
        return Controller.jsonResponse<T | string>(this.res, 302, data ?? 'Found');
    }

    public seeOther<T>(data?: T) {
        return Controller.jsonResponse<T | string>(this.res, 303, data ?? 'See other');
    }

    public notModified<T>(data?: T) {
        return Controller.jsonResponse<T | string>(this.res, 304, data ?? 'Not modified');
    }

    public useProxy<T>(data?: T) {
        return Controller.jsonResponse<T | string>(this.res, 305, data ?? 'Use proxy');
    }

    public unused<T>(data?: T) {
        return Controller.jsonResponse<T | string>(this.res, 306, data ?? 'Unused');
    }

    public badRequest<T>(data?: T) {
        return Controller.jsonResponse<T | string>(this.res, 400, data ?? 'Bad request');
    }

    public unauthorized<T>(data?: T) {
        return Controller.jsonResponse<T | string>(this.res, 401, data ?? 'Unauthorized');
    }

    public paymentRequired<T>(data?: T) {
        return Controller.jsonResponse<T | string>(this.res, 402, data ?? 'Payment required');
    }

    public forbidden<T>(data?: T) {
        return Controller.jsonResponse<T | string>(this.res, 403, data ?? 'Forbidden');
    }

    public notFound<T>(data?: T) {
        return Controller.jsonResponse<T | string>(this.res, 404, data ?? 'Not found');
    }

    public methodNotAllowed<T>(data?: T) {
        return Controller.jsonResponse<T | string>(this.res, 405, data ?? 'Method not allowed');
    }

    public notAcceptable<T>(data?: T) {
        return Controller.jsonResponse<T | string>(this.res, 406, data ?? 'Not acceptable');
    }

    public proxyAuthenticatedRequired<T>(data?: T) {
        return Controller.jsonResponse<T | string>(this.res, 407, data ?? 'Proxy authenticated required');
    }

    public requestTimeout<T>(data?: T) {
        return Controller.jsonResponse<T | string>(this.res, 408, data ?? 'Request timeout');
    }

    public conflict<T>(data?: T) {
        return Controller.jsonResponse<T | string>(this.res, 409, data ?? 'Conflict');
    }

    public gone<T>(data?: T) {
        return Controller.jsonResponse<T | string>(this.res, 410, data ?? 'Gone');
    }

    public lengthRequired<T>(data?: T) {
        return Controller.jsonResponse<T | string>(this.res, 411, data ?? 'Length required');
    }

    public preconditionFailed<T>(data?: T) {
        return Controller.jsonResponse<T | string>(this.res, 412, data ?? 'Precondition failed');
    }

    public requestEntityTooLarge<T>(data?: T) {
        return Controller.jsonResponse<T | string>(this.res, 413, data ?? 'Request entity too large');
    }

    public unsupportedMediaType<T>(data?: T) {
        return Controller.jsonResponse<T | string>(this.res, 415, data ?? 'Unsupported media type');
    }

    public unprocessableEntity<T>(data?: T) {
        return Controller.jsonResponse<T | string>(this.res, 422, data ?? 'Unprocessable entity');
    }

    public internalServerError<T>(data?: T) {
        return Controller.jsonResponse<T | string>(this.res, 500, data ?? 'Internal server error');
    }

    public notImplemented<T>(data?: T) {
        return Controller.jsonResponse<T | string>(this.res, 501, data ?? 'Not implemented');
    }

    public badGateway<T>(data?: T) {
        return Controller.jsonResponse<T | string>(this.res, 502, data ?? 'Bad gateway');
    }

    public serviceUnavailable<T>(data?: T) {
        return Controller.jsonResponse<T | string>(this.res, 503, data ?? 'Service unavailable');
    }

    public gatewayTimeout<T>(data?: T) {
        return Controller.jsonResponse<T | string>(this.res, 504, data ?? 'Gateway timeout');
    }

    public tooManyRequests<T>(data?: T) {
        return Controller.jsonResponse<T | string>(this.res, 429, data ?? 'Too many requests');
    }
}
