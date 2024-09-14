import { prismaClient } from "../applications/database";
import { ResponseError } from "../errors/response-error";
import { CreateUserRequest, toUserResponse, UserResponse } from "../models/user-model";
import { UserValidation } from "../validations/user-validation";
import { Validation } from "../validations/validation";
import bcrypt from "bcrypt";

export class UserService{
    static async register(request:CreateUserRequest):Promise<UserResponse>{
        const registerRequest=Validation.validate(UserValidation.REGISTER,request);
        console.log(registerRequest);
        const totalUserWithSameUser=await prismaClient.user.count({
            where:{
                username:registerRequest.username
            }
        });

        if(totalUserWithSameUser !== 0){
            throw new ResponseError(400, "Username already exists");
        }

        registerRequest.password=await bcrypt.hash(registerRequest.password, 10);

        const user=await prismaClient.user.create({
            data:registerRequest
        });

        return toUserResponse(user);
    }
}