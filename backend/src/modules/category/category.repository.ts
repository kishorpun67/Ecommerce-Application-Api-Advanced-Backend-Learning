import { Category } from "@prisma/client";
import { ICategoryRepoistory } from "./category.interface";
import { prisma } from "../../lib/prisma";


export class CategoryRepository implements ICategoryRepoistory {
    async getCategoryById(categoryId: string): Promise<Category | null> {
        return await prisma.category.findFirstOrThrow({
            where:{
                id:categoryId
            }
        })
    }
    async getCategories(): Promise<Category[]> {
        return await prisma.category.findMany()
    }
    async createCategory(data: { categoryName: string, categoryDescription: string, userId: string }): Promise<Category | null> {
        return await prisma.category.create({
            data
        })
    }

    async updateCategory(data: { categoryName: string, categoryDescription: string, categoryId:string, userId: string }): Promise<Category> {
        return await prisma.category.update({
            where:{
                id:data.categoryId,
                userId: data.userId
            },
            data : {
                categoryName:data.categoryName,
                categoryDescription: data.categoryDescription
            }
        })
    }
    
    async deleteCategory(categoryId: string): Promise<void> {
        await prisma.category.delete({
            where:{
                id:categoryId
            }
        })
    }
}