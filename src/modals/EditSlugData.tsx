'use client';

import Modal from '@/components/Modal/modal';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { axiosInstance } from '@/shared/api';

// Схема валидации формы
const formSchema = z.object({
    name: z.string().min(2, 'Название должно содержать минимум 2 символа'),
    description: z.string().min(10, 'Описание должно содержать минимум 10 символов'),
    image: z.instanceof(File).optional(),
    dars: z.string(),
    organish: z.array(z.string()),
    modules: z.array(
        z.object({
            id: z.string(),
            title: z.string().min(2, 'Название модуля должно содержать минимум 2 символа'),
        })
    ),
});

export default function EditSlugData({ isOpen, setIsOpen, slug }: { slug: string; isOpen: boolean; setIsOpen: (open: boolean) => void }) {
    const [isLoading, setIsLoading] = useState(false);
    const [modules, setModules] = useState<Array<{ id: string; title: string }>>([{ id: '', title: '' }]);
    const [organish, setOrganish] = useState<string[]>([]);
    const [currentOrganish, setCurrentOrganish] = useState('');




    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            description: '',
            dars: '',
            organish: [],
            modules: [],
        },
    });

    useEffect(() => {
        if (slug && isOpen) {
            form.reset({
                name: slug.name || '',
                description: slug.description || '',
                dars: slug.dars || '',
                organish: slug.organish || [],
                modules: slug.modules || []
            });
            setModules(slug.modules || []);
            setOrganish(slug.organish || []);
        }
    }, [isOpen, slug, form]);

    const handleEditModule = () => {
        setModules([...modules, { id: '', title: '' }]);
    };

    const handleRemoveModule = (index: number) => {
        const newModules = [...modules];
        newModules.splice(index, 1);
        setModules(newModules);
    };

    const handleEditOrganish = () => {
        if (currentOrganish.trim()) {
            setOrganish([...organish, currentOrganish]);
            setCurrentOrganish('');
        }
    };

    const handleRemoveOrganish = (index: number) => {
        const newOrganish = [...organish];
        newOrganish.splice(index, 1);
        setOrganish(newOrganish);
    };

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setIsLoading(true);

            const toastId = toast.loading('Создание курса...');

            // Подготовка данных для отправки
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('description', values.description);
            formData.append('dars', values.dars);
            formData.append('organish', JSON.stringify(organish));

            if (values.image) {
                formData.append('image', values.image);
            }

            // Добавляем модули
            formData.append('modules', JSON.stringify(modules));
            formData.append('slug', slug);

            // Отправка данных на сервер
            const response = await axiosInstance.put(`/slugdatas/${slug}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const data = response.data;

            if (!response.ok) {
                throw new Error(data.message || 'Ошибка при создании курса');
            }

            // Успешное завершение
            toast.success(data.message || 'Курс успешно создан', {
                id: toastId,
            });

            setIsOpen(false);
            form.reset();
            setModules([{ id: '', title: '' }]);
            setOrganish([]);
        } catch (error) {
            // Ошибка
            toast.error(error.message || 'Произошла ошибка при создании курса');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal open={isOpen} onClose={() => setIsOpen(false)} title="Добавить данные для курса">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid gap-4">
                        {/* Название курса */}
                        <div>
                            <Label htmlFor="name">Название курса</Label>
                            <Input
                                id="name"
                                placeholder="Введите название курса"
                                {...form.register('name')}
                            />
                            {form.formState.errors.name && (
                                <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
                            )}
                        </div>

                        {/* Описание курса */}
                        <div>
                            <Label htmlFor="description">Описание курса</Label>
                            <Textarea
                                id="description"
                                placeholder="Введите описание курса"
                                {...form.register('description')}
                            />
                            {form.formState.errors.description && (
                                <p className="text-sm text-red-500">{form.formState.errors.description.message}</p>
                            )}
                        </div>

                        {/* Изображение курса */}
                        <div>
                            <Label htmlFor="image">Изображение курса</Label>
                            <Input
                                id="image"
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    if (e.target.files && e.target.files.length > 0) {
                                        form.setValue('image', e.target.files[0]);
                                    }
                                }}
                            />
                        </div>

                        {/* Модули курса */}
                        <div>
                            <Label>Модули курса</Label>
                            {modules.map((module, index) => (
                                <div key={index} className="flex gap-2 mb-2">
                                    <Input
                                        placeholder="ID модуля"
                                        value={module.id}
                                        onChange={(e) => {
                                            const newModules = [...modules];
                                            newModules[index].id = e.target.value;
                                            setModules(newModules);
                                        }}
                                    />
                                    <Input
                                        placeholder="Название модуля"
                                        value={module.title}
                                        onChange={(e) => {
                                            const newModules = [...modules];
                                            newModules[index].title = e.target.value;
                                            setModules(newModules);
                                        }}
                                    />
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        onClick={() => handleRemoveModule(index)}
                                    >
                                        Удалить
                                    </Button>
                                </div>
                            ))}
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleEditModule}
                                className="mt-2"
                            >
                                Добавить модуль
                            </Button>
                        </div>

                        {/* Организация */}
                        <div>
                            <Label>Организация</Label>
                            <div className="flex gap-2 mb-2">
                                <Input
                                    placeholder="Добавить организацию"
                                    value={currentOrganish}
                                    onChange={(e) => setCurrentOrganish(e.target.value)}
                                />
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleEditOrganish}
                                >
                                    Добавить
                                </Button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {organish.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded"
                                    >
                                        <span>{item}</span>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveOrganish(index)}
                                            className="text-red-500"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Кнопка отправки */}
                        <Button type="submit" disabled={isLoading} className="w-full">
                            {isLoading ? 'Создание...' : 'Создать курс'}
                        </Button>
                    </div>
                </form>
            </Form>
        </Modal>
    );
}