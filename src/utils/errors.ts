import { Request, Response, NextFunction } from "express";

export class GeneralError {
    message: string;

    constructor(message: string) {
        this.message = message;
    }

    getCode(): number {
        if(this instanceof BadRequest) {
            return 400;
        }
        if(this instanceof NotFound) {
            return 404;
        }
    }
}

export class BadRequest extends GeneralError {}
export class NotFound extends GeneralError {}

const handleErrors = (err: Error | GeneralError, _req: Request, resp: Response, _next: NextFunction): void => {
    if(err instanceof GeneralError) {
        resp.status(err.getCode()).json({
            status: 'error',
            message: err.message
        });
    }

    resp.status(500).json({
        status: 'error',
        message: err.message
    });
}

export default handleErrors;