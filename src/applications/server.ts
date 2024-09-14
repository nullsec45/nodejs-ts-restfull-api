import express from "express";
import { publicRouter } from "../routes/public-api";
import { errorMiddleware } from "../middlewares/error-middleware";

export const server=express();
server.use(express.json());
server.use(publicRouter);
server.use(errorMiddleware);