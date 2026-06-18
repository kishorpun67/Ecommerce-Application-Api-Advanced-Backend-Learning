import { Response } from "express"
import { ApiReponse } from "../types/index.js"

export const sendResponse = <T>(
    res :Response,
    statusCode:number,
    payload:ApiReponse<T>
) => {
    return res.status(statusCode).json(payload)
}