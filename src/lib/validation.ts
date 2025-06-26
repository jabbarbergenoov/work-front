import { z } from 'zod';

export const registerSchema = z.object({
    firstName: z
        .string()
        .min(2, { message: "Ism kamida 2 ta belgidan iborat bo'lishi kerak" })
        .max(50, { message: "Ism 50 ta belgidan oshmasligi kerak" }),

    lastName: z
        .string()
        .min(2, { message: "Familiya kamida 2 ta belgidan iborat bo'lishi kerak" })
        .max(50, { message: "Familiya 50 ta belgidan oshmasligi kerak" }),

    email: z
        .string()
        .email({ message: "Email noto‘g‘ri formatda kiritilgan" }),
});
