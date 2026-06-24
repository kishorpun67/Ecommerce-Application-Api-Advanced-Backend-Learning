import express from "express"
import cors from 'cors'
import { FRONTEND_URL } from "./config/config"
import cookieParser from "cookie-parser"
import { globalErrorHandler } from "./middleware/error.middleware"
export const app  = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin: FRONTEND_URL,
    credentials:true
}))
app.use(cookieParser())
// app.get("/health-check", (req,res)=>{
//     res.status(200).json(
//         {data:app}
//     )
// })

import authRouter from "./modules/auth/auth.route.js"


app.use("/api/v1/auth", authRouter)



app.use(globalErrorHandler)


