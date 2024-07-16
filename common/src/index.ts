import z from "zod"

export const signUpSchema = z.object({
    name : z.string(),
    email : z.string().email(),
    password : z.string()
})

export type SignUp = z.infer<typeof signUpSchema>

export const signInSchema = z.object({
    email : z.string().email(),
    password : z.string()
})

export type SignIn = z.infer<typeof signInSchema>

export const updateUserSchema = z.object({
    name : z.string().optional(),
    email : z.string().email().optional(),
    password : z.string().optional()
})

export type UpdateUserSchema = z.infer<typeof updateUserSchema>

export const createBlogInput = z.object({
    title : z.string(),
    content : z.string()
})

export type CreateBlog = z.infer<typeof createBlogInput>

export const updateBlogInput = z.object({
    title : z.string().optional(),
    content : z.string().optional()
})

export type UpdateBlog = z.infer<typeof updateBlogInput>