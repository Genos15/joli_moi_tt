package com.jolimoi_test.kotlin_server.service_impl.services

import com.jolimoi_test.kotlin_server.repository.NotifierRepository
import org.springframework.http.codec.ServerSentEvent
import org.springframework.messaging.MessageHandler
import org.springframework.messaging.SubscribableChannel
import org.springframework.messaging.support.GenericMessage
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux
import java.util.*

@Service
class RomanNumeralNotifierServiceImpl(private val channel: SubscribableChannel) : NotifierRepository {
    override fun register(clientId: String): Flux<ServerSentEvent<String>> = Flux.create { sink ->
        val messageHandler = MessageHandler { message ->
            val jobData: String = message.payload as String
            sink.next(
                ServerSentEvent.builder<String>()
                    .id("$clientId-${UUID.randomUUID()}")
                    .event("message")
                    .data(jobData)
                    .build()
            )
        }
        channel.subscribe(messageHandler)
    }

    override suspend fun close(clientId: String): Boolean = channel.unsubscribe { }

    override suspend fun notify(clientId: String, data: String) {
        channel.send(GenericMessage<String>(data))
    }
}