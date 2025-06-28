'use client';

import { useEffect, useState, use } from 'react';
import CourseAbout from "@/components/courseAbout/courseAbout";
import CourseModules from "@/components/CourseModules/CourseModules";
import CourseTitle from "@/components/courseTitle/courseTitle";
import { useFetch } from "@/hooks/useFetch";
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import AddSlugData from '@/modals/addSlugData';

interface Props {
  params: {
    slug: string;
  };
}

interface User {
  role?: string;
  // другие поля пользователя
}

export default function CourseIdPage({ params: paramsPromise }: Props) {
  // Unwrap the params promise
  const params = use(paramsPromise);
  const [user, setUser] = useState<User | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Безопасное получение пользователя из localStorage
    try {
      const userData = localStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
    }
  }, []);

  const { data, error, loading } = useFetch(`/slugdatas?slugData=${params.slug}`);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 space-y-8">
        <Skeleton className="h-12 w-full max-w-3xl mx-auto" />
        <div className="space-y-4">
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-32 w-full" />
        </div>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="container mx-auto max-w-4xl mt-8">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Ошибка!</AlertTitle>
        <AlertDescription>
          {error.message || 'Произошла ошибка при загрузке данных'}
        </AlertDescription>
      </Alert>
    );
  }

  if (!data || (Array.isArray(data) && data.length === 0)) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="max-w-2xl mx-auto flex flex-col items-center bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mt-10">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Нет данных</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            К сожалению, информация по этому курсу отсутствует.
          </p>
          <Image
            src={'/images/404.png'}
            width={300}
            height={300}
            alt="Нет данных"
          />
          {user?.role === 'admin' && (
            <Button
              variant="default"
              onClick={() => setIsOpen(true)}
              className="mt-6 bg-blue-600 hover:bg-blue-700"
            >
              Добавить контент
            </Button>
          )}
        </div>
        <AddSlugData setIsOpen={setIsOpen} isOpen={isOpen} />
      </div>
    );
  }

  const isAdmin = user?.role === 'admin';

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {isAdmin && (
        <Alert className="mb-8">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Режим администратора</AlertTitle>
          <AlertDescription>
            Вы можете редактировать этот курс
          </AlertDescription>
        </Alert>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6">
        <CourseTitle />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6">
        <CourseAbout />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Модули курса</h2>
        <CourseModules />
      </div>

      {isAdmin && (
        <div className="flex justify-end">
          <Button variant="default" className="bg-green-600 hover:bg-green-700">
            Редактировать курс
          </Button>
        </div>
      )}

    </div>
  );
}