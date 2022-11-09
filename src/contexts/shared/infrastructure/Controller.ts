import { request, Request, response, Response } from 'express';
import { injectable } from 'inversify';

@injectable()
export abstract class Controller {
    protected req: Request = request;
    protected res: Response = response;

    protected abstract implementation(): Promise<void>;

    public execute(req: Request, res: Response): void {
        this.req = req;
        this.res = res;

        this.implementation();
    }

    protected JSONResponse<T>(code: number, status: boolean, message: string, data?: T) {
        this.res.status(code).json({
            status,
            message,
            data,
        });
    }

    public continue<T>(message?: string, data?: T) {
        return this.JSONResponse<T | string>(100, false, message ?? 'Continue', data);
    }

    public switchingProtocol<T>(message?: string, data?: T) {
        return this.JSONResponse<T | string>(101, false, message ?? 'Switching protocol', data);
    }

    public processing<T>(message?: string, data?: T) {
        return this.JSONResponse<T | string>(102, false, message ?? 'Processing', data);
    }

    public ok<T>(message?: string, data?: T) {
        return this.JSONResponse<T | string>(200, true, message ?? 'Ok', data);
    }

    public created<T>(message?: string, data?: T) {
        return this.JSONResponse<T | string>(201, true, message ?? 'Created', data);
    }

    public accepted<T>(message?: string, data?: T) {
        return this.JSONResponse<T | string>(202, true, message ?? 'Accepted', data);
    }

    public nonAuthoritative<T>(message?: string, data?: T) {
        return this.JSONResponse<T | string>(203, true, message ?? 'Non authoritative', data);
    }

    public noContent<T>(message?: string, data?: T) {
        return this.JSONResponse<T | string>(204, true, message ?? 'No content', data);
    }

    public resetContent<T>(message?: string, data?: T) {
        return this.JSONResponse<T | string>(205, true, message ?? 'Reset content', data);
    }

    public partialContent<T>(message?: string, data?: T) {
        return this.JSONResponse<T | string>(206, true, message ?? 'Partial content', data);
    }

    public multipleChoices<T>(message?: string, data?: T) {
        return this.JSONResponse<T | string>(300, false, message ?? 'Multiple choices', data);
    }

    public movedPermanently<T>(message?: string, data?: T) {
        return this.JSONResponse<T | string>(301, false, message ?? 'Moved permanently', data);
    }

    public found<T>(message?: string, data?: T) {
        return this.JSONResponse<T | string>(302, false, message ?? 'Found', data);
    }

    public seeOther<T>(message?: string, data?: T) {
        return this.JSONResponse<T | string>(303, false, message ?? 'See other', data);
    }

    public notModified<T>(message?: string, data?: T) {
        return this.JSONResponse<T | string>(304, false, message ?? 'Not modified', data);
    }

    public useProxy<T>(message?: string, data?: T) {
        return this.JSONResponse<T | string>(305, false, message ?? 'Use proxy', data);
    }

    public unused<T>(message?: string, data?: T) {
        return this.JSONResponse<T | string>(306, false, message ?? 'Unused', data);
    }

    public badRequest<T>(message?: string, data?: T) {
        return this.JSONResponse<T | string>(400, false, message ?? 'Bad request', data);
    }

    public unauthorized<T>(message?: string, data?: T) {
        return this.JSONResponse<T | string>(401, false, message ?? 'Unauthorized', data);
    }

    public paymentRequired<T>(message?: string, data?: T) {
        return this.JSONResponse<T | string>(402, false, message ?? 'Payment required', data);
    }

    public forbidden<T>(message?: string, data?: T) {
        return this.JSONResponse<T | string>(403, false, message ?? 'Forbidden', data);
    }

    public notFound<T>(message?: string, data?: T) {
        return this.JSONResponse<T | string>(404, false, message ?? 'Not found', data);
    }

    public methodNotAllowed<T>(message?: string, data?: T) {
        return this.JSONResponse<T | string>(405, false, message ?? 'Method not allowed', data);
    }

    public notAcceptable<T>(message?: string, data?: T) {
        return this.JSONResponse<T | string>(406, false, message ?? 'Not acceptable', data);
    }

    public proxyAuthenticatedRequired<T>(message?: string, data?: T) {
        return this.JSONResponse<T | string>(407, false, message ?? 'Proxy authenticated required', data);
    }

    public requestTimeout<T>(message?: string, data?: T) {
        return this.JSONResponse<T | string>(408, false, message ?? 'Request timeout', data);
    }

    public conflict<T>(message?: string, data?: T) {
        return this.JSONResponse<T | string>(409, false, message ?? 'Conflict', data);
    }

    public gone<T>(message?: string, data?: T) {
        return this.JSONResponse<T | string>(410, false, message ?? 'Gone', data);
    }

    public lengthRequired<T>(message?: string, data?: T) {
        return this.JSONResponse<T | string>(411, false, message ?? 'Length required', data);
    }

    public preconditionFailed<T>(message?: string, data?: T) {
        return this.JSONResponse<T | string>(412, false, message ?? 'Precondition failed', data);
    }

    public requestEntityTooLarge<T>(message?: string, data?: T) {
        return this.JSONResponse<T | string>(413, false, message ?? 'Request entity too large', data);
    }

    public unsupportedMediaType<T>(message?: string, data?: T) {
        return this.JSONResponse<T | string>(415, false, message ?? 'Unsupported media type', data);
    }

    public unprocessableEntity<T>(message?: string, data?: T) {
        return this.JSONResponse<T | string>(422, false, message ?? 'Unprocessable entity', data);
    }

    public internalServerError<T>(message?: string, data?: T) {
        return this.JSONResponse<T | string>(500, false, message ?? 'Internal server error', data);
    }

    public notImplemented<T>(message?: string, data?: T) {
        return this.JSONResponse<T | string>(501, false, message ?? 'Not implemented', data);
    }

    public badGateway<T>(message?: string, data?: T) {
        return this.JSONResponse<T | string>(502, false, message ?? 'Bad gateway', data);
    }

    public serviceUnavailable<T>(message?: string, data?: T) {
        return this.JSONResponse<T | string>(503, false, message ?? 'Service unavailable', data);
    }

    public gatewayTimeout<T>(message?: string, data?: T) {
        return this.JSONResponse<T | string>(504, false, message ?? 'Gateway timeout', data);
    }

    public tooManyRequests<T>(message?: string, data?: T) {
        return this.JSONResponse<T | string>(429, false, message ?? 'Too many requests', data);
    }
}
