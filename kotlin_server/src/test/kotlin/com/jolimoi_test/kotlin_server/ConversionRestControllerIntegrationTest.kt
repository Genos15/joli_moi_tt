package com.jolimoi_test.kotlin_server

import org.junit.jupiter.api.Test
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.web.reactive.server.WebTestClient

//@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class ConversionRestControllerIntegrationTest  {

    private val ioClient: WebTestClient = WebTestClient
        .bindToServer()
        .baseUrl("http://localhost:8080")
        .build()

//    @Test
    fun `should request roman numeral equivalence of numbers`() {
        ioClient.get().uri("/converter/roman/{number}", 1984)
            .exchange()
            .expectStatus().isOk
            .expectBody(String::class.java).isEqualTo("MCMLXXXIV")
    }
}