import { z } from "zod";

export const SignInSchema = z.object({
    email: z.string().email("Enter a valid email"),
    password: z.string().min(6, "Password must contain minimum 6 characters").max(16, "Password must contain maximum 16 characters"),
});

export const SignUpSchema = z.object({
    firstName: z.string().min(1, "First Name cannot be empty"),
    lastName: z.string().optional(),
    email: z.string().email(),
    phone: z.string().regex(new RegExp(/^\+?[1-9]\d{9,14}$/), "Phone number is invalid"),
    password: z.string().min(6, "Password must contain minimum 6 characters").max(16, "Password must contain maximum 16 characters"),
});
