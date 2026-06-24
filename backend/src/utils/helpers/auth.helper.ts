import bcrypt from "bcryptjs";
import crypto  from "crypto"


export const hashPassword = async (password:string) =>{
    return await bcrypt.hash(password, 10)
}

export const comparePassword = async(password:string, dbPassword:string) =>{
    return await bcrypt.compare(password, dbPassword)
}


export const hashRefreshToken = (token:string):string =>{
    return crypto.createHash("sha256").update(token).digest("hex")

}


export const verifyHashToken =(hashedIcoming:string, hashedStored:string)=> {
    return crypto.timingSafeEqual(
        Buffer.from(hashedIcoming,"utf-8"),
        Buffer.from(hashedStored,"utf-8")
    )
}