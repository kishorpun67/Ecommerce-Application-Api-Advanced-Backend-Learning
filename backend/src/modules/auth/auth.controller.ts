import { asyncHandler } from "../../utils/asyncHandler.js";
import { Request, Response, CookieOptions } from "express";
import { authService } from "./auth.container.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { NODE_ENV } from "../../config/config.js";
import { Result } from "pg";

export const registerUserController= asyncHandler(async(req:Request,res:Response)=>{
    const result = await authService.register(req.body)
    sendResponse(
        res,
        200,
        {      
            success: true,
            message: "User registered successfully",
            data: result
        }
    )
    
})

export const loginUserController = asyncHandler(async(req:Request, res:Response)=>{
    const result = await authService.login(req.body)
    setCookies(res, result.accessToken, result.refreshToken)
    sendResponse(
        res,
        200,
        {
            success:true,
            message:"User login successfully",
            data:result
        }
    )
})

export const refreshTokenController = asyncHandler(async(req:Request, res:Response )=>{
    // return res.send(req.body.token)
    const result = await authService.refreshToken(req.body.token)
    setCookies(res, result.accessToken, result.refreshToken)
    sendResponse(
        res,
        200,
        {
            success:true,
            message:"RefreshToken generate successfully",
            data:result
        }
    )
})

export const currentUserController = asyncHandler(async(req:Request, res:Response)=>{
    const user = await authService.currentUser(req.userId! as string)
    return res.status(200).json({
        status:"success",
        data:user,
        message:"Current user data has been fetched successfully"
    })
})

export const logoutController = asyncHandler(async(req:Request, res:Response)=>{
    const user = await authService.logout(req.body.refreshToken)
    destroyCookies(res)
    sendResponse(
        res,
        200,
        {
            success:true,
            message:"logout successfully from all devices",
            data:user
        }
    )
})

export const logoutAllController = asyncHandler(async(req:Request, res:Response)=>{
    const user = await authService.logoutAll(req.userId! as string)
    destroyCookies(res)
    sendResponse(
        res,
        200,
        {
            success:true,
            message:"logout successfully from all devices",
            data:user
        }
    )
})

const baseOptions: CookieOptions = {
    httpOnly: true,
    secure: NODE_ENV === "production",
    sameSite: "strict",
};

export const setCookies = (
    res: Response,
    accessToken: string,
    refreshToken: string
): void => {
    res.cookie("accessToken", accessToken, {
        ...baseOptions,
        maxAge: 15 * 60 * 1000, 
    });

    res.cookie("refreshToken", refreshToken, {
        ...baseOptions,
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
};
export const destroyCookies=(res) =>{
    res.clearCookie("accessToken",{...baseOptions})
    res.clearCookie("refreshToken",{...baseOptions})

}