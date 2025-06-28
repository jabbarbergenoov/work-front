'use client'

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { registerSchema } from '@/lib/validation'
import { z } from 'zod'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from 'next/link'
import { axiosInstance } from '@/shared/api'
import { toast } from 'sonner'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import React from 'react'

export default function Register() {
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
  })

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    try {
      setIsLoading(true);
      const res = await axiosInstance.post('/auth/register', values);
      toast.success(res.data.message);
      localStorage.setItem('accessToken', res.data.accessToken);
      localStorage.setItem('refreshToken', res.data.refreshToken);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      if (res) {
        window.location.href = '/'
      }
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
    <div className=" flex items-center justify-center  p-4">
      <Card className="w-full max-w-md shadow-lg rounded-2xl overflow-hidden border-0">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-1"></div>

        <CardHeader className="text-center space-y-2 px-8 pt-6">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-600">Создайте аккаунт в TECHFLOW</CardTitle>
          <p className="text-sm text-gray-600">
            Заполните форму ниже, чтобы зарегистрироваться
          </p>
        </CardHeader>

        <CardContent className="px-8 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Имя*</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Иван"
                          {...field}
                          className="focus-visible:ring-blue-500"

                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Фамилия*</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Иванов"
                          {...field}
                          className="focus-visible:ring-blue-500"

                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Email*</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        {...field}
                        className="focus-visible:ring-blue-500"
                        required
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <div className="pt-2">
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Регистрация...
                    </>
                  ) : 'Зарегистрироваться'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="flex justify-center pb-6">
          <div className="text-center text-sm text-gray-600">
            Уже есть аккаунт?{' '}
            <Link
              href="/auth"
              className="font-medium text-blue-600 hover:text-blue-500 hover:underline transition-colors"
            >
              Войти
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}