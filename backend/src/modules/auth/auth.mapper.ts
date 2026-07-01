import { User } from "@prisma/client";
import {  UserResponseDTO, UserResponseSchema } from "./auth.schema";
import { JWTPayload } from "../../types";

export const  toUserResponse = (user:User) :UserResponseDTO  =>{
    return UserResponseSchema.parse(user)
}


export const toJWTPayload = (user:User):JWTPayload =>{
    return {
        userId:user.id,
        role:user.role
    }
}