package com.jolimoi_test.kotlin_server

import com.jolimoi_test.kotlin_server.repository.NumeralConvertRepository
import org.assertj.core.api.Assertions
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.boot.test.context.SpringBootTest

@SpringBootTest
class ConversionTestUseCases(@Qualifier("romanNumeralConvertServiceImpl") private val service: NumeralConvertRepository) {
    @Test
    suspend fun `should provide roman numeral equivalence of positve integer`() {
        val result = service.convert(1984)
        Assertions.assertThat(result).isNotNull
        Assertions.assertThat(result).isEqualTo("MCMLXXXIV")
    }
}