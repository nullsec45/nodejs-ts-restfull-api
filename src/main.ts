import {server} from "./applications/server";
import {logger} from "./applications/logger";

server.listen(3000, () => {
    logger.info("Listening on port 3000");
})