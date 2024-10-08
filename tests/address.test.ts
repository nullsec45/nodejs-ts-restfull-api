import supertest from "supertest";
import { ContactTest, AddressTest, UserTest } from "./test-utils";
import { server } from "../src/applications/server";
import { logger } from "../src/applications/logger";
import { add, log } from "winston";

describe.skip("POST /api/contacts/:contactId/addresses",() => {
    beforeEach(async() =>{
        await UserTest.create();
        await ContactTest.create();
    });

    afterEach(async() => {
        await AddressTest.deleteAll();
        await ContactTest.deleteAll();
        await UserTest.delete();
    });

    it("should be able to create address", async() => {
        const contact=await ContactTest.get();

        const response=await supertest(server)
                                      .post(`/api/contacts/${contact.id}/addresses`)
                                       .set("X-API-TOKEN","test")
                                       .send({
                                            street:"Jalan belum ada",
                                            city:"Jakarta",
                                            province:"DKI Jakarta",
                                            country:"Indonesia",
                                            postal_code:"99999"
                                       });

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBeDefined();
        expect(response.body.data.street).toBe("Jalan belum ada");
        expect(response.body.data.city).toBe("Jakarta");
        expect(response.body.data.province).toBe("DKI Jakarta");
        expect(response.body.data.country).toBe("Indonesia");
        expect(response.body.data.postal_code).toBe("99999");
    });

    it("should reject create new address if request is invalid", async() => {
        const contact=await ContactTest.get();

        const response=await supertest(server)
                                      .post(`/api/contacts/${contact.id}/addresses`)
                                       .set("X-API-TOKEN","test")
                                       .send({
                                            street:"",
                                            city:"Jakarta",
                                            province:"DKI Jakarta",
                                            country:"Indonesia",
                                            postal_code:"99999"
                                       });

        logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });

    it("should reject create new address if contact is not found", async() => {
        const contact=await ContactTest.get();

        const response=await supertest(server)
                                      .post(`/api/contacts/${contact.id+1}/addresses`)
                                       .set("X-API-TOKEN","test")
                                       .send({
                                            street:"Jalanin aja dulu",
                                            city:"Jakarta",
                                            province:"DKI Jakarta",
                                            country:"Indonesia",
                                            postal_code:"99999"
                                       });

        logger.debug(response.body);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    });
});

describe.skip("GET /api/contacts/:contactId/addresses/:addressId", () => {
    beforeEach(async() =>{
        await UserTest.create();
        await ContactTest.create();
        await AddressTest.create();
    });

    afterEach(async() => {
        await AddressTest.deleteAll();
        await ContactTest.deleteAll();
        await UserTest.delete();
    });

    it("should be able to get address", async() => {
        const contact=await ContactTest.get();
        const address=await AddressTest.get();

        const response=await supertest(server)
                            .get(`/api/contacts/${contact.id}/addresses/${address.id}`)
                            .set("X-API-TOKEN","test");

        logger.debug(response);
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBeDefined();
        expect(response.body.data.street).toBe(address.street);
        expect(response.body.data.city).toBe(address.city);
        expect(response.body.data.province).toBe(address.province);
        expect(response.body.data.country).toBe(address.country);
        expect(response.body.data.postal_code).toBe(address.postal_code);
    });

    it("should reject get address if address is not found", async() => {
        const contact=await ContactTest.get();
        const address=await AddressTest.get();

        const response=await supertest(server)
                            .get(`/api/contacts/${contact.id}/addresses/${address.id + 1}`)
                            .set("X-API-TOKEN","test");

        logger.debug(response);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    });

    it("should reject get address if contact is not found", async() => {
        const contact=await ContactTest.get();
        const address=await AddressTest.get();

        const response=await supertest(server)
                            .get(`/api/contacts/${contact.id + 1}/addresses/${address.id }`)
                            .set("X-API-TOKEN","test");

        logger.debug(response);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    });
});

describe.skip("PUT /api/contacts/:contactId/addresses/:addressId",() => {
    beforeEach(async() =>{
        await UserTest.create();
        await ContactTest.create();
        await AddressTest.create();
    });

    afterEach(async() => {
        await AddressTest.deleteAll();
        await ContactTest.deleteAll();
        await UserTest.delete();
    });

    it("should be able to update address", async() => {
        const contact=await ContactTest.get();
        const address=await AddressTest.get();

        const response=await supertest(server)
                            .put(`/api/contacts/${contact.id}/addresses/${address.id}`)
                            .set("X-API-TOKEN","test")
                            .send({
                                street:"Jalan Update",
                                city:"Jakarta Update",
                                province:"DKI Jakarta Update",
                                country:"Indonesia Update",
                                postal_code:"111111"
                            });

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBeDefined();
        expect(response.body.data.street).toBe("Jalan Update");
        expect(response.body.data.city).toBe("Jakarta Update");
        expect(response.body.data.province).toBe("DKI Jakarta Update");
        expect(response.body.data.country).toBe("Indonesia Update");
        expect(response.body.data.postal_code).toBe("111111");
    });

     it("should reject update address if data is invalid", async() => {
        const contact=await ContactTest.get();
        const address=await AddressTest.get();

        const response=await supertest(server)
                            .put(`/api/contacts/${contact.id}/addresses/${address.id}`)
                            .set("X-API-TOKEN","test")
                            .send({
                                street:"Jalan Update",
                                city:"Jakarta Update",
                                province:"DKI Jakarta Update",
                                country:"",
                                postal_code:""
                            });

        logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });

     it("should reject update address if address not found", async() => {
        const contact=await ContactTest.get();
        const address=await AddressTest.get();

        const response=await supertest(server)
                            .put(`/api/contacts/${contact.id}/addresses/${address.id + 1}`)
                            .set("X-API-TOKEN","test")
                            .send({
                                street:"Jalan Update",
                                city:"Jakarta Update",
                                province:"DKI Jakarta Update",
                                country:"Indonesia Update",
                                postal_code:"111111"
                            });

        logger.debug(response.body);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    });

    it("should reject update address if contact not found", async() => {
        const contact=await ContactTest.get();
        const address=await AddressTest.get();

        const response=await supertest(server)
                            .put(`/api/contacts/${contact.id + 1}/addresses/${address.id}`)
                            .set("X-API-TOKEN","test")
                            .send({
                                street:"Jalan Update",
                                city:"Jakarta Update",
                                province:"DKI Jakarta Update",
                                country:"Indonesia Update",
                                postal_code:"111111"
                            });

        logger.debug(response.body);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    });
});

describe.skip("DELETE /api/contacts/:contactId/addresses/:addressId", () => {
    beforeEach(async() =>{
        await UserTest.create();
        await ContactTest.create();
        await AddressTest.create();
    });

    afterEach(async() => {
        await AddressTest.deleteAll();
        await ContactTest.deleteAll();
        await UserTest.delete();
    });

    it("should be able to remove address", async() => {
        const contact=await ContactTest.get();
        const address=await AddressTest.get();

        const response=await supertest(server)
                            .delete(`/api/contacts/${contact.id}/addresses/${address.id}`)
                            .set("X-API-TOKEN","test");

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data).toBe("Success Delete");
    });

    it("should reject remove address if address not found", async() => {
        const contact=await ContactTest.get();
        const address=await AddressTest.get();

        const response=await supertest(server)
                            .delete(`/api/contacts/${contact.id}/addresses/${address.id + 1}`)
                            .set("X-API-TOKEN","test");

        logger.debug(response.body);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    });

    it("should reject remove address if contact not found", async() => {
        const contact=await ContactTest.get();
        const address=await AddressTest.get();

        const response=await supertest(server)
                            .delete(`/api/contacts/${contact.id + 1}/addresses/${address.id}`)
                            .set("X-API-TOKEN","test");

        logger.debug(response.body);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    });
});

describe("GET /api/contacts/:contactId/addresses/", () => {
    beforeEach(async() =>{
        await UserTest.create();
        await ContactTest.create();
        await AddressTest.create();
    });

    afterEach(async() => {
        await AddressTest.deleteAll();
        await ContactTest.deleteAll();
        await UserTest.delete();
    });

    it("should be able to list addresses", async() => {
        const contact=await ContactTest.get();

        const response=await supertest(server)
                            .get(`/api/contacts/${contact.id}/addresses`)
                            .set("X-API-TOKEN","test");

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(1);
    });

     it("should reject list address if contact is not found", async() => {
        const contact=await ContactTest.get();

        const response=await supertest(server)
                            .get(`/api/contacts/${contact.id + 1}/addresses`)
                            .set("X-API-TOKEN","test");

        logger.debug(response.body);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    });
});