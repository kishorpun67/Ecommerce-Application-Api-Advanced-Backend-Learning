import { ZodObject } from "zod";
import { NextFunction,Request, Response } from "express";
import { ApiError } from "../utils/apiError";

export const validate = (schema:ZodObject) =>(req:Request, res:Response, next:NextFunction) =>{
    const result = schema.safeParse(req.body)
    if (!result.success) {
        return res.status(400).json({
          success: false,
          errors: result.error.flatten().fieldErrors,
        });
    }
    // if (!result.success) {
    //     const fieldErrors = result.error.flatten().fieldErrors;
    //     const errorDetails = Object.entries(fieldErrors).map(([field, messages]) => ({
    //         field,
    //         message: messages ? messages.join(", ") : "Invalid value"
    //     }));
    //     return next(new ApiError( 422, "Validation failed", errorDetails));
    // }
    req.body = result.data
    next()
}