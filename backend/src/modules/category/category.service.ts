import { ApiError } from "../../utils/apiError";
import { ICategoryRepoistory } from "./category.interface";
import { toCategoryResponse } from "./category.mapper";
import { CategoryDTO, UpdateCategoryDTO } from "./category.schema";

export class CategoryService  {
    constructor(private repo: ICategoryRepoistory) {
    }

    async getCategories() {
        const categoris = await this.repo.getCategories()
        return {categoris: categoris.map(toCategoryResponse)}
    }

    async createCategory(data:CategoryDTO, userId:string) {
        const category = await this.repo.createCategory({...data, userId})
        if (!category) {
            throw new ApiError(401, "Failed save data");
        }
        return {
            category:toCategoryResponse(category)
        }
    }

    async updateCategory(data:UpdateCategoryDTO, categoryId:string, userId:string) {
        const category = await this.repo.updateCategory({...data,categoryId, userId})
        return {
            category : toCategoryResponse(category)
        }
    }

    async deleteCategory(categoryId:string) {
        if(!categoryId) {
            throw new ApiError(401, "Category ID is missing")
        }
        const category = await this.repo.getCategoryById(categoryId)
        if(!category) {
            throw new ApiError(401, "Category is not found")
        }

        return this.repo.deleteCategory(categoryId)
    }
}