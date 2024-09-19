import { UserRequest } from "../types/user-request";
import {Response,NextFunction} from "express";
import { CreateContactRequest, UpdataContactRequest } from "../models/contact-model";
import { ContactService } from "../services/contact-service";
import { logger } from "../applications/logger";

export class ContactController{
    static async create(req:UserRequest, res:Response, next:NextFunction){
        try{
            const request:CreateContactRequest=req.body as CreateContactRequest;
            const response=await ContactService.create(req.user!, request);

            res.status(200).json({
                data:response
            })
        }catch(e){
            next(e);
        }
    }

     static async get(req:UserRequest, res:Response, next:NextFunction){
        try{
            const contactId=Number(req.params.contactId);
            const response=await ContactService.get(req.user!, contactId);

            res.status(200).json({
                data:response
            })
        }catch(e){
            next(e);
        }
    }

     static async update(req:UserRequest, res:Response, next:NextFunction){
        try{
            const request:UpdataContactRequest=req.body as UpdataContactRequest;
            request.id=Number(req.params.contactId);
            const response=await ContactService.update(req.user!, request);

            logger.debug("response : "+JSON.stringify(response));

            res.status(200).json({
                data:response
            })
        }catch(e){
            next(e);
        }
    }
}