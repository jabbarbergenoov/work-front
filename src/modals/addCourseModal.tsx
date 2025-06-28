import Modal from '@/components/Modal/modal'
import { courseSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Upload, X, Image as ImageIcon } from 'lucide-react'
import { axiosInstance } from '@/shared/api'
import { Progress } from '@/components/ui/progress'
import { toast } from 'sonner'

export default function AddCourseModal({ isOpen, setIsOpen, fetchData }: {
    isOpen: boolean,
    setIsOpen: (isOpen: boolean) => void
    fetchData?: () => void
}) {
    const [previewImage, setPreviewImage] = useState<string | null>(null)
    const [file, setFile] = useState<File | null>(null)
    const [isUploading, setIsUploading] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0)

    const form = useForm<z.infer<typeof courseSchema>>({
        resolver: zodResolver(courseSchema),
        defaultValues: {
            name: '',
        },
    })

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0]

            // Validate file size (5MB max)
            if (selectedFile.size > 5 * 1024 * 1024) {
                toast.error("Файл слишком большой. Максимальный размер - 5MB")
                return
            }

            setFile(selectedFile)

            // Create preview
            const reader = new FileReader()
            reader.onload = (event) => {
                if (event.target?.result) {
                    setPreviewImage(event.target.result as string)
                }
            }
            reader.readAsDataURL(selectedFile)
        }
    }

    const removeImage = () => {
        setPreviewImage(null)
        setFile(null)
    }

    const onSubmit = async (values: z.infer<typeof courseSchema>) => {
        try {
            setIsUploading(true)
            setUploadProgress(0)

            const formData = new FormData()
            formData.append('name', values.name)

            if (file) {
                formData.append('image', file)
            }

            const promise = axiosInstance.post('/courses', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent) => {
                    if (progressEvent.total) {
                        const progress = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        )
                        setUploadProgress(progress)
                    }
                },
            })

            toast.promise(promise, {
                loading: 'Создание курса...',
                success: () => {
                    setIsOpen(false)
                    form.reset()
                    setPreviewImage(null)
                    setFile(null)
                    fetchData?.()
                    return 'Курс успешно создан!'
                },
                error: (error) => {
                    console.error('Ошибка при создании курса:', error)
                    return 'Не удалось создать курс'
                },
            })
        } finally {
            setIsUploading(false)
            setUploadProgress(0)
        }
    }

    return (
        <Modal
            open={isOpen}
            onClose={() => {
                setIsOpen(false)
                form.reset()
                setPreviewImage(null)
                setFile(null)
            }}
            title="Добавить новый курс"
            description="Заполните информацию о курсе"
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Название курса</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Введите название курса"
                                        {...field}
                                        disabled={isUploading}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="space-y-3">
                        <FormLabel>Изображение курса</FormLabel>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <label className={`
                                flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl 
                                cursor-pointer transition-colors
                                ${previewImage ? 'hidden sm:flex sm:w-1/2' : 'w-full'}
                                hover:bg-gray-50 dark:hover:bg-gray-800/50
                                border-gray-300 dark:border-gray-600
                                ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}
                            `}>
                                <div className="flex flex-col items-center justify-center p-5 text-center">
                                    <Upload className="w-8 h-8 mb-3 text-gray-400" />
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                        <span className="font-semibold">Нажмите для загрузки</span> или перетащите
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        PNG, JPG (макс. 5MB)
                                    </p>
                                </div>
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/png, image/jpeg, image/jpg"
                                    onChange={handleImageChange}
                                    disabled={isUploading}
                                />
                            </label>

                            {previewImage ? (
                                <div className="relative w-full sm:w-1/2 h-40 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                                    <img
                                        src={previewImage}
                                        alt="Предпросмотр"
                                        className="w-full h-full object-cover"
                                    />
                                    {!isUploading && (
                                        <button
                                            type="button"
                                            onClick={removeImage}
                                            className="absolute top-2 right-2 p-1.5 bg-white/80 dark:bg-gray-800/80 rounded-full shadow hover:bg-white dark:hover:bg-gray-700 transition-colors"
                                        >
                                            <X className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                                        </button>
                                    )}
                                </div>
                            ) : (
                                <div className="hidden sm:flex sm:w-1/2 h-40 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                                    <div className="text-center p-4">
                                        <ImageIcon className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Изображение не выбрано
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {isUploading && (
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                                <span>Загрузка...</span>
                                <span>{uploadProgress}%</span>
                            </div>
                            <Progress value={uploadProgress} className="h-2" />
                        </div>
                    )}

                    <div className="flex justify-end gap-3 pt-2">
                        <Button
                            variant="outline"
                            type="button"
                            onClick={() => {
                                setIsOpen(false)
                                form.reset()
                                setPreviewImage(null)
                                setFile(null)
                            }}
                            disabled={isUploading}
                        >
                            Отмена
                        </Button>
                        <Button
                            type="submit"
                            disabled={isUploading || !form.formState.isDirty}
                        >
                            {isUploading ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Сохранение...
                                </span>
                            ) : (
                                "Добавить курс"
                            )}
                        </Button>
                    </div>
                </form>
            </Form>
        </Modal>
    )
}