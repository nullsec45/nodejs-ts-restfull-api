"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const express_1 = __importDefault(require("express"));
const public_api_1 = require("../routes/public-api");
const error_middleware_1 = require("../middlewares/error-middleware");
const api_1 = require("../routes/api");
exports.server = (0, express_1.default)();
exports.server.use(express_1.default.json());
exports.server.use(public_api_1.publicRouter);
exports.server.use(api_1.apiRouter);
exports.server.use(error_middleware_1.errorMiddleware);
