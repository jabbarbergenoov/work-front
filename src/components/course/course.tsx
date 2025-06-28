'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import { Pencil, Trash } from 'lucide-react';

type Props = {
    title: string;
    backgroundImage: string;
    id: number;
    userRole?: string;
    onEdit?: () => void;
    onDelete?: () => void;
    slug: string; 

};


export default function CourseCard({
    title,
    backgroundImage,
    id,
    userRole,
    onEdit,
    onDelete,
    slug
}: Props) {
    console.log(slug );
    return (
        <div className="relative group">
            <Link href={`/courses/${slug}`} className="no-underline block">
                <Card className="overflow-hidden rounded-xl pt-0 shadow-md hover:shadow-lg transition-all duration-300 h-full flex flex-col border border-gray-200 dark:border-gray-700 group-hover:border-blue-500 dark:group-hover:border-blue-400">
                    <div className="relative h-48 w-full overflow-hidden">
                        <Image
                            src={`http://localhost:7777${backgroundImage}`}
                            alt={title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            width={400}
                            height={200}
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-2 mb-2">
                            {title}
                        </h3>
                    </div>
                </Card>
            </Link>

            {/* Кнопки админа */}
            {userRole === 'admin' && (
                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">

                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            onEdit(name, id, backgroundImage);
                        }}
                        className="bg-white/80 dark:bg-black/50 hover:bg-white text-gray-800 dark:text-white p-1 rounded-full shadow"
                        title="Редактировать"
                    >
                        <Pencil size={18} />
                    </button>


                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            onDelete(id);
                        }}
                        className="bg-white/80 dark:bg-black/50 hover:bg-white text-red-600 p-1 rounded-full shadow"
                        title="Удалить"
                    >
                        <Trash size={18} />
                    </button>

                </div>
            )}
        </div>
    );
}
