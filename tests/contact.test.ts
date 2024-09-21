import supertest from "supertest";
import { UserTest, ContactTest } from "./test-utils";
import { server } from "../src/applications/server";
import { logger } from "../src/applications/logger";

describe.skip("POST /api/contacts", () => {
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

describe.skip("GET /api/contacts/:contactId", () => {
    beforeEach(async() =>{
        await UserTest.create();
        await ContactTest.create();
    });

    afterEach(async() => {
        await ContactTest.deleteAll();
        await UserTest.delete();
    });

    it("should be able get contact", async() => {
        const contact=await ContactTest.get();
        const response=await supertest(server).get(`/api/contacts/${contact.id}`)
                                              .set("X-API-TOKEN","test");

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBeDefined();
        expect(response.body.data.first_name).toBe(contact.first_name);
        expect(response.body.data.last_name).toBe(contact.last_name);
        expect(response.body.data.email).toBe(contact.email);
        expect(response.body.data.phone).toBe(contact.phone);
    });

    it("should be reject if contact if not found", async() => {
        const contact=await ContactTest.get();
        const response=await supertest(server).get(`/api/contacts/${contact.id+1}`)
                                              .set("X-API-TOKEN","test");

        logger.debug(response.body);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    });
});

describe.skip("PUT /api/contacts/:contactId", () => {
    beforeEach(async() =>{
        await UserTest.create();
        await ContactTest.create();
    });

    afterEach(async() => {
        await ContactTest.deleteAll();
        await UserTest.delete();
    });

    it("should be able update contact", async() => {
        const contact=await ContactTest.get();
        const response=await supertest(server)
                            .put(`/api/contacts/${contact.id}`)
                            .set("X-API-TOKEN","test")
                            .send({
                                first_name:"test update",
                                last_name:"test update",
                                email:"test@gmail.com",
                                phone:"0812345678"
                            });

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBe(contact.id);
        expect(response.body.data.first_name).toBe("test update");
        expect(response.body.data.last_name).toBe("test update");
        expect(response.body.data.email).toBe("test@gmail.com");
        expect(response.body.data.phone).toBe("0812345678");
    });

    it("should reject update contact if request is invalid", async() => {
        const contact=await ContactTest.get();
        const response=await supertest(server)
                             .put(`/api/contacts/${contact.id}`)
                             .set("X-API-TOKEN","test")
                             .send({
                                first_name:"",
                                last_name:"",
                                email:"",
                                phone:""
                             });

        logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });
});

describe.skip("DELETE /api/contacts/:contactId",() => {
    beforeEach(async() =>{
        await UserTest.create();
        await ContactTest.create();
    });

    afterEach(async() => {
        await ContactTest.deleteAll();
        await UserTest.delete();
    });

    it("should be able to remove contact", async() => {
        const contact=await ContactTest.get();
        const response=await supertest(server)
                             .delete(`/api/contacts/${contact.id}`)
                             .set("X-API-TOKEN","test");

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data).toBe("Success Remove");
    });

    it("should be reject to remove contact if contact is not found", async() => {
        const contact=await ContactTest.get();
        const response=await supertest(server)
                             .delete(`/api/contacts/${contact.id + 1}`)
                             .set("X-API-TOKEN","test");

        logger.debug(response.body);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    });
});

describe("GET /api/contacts",() => {
    beforeEach(async() =>{
        await UserTest.create();
        await ContactTest.create();
    });

    afterEach(async() => {
        await ContactTest.deleteAll();
        await UserTest.delete();
    });

    it("should be able to search contact", async() => {
        const response=await supertest(server)
                            .get("/api/contacts")
                            .set("X-API-TOKEN","test");
        
        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(1);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(10);
    });

    it("should be able to search contact using name", async() => {
        const response=await supertest(server)
                            .get("/api/contacts")
                            .query({
                                name:"es"
                            })
                            .set("X-API-TOKEN","test");
        
        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(1);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(10);
    });

    it("should be able to search contact using email", async() => {
        const response=await supertest(server)
                            .get("/api/contacts")
                            .query({
                                email:".com"
                            })
                            .set("X-API-TOKEN","test");
        
        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(1);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(10);
    });

    it("should be able to search contact using phone", async() => {
        const response=await supertest(server)
                            .get("/api/contacts")
                            .query({
                                phone:"0812345678"
                            })
                            .set("X-API-TOKEN","test");
        
        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(1);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(10);
    });

    it("should be able to search contact no result", async() => {
        const response=await supertest(server)
                            .get("/api/contacts")
                            .query({
                                name:"salah"
                            })
                            .set("X-API-TOKEN","test");
        
        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(0);
    });

     it("should be able to search contact with paging", async() => {
        const response=await supertest(server)
                            .get("/api/contacts")
                            .query({
                                page:"2",
                                size:1
                            })
                            .set("X-API-TOKEN","test");
        
        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(0);
        expect(response.body.paging.current_page).toBe(2);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(1);
    });
});