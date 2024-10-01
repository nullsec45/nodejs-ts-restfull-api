import { UserRequest } from "../types/user-request";
import { Response, NextFunction } from "express";
import { AddressService  } from "../services/address-service";
import { CreateAddressRequest, GetAddressRequest, UpdateAddressRequest } from "../models/address-model";

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

    static async get(req:UserRequest, res:Response, next:NextFunction){
        try{
            const request:GetAddressRequest={
                id:Number(req.params.addressId),
                contact_id:Number(req.params.contactId),
                
            }

            request.contact_id = Number(req.params.contactId);
            const response=await AddressService.get(req.user!, request);

            res.status(200).json({
                data:response
            })
        }catch(e){
            next(e);
        }
    }

    static async update(req:UserRequest, res:Response, next:NextFunction){
        try{
            const request:UpdateAddressRequest=req.body as UpdateAddressRequest;
            request.contact_id = Number(req.params.contactId);
            request.id = Number(req.params.addressId);

            const response=await AddressService.update(req.user!, request);

            res.status(200).json({
                data:response
            })
        }catch(e){
            next(e);
        }
    }

    static async delete(req:UserRequest, res:Response, next:NextFunction){
        try{
            const request:UpdateAddressRequest=req.body as UpdateAddressRequest;
            request.contact_id = Number(req.params.contactId);
            request.id = Number(req.params.addressId);

            const response=await AddressService.remove(req.user!, request);

            res.status(200).json({
                data:"Success Delete"
            })
        }catch(e){
            next(e);
        }
    }

    static async list(req:UserRequest, res:Response, next:NextFunction){
        try{
            const contactId=Number(req.params.contactId);

            const response=await AddressService.list(req.user!, contactId);

            res.status(200).json({
                data:response
            })
        }catch(e){
            next(e);
        }
    }
}
