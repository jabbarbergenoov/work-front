'use client'

import React, { useState } from 'react'
import { Card } from '../ui/card'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface Module {
    title: string
    description: string
    lessons: string[]
}

export default function CourseModules({ data }: { data?: any }) {
    const courseData = Array.isArray(data) ? data[0] : data
    const modules: Module[] = courseData?.modules || []
    const [expandedModule, setExpandedModule] = useState<number | null>(null)

    const toggleModule = (index: number) => {
        setExpandedModule(expandedModule === index ? null : index)
    }

   const totalModules = modules.length;

   const lessonsCount = modules.reduce((count, module) => count + (module.lessons?.length || 0), 0);
    return (
        <Card className="p-6">
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Kurs dasturi</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <h3 className="font-medium text-gray-500 dark:text-gray-400">Modullar soni</h3>
                        <p className="text-xl font-semibold">{totalModules} ta</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <h3 className="font-medium text-gray-500 dark:text-gray-400">Darslar soni</h3>
                        <p className="text-xl font-semibold">{lessonsCount} ta</p>
                    </div>
                    
                </div>
            </div>

            <div className="space-y-4">
                {modules.map((module, index) => (
                    <div
                        key={index}
                        className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700"
                    >
                        <div
                            className="flex justify-between items-center cursor-pointer"
                            onClick={() => toggleModule(index)}
                        >
                            <div>
                                <h2 className="text-lg font-semibold">{module.module.title}</h2>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {module.module.description || "Tavsif mavjud emas."}
                                </p>
                            </div>
                            {expandedModule === index ? (
                                <ChevronUp className="text-gray-500" />
                            ) : (
                                <ChevronDown className="text-gray-500" />
                            )}
                        </div>

                        {expandedModule === index && (
                            <div className="mt-4 pl-2 border-l-2 border-blue-500">
                                <h3 className="font-medium mb-2">Darslar ro'yxati:</h3>
                                <ul className="space-y-2">
                                    {(module.module.lessons ?? []).map((lesson, lessonIndex) => (
                                        <li key={lessonIndex} className="flex items-start">
                                            <span className="text-blue-500 mr-2">•</span>
                                            <span>{lesson}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                ))}
            </div>

        </Card>
    )
}