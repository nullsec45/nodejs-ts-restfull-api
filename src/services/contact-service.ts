import { ContactResponse, 
    CreateContactRequest, 
    toContactResponse, 
    UpdateContactRequest 
} from "../models/contact-model";
import { Validation } from "../validations/validation";
import {ContactValidation}  from "../validations/contact-validation";
import { User } from "@prisma/client";
import { prismaClient } from "../applications/database";
import { logger } from "../applications/logger";
import { ResponseError } from "../errors/response-error";
import { UserValidation } from "../validations/user-validation";

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

        logger.debug("record : " + JSON.stringify(contact));
        
        return toContactResponse(contact);
    }

    static  async checkContactMustExists(username:string, contactId:number){
        const contact=await prismaClient.contact.findUnique({
            where:{
                id:contactId,
                username:username
            }
        });

         if(!contact){
            throw new ResponseError(404, "Contact Not Found");
        }

        return contact;
    }

    static async get(user:User, id:number):Promise<ContactResponse>{
        const contact=await this.checkContactMustExists(user.username, id);

        return toContactResponse(contact);
    }

    static async update(user:User, request:UpdateContactRequest):Promise<ContactResponse>{
        const updateRequest=Validation.validate(UserValidation.UPDATE, request);
        await this.checkContactMustExists(user.username, updateRequest.id);

        const contact=await prismaClient.contact.update({
            where:{
                id:updateRequest.id,
                username:user.username
            },
            data:updateRequest
        });

        return toContactResponse(contact);
    }
}