import { optional, z } from 'zod';

export const registerSchema = z.object({
    firstName: z
        .string()
        .optional(),

    lastName: z
        .string()
        .optional(),

    email: z
        .string()
        .email({ message: "Email noto‘g‘ri formatda kiritilgan" }),
});

export const loginSchema = z.object({
    email: z
        .string()
        .email({ message: "Email noto‘g‘ri formatda kiritilgan" })
        .min(1, { message: "Emailni kiriting" }),
})


export const courseSchema = z.object({
    name: z.string()
        .min(1, { message: "Kurs nomini kiriting" })
        .max(100, { message: "Kurs nomi 100 belgidan oshmasligi kerak" }),
})