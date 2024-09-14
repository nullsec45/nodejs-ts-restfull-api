import supertest from "supertest";
import {server} from "../src/applications/server";
import { logger } from "../src/applications/logger";
import { UserTest } from "./test-utils";

describe("POST /api/users", () => {
    afterEach(async () => {
        await UserTest.delete();
    });

    it("should reject register new user if request is invalid", async() => {
        const response=await supertest(server).post("/api/users").send({
            username:"",
            password:"",
            name:""
        });

        logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();

    });

    it("should register new user", async() => {
        const response=await supertest(server).post("/api/users").send({
            username:"test",
            password:"hayamwuruk123",
            name:"test"
        });

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.username).toBe("test");
        expect(response.body.data.name).toBe("test");
    });
});