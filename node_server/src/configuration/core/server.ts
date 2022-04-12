import e from 'express';
import {Express} from 'express-serve-static-core';
import {exposeService} from "@config/routes/service_exposer";
import router from "@api/api_routes";
import logger from "@config/logger/logger";
import {HttpRequestError} from "@config/exceptions/http_request_error";
import {BaseError} from "@config/exceptions/base_error";
import cors from "cors";
import compression from "compression";

export async function createServer(): Promise<Express> {
    const server = e();
    server.use(cors());
    server.use(compression({
        filter: (req, res) => {
            if (req.headers['x-no-compress']) {
                return false;
            }
            return compression.filter(req, res);
        }
    }));
    server.use('/converter', exposeService, router);
    server.use((error: BaseError, req: e.Request, res: e.Response, _: e.NextFunction) => {
        logger.error(error);
        const _statusCode = error instanceof HttpRequestError && error.status || 500;
        const _message = error instanceof HttpRequestError && error.message || "Internal Server Error";
        res.status(_statusCode).json({
            error: {
                type: 'Internal Server Error',
                message: _message,
                links: error,
            }
        });
    });
    return server;
}