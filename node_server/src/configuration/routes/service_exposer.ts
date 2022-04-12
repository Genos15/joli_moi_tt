import {RomanNumeralConvertServiceImpl} from "@api/service_impl/implementations/roman_numeral_convert_service_impl";
import e from "express";
import notifierInstance from "@api/service_impl/implementations/roman_numeral_notifier_service_impl";

const service = () => {
    return Object.freeze(new RomanNumeralConvertServiceImpl());
};

const notifier = () => {
    return Object.freeze(notifierInstance);
};

export const exposeService = (request: e.Request, response: e.Response, next: e.NextFunction) => {
    Object.assign(request, {service: service(), notifier: notifier()});
    next();
};
