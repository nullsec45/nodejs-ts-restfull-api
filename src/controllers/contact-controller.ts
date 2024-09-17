import { UserRequest } from "../types/user-request";
import {Response,NextFunction} from "express";
import { CreateContactRequest } from "../models/contact-model";
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
}