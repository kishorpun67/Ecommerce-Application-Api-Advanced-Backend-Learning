import multer from "multer";
import { ApiError } from "../utils/apiError";


const storage = multer.memoryStorage();


export const upload = multer ({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024
    },
    fileFilter:(req, file,cb)=>{
        if(file.mimetype.startsWith("image/")) {
            cb(null, true)
        } else {
            cb(new ApiError(403,"Only image files are allowed"))
        }
    }

})



// import fs from "fs"

// const uploadDir = "./public/temp"
// if(!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir, {recursive:true})
// }

// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, "./public/temp")
//     }
//     ,
//     filename: function (req, file, cb){
//         cb(null, Date.now() + file.originalname)
//     }
// })

// export const upload = multer({
//     storage
// })