import { Product } from "@prisma/client"

export interface IProductRepoistory {
    createProduct(data:{
        userId:string, 
        categoryId:string, 
        productName:string, 
        productDescription:string,
        productImageUrls:string[],
        price:string,
        quantity:number,
        rating?:number,
        isActive?:boolean
    }):Promise <Product>
}