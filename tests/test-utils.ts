import { prismaClient } from "../src/applications/database";
import bcrypt from "bcrypt";
import { User, Contact } from "@prisma/client";

export class UserTest{
    static async delete(){
        await prismaClient.user.deleteMany({})
    }

    static async create(){
        await prismaClient.user.create({
            data:{
                username:"test",
                name:"test",
                password:await bcrypt.hash("test",10),
                token: "test"
            }
        });
    }

    static async get():Promise<User>{
        const user=await prismaClient.user.findFirst({
            where:{
                username:"test",
            }
        });

        if(!user){
            throw new Error("User is not found");
        }

        return user;
    }
}

export class ContactTest{
    static async deleteAll(){
        await prismaClient.contact.deleteMany({
            where:{
                username:"test"
            }
        });
    }

    static async create(){
        await prismaClient.contact.create({
            data:{
                first_name:"test",
                last_name:"test",
                email:"test@gmail.com",
                phone: "0812345678",
                username:"test"
            }
        });
    }

    static async get():Promise<Contact>{
        const contact=await prismaClient.contact.findFirst({
            where:{
                username:"test"
            }
        });

        if(!contact){
            throw new Error("Contact is not found");
        }

        return contact;
    }
}

export class AddressTest{
    static async deleteAll(){
        await prismaClient.address.deleteMany({});
    }

    static async create(){
        const contact=await ContactTest.get();
        await prismaClient.address.create({
            data:{
                contact_id:contact.id,
                street:"Jalan Test",
                city:"Kota Test",
                province:"Provinsi Test",
                country:"Indonesia",
                postal_code:"11111"
            }
        });
    }

    static async get(){
        const address=await prismaClient.address.findFirst({
            where:{
                contact:{
                    username:"test"
                }
            }
        });

        if(!address){
            throw new Error("Address is not found");
        }

        return address;
    }
}