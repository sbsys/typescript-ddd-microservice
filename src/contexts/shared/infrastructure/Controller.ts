import { request, Request, response, Response } from 'express';
import { injectable } from 'inversify';
import { KindError } from '../domain';

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

    public continue<MESSAGE extends string, T = unknown>(message?: MESSAGE, data?: T) {
        return this.JSONResponse<T | string>(100, false, message ?? 'Continue', data);
    }

    public switchingProtocol<MESSAGE extends string, T = unknown>(message?: MESSAGE, data?: T) {
        return this.JSONResponse<T | string>(101, false, message ?? 'Switching protocol', data);
    }

    public processing<MESSAGE extends string, T = unknown>(message?: MESSAGE, data?: T) {
        return this.JSONResponse<T | string>(102, false, message ?? 'Processing', data);
    }

    public ok<MESSAGE extends string, T = unknown>(message?: MESSAGE, data?: T) {
        return this.JSONResponse<T | string>(200, true, message ?? 'Ok', data);
    }

    public created<MESSAGE extends string, T = unknown>(message?: MESSAGE, data?: T) {
        return this.JSONResponse<T | string>(201, true, message ?? 'Created', data);
    }

    public accepted<MESSAGE extends string, T = unknown>(message?: MESSAGE, data?: T) {
        return this.JSONResponse<T | string>(202, true, message ?? 'Accepted', data);
    }

    public nonAuthoritative<MESSAGE extends string, T = unknown>(message?: MESSAGE, data?: T) {
        return this.JSONResponse<T | string>(203, true, message ?? 'Non authoritative', data);
    }

    public noContent<MESSAGE extends string, T = unknown>(message?: MESSAGE, data?: T) {
        return this.JSONResponse<T | string>(204, true, message ?? 'No content', data);
    }

    public resetContent<MESSAGE extends string, T = unknown>(message?: MESSAGE, data?: T) {
        return this.JSONResponse<T | string>(205, true, message ?? 'Reset content', data);
    }

    public partialContent<MESSAGE extends string, T = unknown>(message?: MESSAGE, data?: T) {
        return this.JSONResponse<T | string>(206, true, message ?? 'Partial content', data);
    }

    public multipleChoices<MESSAGE extends string, T = unknown>(message?: MESSAGE, data?: T) {
        return this.JSONResponse<T | string>(300, false, message ?? 'Multiple choices', data);
    }

    public movedPermanently<MESSAGE extends string, T = unknown>(message?: MESSAGE, data?: T) {
        return this.JSONResponse<T | string>(301, false, message ?? 'Moved permanently', data);
    }

    public found<MESSAGE extends string, T = unknown>(message?: MESSAGE, data?: T) {
        return this.JSONResponse<T | string>(302, false, message ?? 'Found', data);
    }

    public seeOther<MESSAGE extends string, T = unknown>(message?: MESSAGE, data?: T) {
        return this.JSONResponse<T | string>(303, false, message ?? 'See other', data);
    }

    public notModified<MESSAGE extends string, T = unknown>(message?: MESSAGE, data?: T) {
        return this.JSONResponse<T | string>(304, false, message ?? 'Not modified', data);
    }

    public useProxy<MESSAGE extends string, T = unknown>(message?: MESSAGE, data?: T) {
        return this.JSONResponse<T | string>(305, false, message ?? 'Use proxy', data);
    }

    public unused<MESSAGE extends string, T = unknown>(message?: MESSAGE, data?: T) {
        return this.JSONResponse<T | string>(306, false, message ?? 'Unused', data);
    }

    public badRequest<MESSAGE extends string, T = unknown>(message?: MESSAGE, data?: T) {
        return this.JSONResponse<T | string>(400, false, message ?? 'Bad request', data);
    }

    public unauthorized<MESSAGE extends string, T = unknown>(message?: MESSAGE, data?: T) {
        return this.JSONResponse<T | string>(401, false, message ?? 'Unauthorized', data);
    }

    public paymentRequired<MESSAGE extends string, T = unknown>(message?: MESSAGE, data?: T) {
        return this.JSONResponse<T | string>(402, false, message ?? 'Payment required', data);
    }

    public forbidden<MESSAGE extends string, T = unknown>(message?: MESSAGE, data?: T) {
        return this.JSONResponse<T | string>(403, false, message ?? 'Forbidden', data);
    }

    public notFound<MESSAGE extends string, T = unknown>(message?: MESSAGE, data?: T) {
        return this.JSONResponse<T | string>(404, false, message ?? 'Not found', data);
    }

    public methodNotAllowed<MESSAGE extends string, T = unknown>(message?: MESSAGE, data?: T) {
        return this.JSONResponse<T | string>(405, false, message ?? 'Method not allowed', data);
    }

    public notAcceptable<MESSAGE extends string, T = unknown>(message?: MESSAGE, data?: T) {
        return this.JSONResponse<T | string>(406, false, message ?? 'Not acceptable', data);
    }

    public proxyAuthenticatedRequired<MESSAGE extends string, T = unknown>(message?: MESSAGE, data?: T) {
        return this.JSONResponse<T | string>(407, false, message ?? 'Proxy authenticated required', data);
    }

    public requestTimeout<MESSAGE extends string, T = unknown>(message?: MESSAGE, data?: T) {
        return this.JSONResponse<T | string>(408, false, message ?? 'Request timeout', data);
    }

    public conflict<MESSAGE extends string, T = unknown>(message?: MESSAGE, data?: T) {
        return this.JSONResponse<T | string>(409, false, message ?? 'Conflict', data);
    }

    public gone<MESSAGE extends string, T = unknown>(message?: MESSAGE, data?: T) {
        return this.JSONResponse<T | string>(410, false, message ?? 'Gone', data);
    }

    public lengthRequired<MESSAGE extends string, T = unknown>(message?: MESSAGE, data?: T) {
        return this.JSONResponse<T | string>(411, false, message ?? 'Length required', data);
    }

    public preconditionFailed<MESSAGE extends string, T = unknown>(message?: MESSAGE, data?: T) {
        return this.JSONResponse<T | string>(412, false, message ?? 'Precondition failed', data);
    }

    public requestEntityTooLarge<MESSAGE extends string, T = unknown>(message?: MESSAGE, data?: T) {
        return this.JSONResponse<T | string>(413, false, message ?? 'Request entity too large', data);
    }

    public unsupportedMediaType<MESSAGE extends string, T = unknown>(message?: MESSAGE, data?: T) {
        return this.JSONResponse<T | string>(415, false, message ?? 'Unsupported media type', data);
    }

    public unprocessableEntity<MESSAGE extends string, T = unknown>(message?: MESSAGE, data?: T) {
        return this.JSONResponse<T | string>(422, false, message ?? 'Unprocessable entity', data);
    }

    public internalServerError<MESSAGE extends string, T = unknown>(message?: MESSAGE, data?: T) {
        return this.JSONResponse<T | string>(500, false, message ?? 'Internal server error', data);
    }

    public notImplemented<MESSAGE extends string, T = unknown>(message?: MESSAGE, data?: T) {
        return this.JSONResponse<T | string>(501, false, message ?? 'Not implemented', data);
    }

    public badGateway<MESSAGE extends string, T = unknown>(message?: MESSAGE, data?: T) {
        return this.JSONResponse<T | string>(502, false, message ?? 'Bad gateway', data);
    }

    public serviceUnavailable<MESSAGE extends string, T = unknown>(message?: MESSAGE, data?: T) {
        return this.JSONResponse<T | string>(503, false, message ?? 'Service unavailable', data);
    }

    public gatewayTimeout<MESSAGE extends string, T = unknown>(message?: MESSAGE, data?: T) {
        return this.JSONResponse<T | string>(504, false, message ?? 'Gateway timeout', data);
    }

    public tooManyRequests<MESSAGE extends string, T = unknown>(message?: MESSAGE, data?: T) {
        return this.JSONResponse<T | string>(429, false, message ?? 'Too many requests', data);
    }

    public errorResponse: Record<KindError, (message?: string, data?: unknown) => void> = {
        unexpected: this.internalServerError.bind(this),
        notfound: this.notFound.bind(this),
        notvalid: this.badRequest.bind(this),
        conflict: this.conflict.bind(this),
    };
}
