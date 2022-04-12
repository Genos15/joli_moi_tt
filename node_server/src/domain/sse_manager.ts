import e from "express";

const SseChannel = require('sse-channel');

export default class SSeManager {
    private channel: any;

    constructor() {
        this.channel = new SseChannel({
            retryTimeout: 250,
            historySize: 300,
            pingInterval: 15000,
            jsonEncode: false,
        });
    }

    addClient = (request: e.Request, response: e.Response) => {
        this.channel.addClient(request, response);
    }

    send = async (id: string, data: string) => {
        this.channel.send({
            id: id,
            data: data
        });
    }

    close() {
        this.channel.close();
    }
}