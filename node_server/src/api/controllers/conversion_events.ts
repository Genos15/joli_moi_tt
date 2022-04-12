import e from "express";
import {HttpRequestError} from "@config/exceptions/http_request_error";
import NotifierRepository from "@api/repository/notifier_repository";

export async function convert_event(request: e.Request, response: e.Response, next: e.NextFunction) {
    const token = request.params?.['id'];
    if (!token) {
        return next(new HttpRequestError(400, 'Impossible to reference the client'));
    }
    if (!(request as any)['notifier'] || !((request as any)['notifier'] instanceof NotifierRepository)) {
        return next(new HttpRequestError(500, 'Server service not responding properly'));
    }
    const notifier = (request as unknown as { notifier: NotifierRepository }).notifier;
    notifier.register(token, request, response);
    request.on('close', () => {
        notifier.close();
    });
}