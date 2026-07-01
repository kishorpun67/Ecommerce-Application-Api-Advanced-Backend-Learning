import { create } from "domain"
import z from "zod"

export const createProductSchema = z.object({
    categoryId: z.string().min(1, "Category is required"),
    productName: z.string().min(2, "Product name must be at least 2 characters"),
    productDescription: z.string().min(6, "Description must be at least 6 characters"),
    productImageUrls: z.array(z.string().url("Each image must be a valid URL")).min(1, "At least one image is required"),
    price: z.coerce.number().positive("Price must be greater than 0"),
    quantity: z.coerce.number().int("Quantity must be a whole number").nonnegative("Quantity cannot be negative"),
    rating: z.coerce.number().int().min(0).max(5, "Rating must be between 0 and 5"),
    isActive: z.boolean().optional()
}).strict()

export const responseProductSchema = z.object({
    id:z.string(),
    category : z.object({
        id:z.string(),
        categoryName: z.string()
    }),
    user :z.object({
        id:z.string(),
        firstName: z.string(),
        lastName: z.string(),
    }),
    productDescription :z.string(),
    productName :z.string(),
    productImageUrls :z.string(),
    price :z.string(),
    quantity :z.string(),
    rating :z.string(),
    isActive :z.string(),
    createdAt: z.date()
}).strict()

export type ResponseProductDTO = z.infer<typeof responseProductSchema>
export type CreateProductDTO = z.infer<typeof createProductSchema>


