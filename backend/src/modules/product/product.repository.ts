import { Product } from "@prisma/client";
import { IProductRepoistory } from "./product.interface";
import { prisma } from "../../lib/prisma";


export class ProductRepository implements IProductRepoistory {
    async createProduct(data: { 
        userId: string; 
        productImageUrls:string[]; 
        categoryId: string; 
        productName: string; 
        productDescription: string; 
        price: number; 
        quantity: number; 
        rating?: number; 
        isActive?: boolean; 
    }): Promise<Product> {
        return  await prisma.product.create({
            data:{
                userId:data.userId,
                categoryId: data.categoryId,
                productName: data.productName,
                productDescription: data.productDescription,
                price:data.price,
                quantity: data.quantity,
                ...(data.productImageUrls &&{productImageUrls : data.productImageUrls}),
                ...(data.rating &&{rating : data.rating}),
                ...(data.isActive &&{isActive : data.isActive}),
            },
            include: {
                category: { select: { id: true, categoryName: true } },
                user: { select: { id: true, firstName: true, lastName:true } },
            },
        })
    }
}