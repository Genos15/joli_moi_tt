package com.jolimoi_test.kotlin_server.service_impl.services

import com.jolimoi_test.kotlin_server.repository.NotifierRepository
import com.jolimoi_test.kotlin_server.repository.NumeralConvertRepository
import com.jolimoi_test.kotlin_server.service_impl.use_cases.convertFromIntegerToRomanNumeralUseCase
import org.springframework.stereotype.Service

@Service(value = "romanNumeralConvertServiceImpl")
class RomanNumeralConvertServiceImpl(private val notifier: NotifierRepository) : NumeralConvertRepository {
    override suspend fun convert(input: Int, clientId: String?): String =
        convertFromIntegerToRomanNumeralUseCase(number = input).let {
            if (clientId != null) {
                notifier.notify(clientId = clientId, data = it)
            }
            it
        }
}