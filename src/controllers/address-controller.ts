import { UserRequest } from "../types/user-request";
import { Response, NextFunction } from "express";
import { AddressService  } from "../services/address-service";
import { CreateAddressRequest } from "../models/address-model";

export class AddressController{
    static async create(req:UserRequest, res:Response, next:NextFunction){
        try{
            const request:CreateAddressRequest=req.body as  CreateAddressRequest;
            request.contact_id = Number(req.params.contactId);
            const response=await AddressService.create(req.user!, request);

            res.status(200).json({
                data:response
            })
        }catch(e){
            next(e);
        }
    }
}
