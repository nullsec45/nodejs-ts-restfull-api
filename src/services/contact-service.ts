import { ContactResponse, CreateContactRequest, toContactResponse } from "../models/contact-model";
import { Validation } from "../validations/validation";
import {ContactValidation}  from "../validations/contact-validation";
import { User } from "@prisma/client";
import { prismaClient } from "../applications/database";
import { logger } from "../applications/logger";

export class ContactService{
     static async create(user: User, request: CreateContactRequest): Promise<ContactResponse> {
        const createRequest = Validation.validate(ContactValidation.CREATE, request);

        const record = {
            ...createRequest,
            ...{username: user.username}
        };

        const contact = await prismaClient.contact.create({
            data: record
        });

        // logger.debug("record : " + JSON.stringify(contact));
        return toContactResponse(contact);
    }
}