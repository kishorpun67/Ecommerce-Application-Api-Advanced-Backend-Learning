import { asyncHandler } from "../../utils/asyncHandler";
import { Request, Response } from "express";
import { productService } from "./product.container";
import { sendResponse } from "../../utils/sendResponse";


export const createPrdouctController = asyncHandler(async(req:Request, res:Response)=>{
    const result = await productService.createProdut(req.body, req.userId!, req.files!)
    sendResponse(
        res,
        200, 
        {
            success:true,
            message:"Product has been created sccessfully",
            data:result
        }
    )

})    