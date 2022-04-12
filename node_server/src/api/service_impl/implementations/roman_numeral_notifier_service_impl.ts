import NotifierRepository from "@api/repository/notifier_repository";
import e from "express";
import SSeManager from "../../../domain/sse_manager";

class RomanNumeralNotifierServiceImpl extends NotifierRepository {
    private readonly manager: SSeManager;

    constructor() {
        super();
        this.manager = new SSeManager();
    }

    register(clientId: string, request: e.Request, response: e.Response): void {
        this.manager.addClient(request, response);
    }

    async notify(clientId: string, data: string) {
        await this.manager.send(clientId, data);
    }

    close(): void {
        this.manager.close();
    }
}

const notifierInstance = new RomanNumeralNotifierServiceImpl();
export default notifierInstance;