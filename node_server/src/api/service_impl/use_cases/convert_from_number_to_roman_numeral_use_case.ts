import {dictionary} from "@config/words/dictionary";
import {HttpRequestError} from "@config/exceptions/http_request_error";

export default function convertFromIntegerToRomanNumeralUseCase(input: number): string {

    if (!input || input <= 0) {
        throw new HttpRequestError(400, 'This input is invalid. Input should be at least 1');
    }

    if (!Number.isInteger(input)) {
        throw new HttpRequestError(400, 'This input is invalid. Input should be an integer');
    }

    let result: string = "";
    const keys = Array.from(dictionary.keys());
    const values = Array.from(dictionary.values());
    for (let i = 0; i < keys.length; i++) {
        const equivalent = keys[i];
        while (input >= equivalent) {
            input -= equivalent;
            result += values[i];
        }
    }

    if (result.length === 0) {
        throw new HttpRequestError(400, 'Something went wrong');
    }

    return result;
}

