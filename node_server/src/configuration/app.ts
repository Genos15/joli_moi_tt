require('module-alias/register');
import {createServer} from "@config/core/server";
import logger from "@config/logger/logger";

const PORT = 8080;

createServer()
    .then((server) => {
        server.listen(PORT, () => {
            logger.info(`Listening on port ${PORT}`)
        });
    }).catch(err => {
    logger.error(`HardError: ${err}`)
});

