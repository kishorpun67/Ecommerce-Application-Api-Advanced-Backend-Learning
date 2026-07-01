
import { Request, Response, NextFunction } from "express"
import { ApiError } from "../utils/apiError"
import { verifyAccessToken } from "../utils/helpers/jwt.helper"

export const verifyUser = (req:Request, res:Response, next:NextFunction) =>{
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

    if (!token) {
        return next(new ApiError(401, "Token not found!"))
    }
    try {
        const decoded = verifyAccessToken(token)
        req.userId = decoded.userId
        req.role = decoded.role
        next()
    } catch (error) {
        next(new ApiError(401, "Invalid or expired token"))
    }
} 

export const verifySeller = (req:Request, res:Response, next:NextFunction) =>{
    const role = req.role
    if(!role) {
        throw new ApiError(401, "Authencation is required")
    }
    const allowedRoles = ["ADMIN", "SELLER"];
    if(!allowedRoles.includes(role.toUpperCase())) {
        throw new ApiError(401, "Access denied: Sellers and Admins only")
    }
    next()
}

export const verifyAdmin = (req:Request, res:Response, next:NextFunction) =>{
    const role = req.role
    if(role?.toUpperCase() !== "ADMIN") {
        throw new ApiError(401, "You are not authorized")
    }
    next()
}


