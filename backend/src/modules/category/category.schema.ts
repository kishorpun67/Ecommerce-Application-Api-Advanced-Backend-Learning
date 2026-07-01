import z from "zod"

export const categorySchema = z.object({
    categoryName : z.string().min(2,"Category must not be at least 2 charaters"),
    categoryDescription: z.string().min(6,"Description must be atl east 6 charaters")
})

export const updateCategorySchema = z.object({
    categoryName : z.string().min(2,"Category must not be at least 2 charaters"),
    categoryDescription: z.string().min(6,"Description must be atl east 6 charaters")
})


export const categoryResponseSchema = z.object({
    id:z.string(),
    categoryName: z.string(),
    categoryDescription: z.string(),
    userId:z.string(),
    createdAt: z.date()
})
export type CategoryDTO = z.infer<typeof categorySchema>
export type UpdateCategoryDTO = z.infer<typeof updateCategorySchema>

export type CategoryResponseDTO = z.infer<typeof categoryResponseSchema>
