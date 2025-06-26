'use client';

import React from 'react';
import { useParams } from 'next/navigation';

export default function VideoPage() {
  const params = useParams();
  const lessonId = params?.id as string;

  // Данные урока (в реальном приложении можно получать через API)
  const getLessonData = (id: string) => {
    const allLessons = modules.flatMap(mod => mod.lessons);
    return allLessons.find(lesson => lesson.id === id);
  };

  const lesson = getLessonData(lessonId);

  if (!lesson) {
    return <div>Урок не найден</div>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{lesson.title}</h1>
      
      {/* Видеоплеер */}
      <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
        <div className="aspect-w-16 aspect-h-9 bg-black">
          <video 
            controls 
            className="w-full h-full"
            poster="/video-poster.jpg" // Заглушка для видео
          >
            <source 
              src={`/videos/lesson-${lessonId}.mp4`} 
              type="video/mp4" 
            />
            Ваш браузер не поддерживает видео тег.
          </video>
        </div>
      </div>

      {/* Описание урока */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-3">Описание урока</h2>
        <p className="text-gray-700 dark:text-gray-300">
          Здесь будет подробное описание урока и дополнительные материалы.
          В реальном приложении это можно получать из базы данных.
        </p>
      </div>

      {/* Навигация между уроками */}
      <div className="flex justify-between mt-8">
        <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600">
          Предыдущий урок
        </button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Следующий урок
        </button>
      </div>
    </div>
  );
}

// Вспомогательные данные (в реальном приложении будут приходить с API)
const modules = [
  {
    id: "module1",
    title: "1-Modul: Kirish",
    lessons: [
      { id: "1", title: "1.1 - Kursga Kirish" },
      { id: "2", title: "1.2 - Kurs Tuzilishi" },
    ],
  },
  {
    id: "module2",
    title: "2-Modul: HTML Asoslari",
    lessons: [
      { id: "3", title: "2.1 - HTML Taglari" },
    ],
  },
];