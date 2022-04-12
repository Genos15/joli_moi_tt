import e from "express";
import {writeJsonResponse} from "@config/core/express";
import NumeralConvertRepository from "@api/repository/numeral_convert_repository";
import {HttpRequestError} from "@config/exceptions/http_request_error";
import NotifierRepository from "@api/repository/notifier_repository";

export async function convert(request: e.Request, response: e.Response, next: e.NextFunction) {
    let isNum = /^\d+$/.test(request.params?.['input']);
    if (!isNum) {
        return next(new HttpRequestError(400, 'Input must be a number'));
    }
    const input = Number.parseInt(request.params['input']);
    if (!(request as any)['service'] || !((request as any)['service'] instanceof NumeralConvertRepository)) {
        return next(new HttpRequestError(500, 'Server service not responding properly'));
    }
    const service = (request as unknown as { service: NumeralConvertRepository }).service;
    const outcome = service.convert(input);
    const token: string | undefined = request.headers['x-client-id'] as string | undefined;
    if (token && ((request as any)['notifier'] && ((request as any)['notifier'] instanceof NotifierRepository))) {
        const notifier = (request as unknown as { notifier: NotifierRepository }).notifier;
        await notifier.notify(token, outcome);
    }
    writeJsonResponse(response, 200, outcome);
}