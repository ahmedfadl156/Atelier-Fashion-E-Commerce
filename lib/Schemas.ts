import z from "zod";

export const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8 , "Password Must Be 8 Characters At Least!")
})

export const shippingDetailsSchema = z.object({
    firstName: z.string().min(1 , "First Name Is Required!"),
    lastName: z.string().min(1 , "Last Name Is Required!"),
    phone: z.string().trim().regex(/^(?:\+201|01|00201)[0125][0-9]{8}$/, "Phone number must be a valid Egyptian mobile number"),
    street: z.string().min(3 , "Street Address Is Required!"),
    city: z.string().min(3 , "City Must Be 3 Characters At Least!"),
    country: z.string().min(3 , "Country Must Be 3 Characters At Least!"),
})

export type SignInSchema = z.infer<typeof signInSchema>
export type ShippingDetailsSchema = z.infer<typeof shippingDetailsSchema>