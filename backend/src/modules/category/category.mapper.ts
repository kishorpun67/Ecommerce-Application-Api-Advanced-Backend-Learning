import { Category } from "@prisma/client";
import { CategoryResponseDTO, categoryResponseSchema } from "./category.schema";


export const toCategoryResponse = (category:Category): CategoryResponseDTO =>{
    return categoryResponseSchema.parse(category)
}