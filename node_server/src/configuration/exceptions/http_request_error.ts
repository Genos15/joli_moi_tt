import {BaseError} from "@config/exceptions/base_error";

export class HttpRequestError extends BaseError {
    constructor(public status: number, public message: string) {
        super();
    }
}