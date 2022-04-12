import express from "express";

export default abstract class NotifierRepository {

    abstract register(clientId: string, request: express.Request, response: express.Response): void;

    abstract close(): void;

    abstract notify(clientId: string, data: string): Promise<void>;
}