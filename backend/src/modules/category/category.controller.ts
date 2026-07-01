import { asyncHandler } from "../../utils/asyncHandler";
import { Response, Request } from "express";
import { categoryService } from "./category.container";
import { sendResponse } from "../../utils/sendResponse";

export const createCategoryController = asyncHandler(async(req:Request, res:Response)=>{
    const result = await categoryService.createCategory(req.body, req.userId!)
    sendResponse(
        res,
        200,
        {
            success:true,
            message:"Category created sccessfully",
            data:result
        }
    )
})

export const updateCategoryController = asyncHandler(async(req:Request, res:Response)=>{
    const result = await categoryService.updateCategory(req.body, req.params.id as string, req.userId!)
    sendResponse(
        res,
        200,
        {
            success:true,
            message:"Category updated sccessfully",
            data:result
        }
    )
})

export const getCategoryController = asyncHandler(async(req:Request, res:Response)=>{
    const result = await categoryService.getCategories()
    sendResponse(
        res,
        200,
        {
            success:true,
            message:"Categories has been fetch sccessfully",
            data:result
        }
    )
})
export const deleteCategoryController = asyncHandler(async(req:Request, res:Response)=>{
    const result = await categoryService.deleteCategory(req.params.id as string)
    sendResponse(
        res,
        200,
        {
            success:true,
            message:"Category deleted sccessfully",
            data:result
        }
    )
})