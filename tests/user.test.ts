import supertest from "supertest";
import {server} from "../src/applications/server";
import { logger } from "../src/applications/logger";
import { UserTest } from "./test-utils";
import bcrypt from "bcrypt";

describe.skip("POST /api/users", () => {
    afterEach(async () => {
        await UserTest.delete();
    });

    it("should be able register new user if request is invalid", async() => {
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

describe.skip("POST /api/users/login",() => {
    beforeEach(async () => {
        await UserTest.create();
    });

    afterEach(async() => {
        await UserTest.delete();
    })

    it("should be able to login", async() => {
        const response=await supertest(server)
                            .post("/api/users/login")
                            .send({
                                username:"test",
                                password:"test"
                            });
        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.username).toBe("test");
        expect(response.body.data.name).toBe("test");
        expect(response.body.data.token).toBeDefined();
    });

    it("should reject login user if username is wrong", async() => {
        const response=await supertest(server)
                            .post("/api/users/login")
                            .send({
                                username:"salah",
                                password:"test"
                            });
        
        logger.debug(response.body);

        expect(response.status).toBe(401);
        expect(response.body.errors).toBeDefined();
    });

     it("should reject login user if password is wrong", async() => {
        const response=await supertest(server)
                            .post("/api/users/login")
                            .send({
                                username:"test",
                                password:"salah"
                            });
        
        logger.debug(response.body);

        expect(response.status).toBe(401);
        expect(response.body.errors).toBeDefined();
    });
});

describe.skip("GET /api/users/current",() => {
    beforeEach(async () => {
        await UserTest.create();
    });

    afterEach(async() => {
        await UserTest.delete();
    })

    it("should be able to get user", async() => {
         const response=await supertest(server)
                            .get("/api/users/current")
                            .set("X-API-TOKEN","test");
        
        logger.debug(response.body);

        expect(response.status).toBe(200);
        expect(response.body.data.username).toBe("test");
        expect(response.body.data.name).toBe("test");
    });

    it("should reject get user if token is invalid", async() => {
         const response=await supertest(server)
                            .get("/api/users/current")
                            .set("X-API-TOKEN","salah");
        
        logger.debug(response.body);

        expect(response.status).toBe(401);
        expect(response.body.errors).toBeDefined();
    });
});

describe("PATCH /api/users/current",() => {
    beforeEach(async () => {
        await UserTest.create();
    });

    afterEach(async() => {
        await UserTest.delete();
    });

    it("should reject update user if request is invalid", async() => {
         const response=await supertest(server)
                            .patch("/api/users/current")
                            .set("X-API-TOKEN","test")
                            .send({
                                username:"",
                                password:"",
                                name:""
                            });
        
        logger.debug(response.body);

        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });

    it("should reject update user if request is invalid", async() => {
         const response=await supertest(server)
                            .patch("/api/users/current")
                            .set("X-API-TOKEN","salah")
                            .send({
                                username:"test update",
                                name:"test update"
                            })
        
        logger.debug(response.body);

        expect(response.status).toBe(401);
        expect(response.body.errors).toBeDefined();
    });

    it("should be able update user name", async() => {
         const response=await supertest(server)
                            .patch("/api/users/current")
                            .set("X-API-TOKEN","test")
                            .send({
                                name:"test update",
                            })
        
        logger.debug(response.body);

        expect(response.status).toBe(200);
        expect(response.body.data.name).toBe("test update");
    });

     it("should be able update user password", async() => {
         const response=await supertest(server)
                            .patch("/api/users/current")
                            .set("X-API-TOKEN","test")
                            .send({
                                password:"password_update",
                            })
        
        logger.debug(response.body);

        expect(response.status).toBe(200);

        const user=await UserTest.get();
        expect(await bcrypt.compare("password_update", user.password)).toBe(true);
    });
});