import request from 'supertest';
import {createServer} from "@config/core/server";
import express from "express";

describe('Api convert to roman numeral', () => {
    let app: express.Application;
    beforeAll(async () => {
        app = await createServer();
    });

    it('should return 200 & conversion of 1984 should be equal to MCMLXXXIV', async () => {
        request(app)
            .get(`/converter/roman/1984`)
            .expect(200)
            .end((err, res) => {
                expect(res.body).toContainEqual("MCMLXXXIV");
            });
    });
});