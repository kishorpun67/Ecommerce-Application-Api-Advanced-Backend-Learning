import { Product } from "@prisma/client";
import { ResponseProductDTO, responseProductSchema } from "./product.schema";


export const toProductResponse = (product : Product) : ResponseProductDTO => {
    return responseProductSchema.parse(product)
}