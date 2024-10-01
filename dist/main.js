"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./applications/server");
const logger_1 = require("./applications/logger");
server_1.server.listen(3000, () => {
    logger_1.logger.info("Listening on port 3000");
});
