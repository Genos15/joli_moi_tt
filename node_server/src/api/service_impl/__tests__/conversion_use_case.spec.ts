import convertFromIntegerToRomanNumeralUseCase
    from "../use_cases/convert_from_number_to_roman_numeral_use_case";

describe('use case convert to roman numeral', () => {
    it('should return the equivalent roman numeral', async () => {
        const result = convertFromIntegerToRomanNumeralUseCase(67);
        expect(result).toContainEqual("LXVII");
    });
});