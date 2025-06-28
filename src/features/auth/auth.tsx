'use client'

import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { axiosInstance } from '@/shared/api'
import React from 'react'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { loginSchema } from '@/lib/validation'
import { toast } from 'sonner'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'

export default function Auth() {
    const [isLoading, setIsLoading] = React.useState(false);

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: ""
        },
    })

    async function onSubmit(values: z.infer<typeof loginSchema>) {
        try {
            setIsLoading(true);
            const res = await axiosInstance.post('/auth/login', values);
            localStorage.setItem('accessToken', res.data.accessToken);
            localStorage.setItem('refreshToken', res.data.refreshToken);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            if (res) {
                window.location.href = '/'
            }
            toast.success(res.data.message);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.message || error.message);
            } else {
                console.error('Неизвестная ошибка:', error);
                toast.error('Произошла неизвестная ошибка');
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex items-center justify-center p-4">
            <Card className="w-full max-w-md shadow-lg rounded-2xl overflow-hidden border-0">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-1"></div>

                <CardHeader className="text-center space-y-2 px-8 pt-6">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                        </svg>
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-600">Добро пожаловать в TECHFLOW</CardTitle>
                    <p className="text-sm text-gray-600">
                        Введите свои данные для входа в систему
                    </p>
                </CardHeader>

                <CardContent className="space-y-4 px-8 py-4">
                    <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <Separator className="w-full" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-gray-500">
                                Вход с email
                            </span>
                        </div>
                    </div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-700">Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                placeholder="your@email.com"
                                                {...field}
                                                className="focus-visible:ring-blue-500"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                )}
                            />


                            <Button
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Вход...
                                    </>
                                ) : 'Войти'}
                            </Button>
                        </form>
                    </Form>
                </CardContent>

                <CardFooter className="flex justify-center pb-6">
                    <div className="text-center text-sm text-gray-600">
                        Ещё нет аккаунта?{' '}
                        <a
                            href="/auth/register"
                            className="font-medium text-blue-600 hover:text-blue-500 hover:underline transition-colors"
                        >
                            Создать аккаунт
                        </a>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}