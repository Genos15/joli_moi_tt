package com.jolimoi_test.kotlin_server.repository

interface NumeralConvertRepository {
    suspend fun convert(input: Int, clientId: String? = null): String
}