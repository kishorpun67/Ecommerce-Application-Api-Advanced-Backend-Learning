import { JWTPayload } from "../../types";
import { ApiError } from "../../utils/apiError";
import { comparePassword, hashPassword, hashRefreshToken } from "../../utils/helpers/auth.helper";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../../utils/helpers/jwt.helper";
import { IAuthRepository } from "./auth.interface";
import { toUserResponse } from "./auth.mapper";
import { loginUserDTO, registerUserDTO } from "./auth.schema";


export  class AuthService {
    constructor(private repo: IAuthRepository) {}

    async register (data:registerUserDTO) {

        const [emailUser, usernameUser] = await Promise.all([
            this.repo.findUserByEmail(data.email),
            this.repo.findUserByUsername(data.username)
        ])
        if(emailUser) {
            throw new ApiError(409, "Email already exists" )
        }

        if(usernameUser) {
            throw new ApiError(409, "Username already exists" )
        }

        const password = await hashPassword(data.password) 
        
        const user = await this.repo.register({
            ...data, 
            password
        })
        return {user:toUserResponse(user)}
        
    }

    async login(data:loginUserDTO) {
        const user = await this.repo.findUserByEmail(data.email)
        if(!user) {
            throw new ApiError(409, "Invalid email or password")
        }
        const verfiyPassword = await comparePassword(data.password, user.password) 
        if(!verfiyPassword) {
            throw new ApiError(409, "Invalid email or password")
        }

        const accessToken = generateAccessToken(user.id)
        const refreshToken = generateRefreshToken(user.id)
        
        const hashRefToken = hashRefreshToken(refreshToken) 
        await this.repo.createRefreshToken({
            userId : user.id,
            token :hashRefToken,
            expiresAt : new Date(Date.now()+ 7 * 24 * 60 * 60* 1000).toISOString()
        } )

        return {
            user:toUserResponse(user),
            accessToken,
            refreshToken
        }
    }

    async refreshToken(token: string){
        if(!token) {
            throw new ApiError(401, 'Refresh token is required')
        }

        let decoded;
        try{
            decoded =  verifyRefreshToken(token) as JWTPayload
        } catch (error) {
            throw new ApiError(403, 'Invalid token or expired token')
        }
        const hashedToken = hashRefreshToken(token)
        const existingToken  = await this.repo.getRefreshTokenByToken(hashedToken)
        // return decoded;
        if(!existingToken) {
            throw new ApiError(403, 'Refresh token not found')
        }

        await this.repo.deleteRefreshToken(existingToken.id)

        const newAccessToken = generateAccessToken(decoded.userId)
        const newRefreshToken = generateRefreshToken(decoded.userId)

        const  newRefreshHashToken = hashRefreshToken(newRefreshToken);
        await this.repo.createRefreshToken({
            userId : decoded.userId,
            token :newRefreshHashToken,
            expiresAt : new Date(Date.now()+ 7 * 24 * 60 * 60* 1000).toISOString()
        })
        
        return {
            accessToken : newAccessToken,
            refreshToken: newRefreshToken
        }
    }
    async currentUser(userId:string) {
        const user = await this.repo.findUserById(userId)
        if(!user) {
            throw new ApiError(401, 'User doesnot exists')
        }
        return {
        user:toUserResponse(user)
        }
    }
    async logout(refreshToken:string){

        if(!refreshToken) {
            throw new ApiError(401, 'Refresh token required')
        }
        const decoded = verifyRefreshToken(refreshToken) as JWTPayload;       
        const hashedToken = hashRefreshToken(refreshToken);       
        const existingToken = await this.repo.getRefreshTokenByToken(hashedToken)
        if(!existingToken) {
            throw new ApiError(401, 'Invalid Refresh Token')
        }
        await this.repo.deleteRefreshToken(existingToken.id)
        return true
    }

    async  logoutAll(userId:string){
        if(!userId) {
            throw new ApiError(401, 'user not autenticated')
        }
        await this.repo.deleteRefreshTokenByUserId(userId)
        return true;

    }
}