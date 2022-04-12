package com.jolimoi_test.kotlin_server.configuration

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.integration.dsl.MessageChannels
import org.springframework.messaging.SubscribableChannel

@Configuration
class ChannelConfiguration {
    @Bean
    fun channel(): SubscribableChannel = MessageChannels.publishSubscribe().get()
}