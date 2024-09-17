import supertest from "supertest";
import { UserTest, ContactTest } from "./test-utils";
import { server } from "../src/applications/server";
import { logger } from "../src/applications/logger";

describe("POST /api/contacts", () => {
    beforeEach(async() => {
        await UserTest.create();
    });

    afterEach(async() => {
        await ContactTest.deleteAll();
        await UserTest.delete();
    });

    it("should create new contact", async() => {
        const response=await supertest(server)
                            .post("/api/contacts")
                            .set("X-API-TOKEN","test")
                            .send({
                                first_name:"fajar",
                                last_name:"rama",
                                email:"fajar@gmail.com",
                                phone:"0812345678"
                            });
        
        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBeDefined();
        expect(response.body.data.first_name).toBe("fajar");
        expect(response.body.data.last_name).toBe("rama");
        expect(response.body.data.email).toBe("fajar@gmail.com");
        expect(response.body.data.phone).toBe("0812345678");

    });

    it("should reject create new contact if data is invalid", async() => {
        const response=await supertest(server)
                            .post("/api/contacts")
                            .set("X-API-TOKEN","test")
                            .send({
                                first_name:"",
                                last_name:"",
                                email:"kepo",
                                phone:"9999999999999999999999999999999"
                            });
        
        logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();


    });
});