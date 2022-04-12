import NumeralConvertRepository from "@api/repository/numeral_convert_repository";
import convertFromIntegerToRomanNumeralUseCase from "../use_cases/convert_from_number_to_roman_numeral_use_case";

class RomanNumeralConvertServiceImpl extends NumeralConvertRepository {
    convert = (input: number): string => convertFromIntegerToRomanNumeralUseCase(input);
}

export {
    RomanNumeralConvertServiceImpl
}