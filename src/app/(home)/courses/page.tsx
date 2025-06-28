'use client';

import React, { useEffect, useState } from 'react';
import CourseCard from '@/components/course/course';
import AddCourseModal from '@/modals/addCourseModal';
import { useFetch } from '@/hooks/useFetch';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';
import { axiosInstance } from '@/shared/api';
import { toast } from 'sonner';
import EditCourseModal from '@/modals/EditCourseModal';

export type Course = {
  id: number;
  name: string;
  image: string;
  slug: string;
};

export default function CoursesPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<{ role?: string }>({});
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState<Course | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        setUser({});
      }
    }
  }, []);

  const { data, error, loading, fetchData } = useFetch<Course[]>('/courses');
  console.log('Courses data:', data);
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await axiosInstance.delete(`/courses/${id}`);
      fetchData();
      toast.success(response.data.message || 'Курс успешно удален');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Ошибка при удалении курса');
    }
  };

  const handleEditClick = (course: Course) => {
    setCurrentCourse(course);
    setIsEditOpen(true);
  };

  const handleEditSuccess = () => {
    fetchData();
    setIsEditOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12"
      >
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Наши курсы</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
            Изучайте новые навыки с нашими экспертами
          </p>
        </div>

        {user.role === 'admin' && (
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-2 font-medium"
            onClick={() => setIsOpen(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Добавить курс
          </motion.button>
        )}
      </motion.div>

      {/* Loading, error, and content rendering remains the same */}
      {/* ... */}

      {data && (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {data.map((course) => (
            <motion.div
              key={course.id}
              variants={item}
              whileHover={{ y: -5 }}
            >
              <CourseCard
                id={course.id}
                title={course.name}
                slug={course.slug} 
                backgroundImage={course.image}
                userRole={user.role}
                onDelete={() => handleDelete(course.id)}
                onEdit={() => handleEditClick(course)}
              />
            </motion.div>
          ))}
        </motion.div>
      )}

      <AddCourseModal isOpen={isOpen} setIsOpen={setIsOpen} fetchData={fetchData} />
      {currentCourse && (
        <EditCourseModal
          isOpen={isEditOpen}
          setIsOpen={setIsEditOpen}
          course={currentCourse}
          onSuccess={handleEditSuccess}
        />
      )}
    </div>
  );
}