import jwt,{SignOptions  } from "jsonwebtoken"
import { JWT_ACCESS_TOKEN_EXPIRY, JWT_ACCESS_TOKEN_SECRET, JWT_REFRESH_TOKEN_EXPIRY, JWT_REFRESH_TOKEN_SECRET } from "../../config/config"
import { JWTPayload } from "../../types"
import { ApiError } from "../apiError"

const { TokenExpiredError } = jwt;

const ACCESS_TOKEN_SECRET = JWT_ACCESS_TOKEN_SECRET
const ACCESS_TOKEN_EXPIRY = JWT_ACCESS_TOKEN_EXPIRY as SignOptions["expiresIn"]
const REFRESH_TOKEN_SECRET = JWT_REFRESH_TOKEN_SECRET
const REFRESH_TOKEN_EXPIRY= JWT_REFRESH_TOKEN_EXPIRY as SignOptions["expiresIn"]


export const generateAccessToken = (user:JWTPayload): string=> {
    return jwt.sign(
        user,
        ACCESS_TOKEN_SECRET,
        {expiresIn:ACCESS_TOKEN_EXPIRY}
    )
}

export const generateRefreshToken = (user:JWTPayload): string=> {
    return jwt.sign(
        user,
        REFRESH_TOKEN_SECRET,
        {expiresIn:REFRESH_TOKEN_EXPIRY}
    )
}


export const verifyAccessToken =  (token:string):JWTPayload =>{
    try{
        return  jwt.verify(token, ACCESS_TOKEN_SECRET) as JWTPayload;
    } catch(error) {
        if(error instanceof  TokenExpiredError) {
            throw new ApiError(401, 'Access Token is expired')
        }
        throw new ApiError(401, "Invalid access token")
    }
}

export const verifyRefreshToken = (token:string):JWTPayload =>{
    try{
        return  jwt.verify(token, REFRESH_TOKEN_SECRET) as JWTPayload;
    } catch(error) {
        if(error instanceof  TokenExpiredError) {
            throw new ApiError(401, 'Refresh Token is expired')
        }
        throw new ApiError(401, "Invalid refresh token")
    }
}