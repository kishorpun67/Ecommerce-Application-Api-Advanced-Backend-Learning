import { file } from "zod";
import { IProductRepoistory } from "./product.interface";
import { CreateProductDTO } from "./product.schema";
import { ApiError } from "../../utils/apiError";
import { uploadToCloudinary } from "../../utils/cloudinary/cloudinary.helper";
import { Prisma } from "@prisma/client";


export class ProductService {
    constructor(private repo: IProductRepoistory) {

    }

    async createProdut(data:CreateProductDTO, userId:string, files:Express.Multer.File[]) {
        if(!files || files.length===0) {
            throw new ApiError(400, "At least one product image is required")
        }
        const imageUrls = await Promise.all(
            files.map((file)=>uploadToCloudinary(file.buffer))
        )
        const prouduct = await this.repo.createProduct({
            userId : userId,
            categoryId : data.categoryId,
            productName:data.productName,
            productDescription:data.productDescription,
            productImageUrls: imageUrls,
            price : new Prisma.Decimal(data.price),
            quantity: Number(data.quantity)
        })
    }
}