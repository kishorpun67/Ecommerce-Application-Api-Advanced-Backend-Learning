
import { User, RefreshToken, Prisma } from "@prisma/client";
import { loginUserDTO, registerUserDTO } from "./auth.schema";

export interface IAuthRepository {
    findUserById(id:string):Promise<User | null>
    findUserByEmail(email:string):Promise<User | null>
    findUserByUsername(username:string):Promise<User | null>
    register(data:registerUserDTO):Promise<User | null>
    login(data:loginUserDTO):Promise <User | null>
    createRefreshToken(data:{userId: string, token: string, expiresAt: string}) :Promise <RefreshToken | null>
    getRefreshTokenByToken(token:string) :Promise <RefreshToken | null >
    deleteRefreshToken(id:string) : Promise <RefreshToken>
    deleteRefreshTokenByUserId(usrId:string):Promise <Prisma.BatchPayload> 

    

}



