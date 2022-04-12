package com.jolimoi_test.kotlin_server.service_impl.use_cases

private val dictionary: Map<Int, String> = mapOf(
    1000 to "M",
    900 to "CM",
    500 to "D",
    400 to "CD",
    100 to "C",
    90 to "XC",
    50 to "L",
    40 to "XL",
    10 to "X",
    9 to "IX",
    5 to "V",
    4 to "IV",
    1 to "I",
)

fun convertFromIntegerToRomanNumeralUseCase(number: Int): String {
    if (number <= 0) {
        throw NumberFormatException("Impossible to represent numbers less than 1")
    }
    var numberCopy = number
    return buildString {
        for (i in 0 until dictionary.size) {
            val equivalent = dictionary.keys.elementAt(i)
            while (numberCopy >= equivalent) {
                numberCopy -= equivalent
                append(dictionary.values.elementAt(i))
            }
        }
    }
}