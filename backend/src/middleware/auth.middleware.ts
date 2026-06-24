
import { Request, Response, NextFunction } from "express"
import { ApiError } from "../utils/apiError"
import { verifyAccessToken } from "../utils/helpers/jwt.helper"
import { JWTPayload } from "../types"

export const verifyUser = (req:Request, res:Response, next:NextFunction) =>{
    try{
       const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
       if(!token) {
            throw new ApiError(401, "Token not found!")
       }
       const decoced = verifyAccessToken(token) as JWTPayload
       req.userId = decoced.userId
       next()

    } catch(error) {
        throw new ApiError(401, 'Invalid or expired token')
    }
} 