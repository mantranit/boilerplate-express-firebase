export declare class HttpError extends Error {
    httpCode: number;
    constructor(httpCode: number, message?: string);
}

export declare class BadRequestError extends HttpError {
    name: string;
    constructor(message?: string);
}

export declare class ForbiddenError extends HttpError {
    name: string;
    constructor(message?: string);
}

export declare class InternalServerError extends HttpError {
    name: string;
    constructor(message: string);
}

export declare class MethodNotAllowedError extends HttpError {
    name: string;
    constructor(message?: string);
}

export declare class NotAcceptableError extends HttpError {
    name: string;
    constructor(message?: string);
}

export declare class NotFoundError extends HttpError {
    name: string;
    constructor(message?: string);
}

export declare class UnauthorizedError extends HttpError {
    name: string;
    constructor(message?: string);
}
