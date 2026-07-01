import { CategoryRepository } from "./category.repository";
import { CategoryService } from "./category.service";


const categoryRepository = new CategoryRepository()
const categoryService = new CategoryService(categoryRepository)

export {categoryService}