import z from "zod";

export const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8 , "Password Must Be 8 Characters At Least!")
})

export type SignInSchema = z.infer<typeof signInSchema>