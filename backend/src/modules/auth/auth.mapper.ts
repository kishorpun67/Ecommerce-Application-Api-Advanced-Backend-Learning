import { User } from "@prisma/client";
import {  UserResponseDTO, UserResponseSchema } from "./auth.schema";

export const  toUserResponse = (user:User) :UserResponseDTO  =>{
    return UserResponseSchema.parse(user)
}
