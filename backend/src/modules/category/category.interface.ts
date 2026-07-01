import { Category } from "@prisma/client";

export interface ICategoryRepoistory {
    getCategoryById(categoryId:string):Promise <Category | null>
    getCategories():Promise <Category[]>
    createCategory(data:{categoryName:string, categoryDescription:string, userId:string}):Promise <Category | null>
    updateCategory(data:{categoryName:string, categoryDescription:string, categoryId:string, userId:string}):Promise <Category>
    deleteCategory(categoryId:string): Promise <void>
}