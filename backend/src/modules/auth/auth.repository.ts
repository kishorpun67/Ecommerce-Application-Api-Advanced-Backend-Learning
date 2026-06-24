import {  Prisma, RefreshToken, User } from "@prisma/client";
import { IAuthRepository } from "./auth.interface";
import { loginUserDTO, registerUserDTO } from "./auth.schema";
import { prisma } from "../../lib/prisma";
import { userSelect } from "./auth.select";

export class AuthRepository implements IAuthRepository {

    async findUserById(id: string): Promise<User | null> {
        return await prisma.user.findFirst({
            where:{id}
        })
    }
    async findUserByEmail(email: string): Promise<User | null> {
        return await prisma.user.findFirst({
            where:{email}
        })
    }
    async findUserByUsername(username: string): Promise<User | null> {
        return await prisma.user.findFirst({
            where:{username}
        })
    }

    async register(data: registerUserDTO): Promise<User | null> {
        return await prisma.user.create(
            {
                data
                ,
                select:userSelect
            }
        )
    }
 
    async login(data:loginUserDTO):Promise <User | null> {
        return await prisma.user.findFirst({
            where:{
                email:data.email,
                password:data.password
            }
        })
    }

    async createRefreshToken(data:{userId: string, token: string, expiresAt: string}): Promise<RefreshToken | null> {
        return await prisma.refreshToken.create({
            data
        })
    }

    async getRefreshTokenByToken(token: string): Promise <RefreshToken | null>{
        return await prisma.refreshToken.findFirst({
            where:{token}
        })
    }

    async deleteRefreshToken(id: string): Promise<RefreshToken> {
        return await prisma.refreshToken.delete({
            where:{
                id:id
            }
        })
    }

    async deleteRefreshTokenByUserId(userId:string):Promise <Prisma.BatchPayload> {
        return await prisma.refreshToken.deleteMany({
            where:{
                userId
            }
        })
    }

}