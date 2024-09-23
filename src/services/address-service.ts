import { 
    AddressResponse, 
    CreateAddressRequest, 
    toAddressResponse, 
} from "../models/address-model";
import { Validation } from "../validations/validation";
import {AddressValidation}  from "../validations/address-validation";
import { User } from "@prisma/client";
import { prismaClient } from "../applications/database";
import { logger } from "../applications/logger";
import { ResponseError } from "../errors/response-error";
import { ContactService } from "./contact-service";

export class AddressService{
    static async create(user: User, request: CreateAddressRequest): Promise<AddressResponse> {
        const createRequest = Validation.validate(AddressValidation.CREATE, request);
        await ContactService.checkContactMustExists(user.username, request.contact_id);


        const address = await prismaClient.address.create({
            data: createRequest
        });

        logger.debug("record : " + JSON.stringify(address));
        
        return toAddressResponse(address);
    }

    static  async checkContactMustExists(username:string, contactId:number){
        const contact=await prismaClient.contact.findFirst({
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
}