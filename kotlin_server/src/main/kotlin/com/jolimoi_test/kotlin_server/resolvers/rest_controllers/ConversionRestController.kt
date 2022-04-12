package com.jolimoi_test.kotlin_server.resolvers.rest_controllers

import com.jolimoi_test.kotlin_server.repository.NotifierRepository
import com.jolimoi_test.kotlin_server.repository.NumeralConvertRepository
import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.http.MediaType
import org.springframework.http.codec.ServerSentEvent
import org.springframework.web.bind.annotation.*

import reactor.core.publisher.Flux

import org.springframework.web.bind.annotation.GetMapping


@RestController
@RequestMapping("converter")
@CrossOrigin(origins = ["*"], allowedHeaders = ["*"])
class ConversionRestController(
    @Qualifier("romanNumeralConvertServiceImpl") private val service: NumeralConvertRepository,
    private var notifier: NotifierRepository
) {

    @GetMapping(path = ["roman/{number}"], produces = [MediaType.TEXT_PLAIN_VALUE])
    @ExceptionHandler(value = [NumberFormatException::class])
    suspend fun convert(@PathVariable number: Int, @RequestHeader("x-client-id") clientId: String?): String =
        service.convert(input = number, clientId = clientId)

    @GetMapping(path = ["/events/{clientId}"], produces = [MediaType.TEXT_EVENT_STREAM_VALUE])
    fun streamJob(@PathVariable clientId: String): Flux<ServerSentEvent<String>> =
        notifier.register(clientId = clientId)
}