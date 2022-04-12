package com.jolimoi_test.kotlin_server.repository

import org.springframework.http.codec.ServerSentEvent
import reactor.core.publisher.Flux

interface NotifierRepository {
    fun register(clientId: String): Flux<ServerSentEvent<String>>
    suspend fun close(clientId: String): Boolean
    suspend fun notify(clientId: String, data: String)
}