'use client'

import React, { useState } from 'react'
import { Card } from '../ui/card'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface Module {
    title: string
    description: string
    lessons: string[]
}

export default function CourseModules() {
    const [expandedModule, setExpandedModule] = useState<number | null>(null)

    const modules: Module[] = [
        {
            title: "Modul 1: Kirish",
            description: "Kursga kirish va asosiy tushunchalar",
            lessons: [
                "Kurs haqida umumiy ma'lumot",
                "Dasturlash muhitini sozlash",
                "Birinchi React ilovasi"
            ]
        },
        {
            title: "Modul 2: Asosiy tushunchalar",
            description: "HTML, CSS va JavaScript asoslari",
            lessons: [
                "JSX sintaksisi",
                "Komponentlar tuzilishi",
                "State va Props",
                "Event handlers"
            ]
        },
        {
            title: "Modul 3: Ilova yaratish",
            description: "React bilan ilova yaratish asoslari",
            lessons: [
                "Formalar bilan ishlash",
                "Routing",
                "API so'rovlari",
                "Custom hooklar"
            ]
        },
        {
            title: "Modul 4: Avanslangan mavzular",
            description: "Redux, Context API va boshqa avanslangan mavzular",
            lessons: [
                "Global state management",
                "Redux toolkit",
                "Performance optimizatsiya",
                "Testing"
            ]
        },
        {
            title: "Modul 5: Loyihalar",
            description: "Amaliy loyihalar va kod yozish mashqlari",
            lessons: [
                "To-do ilova",
                "E-commerce platforma",
                "Social media ilova",
                "Portfolio sayt"
            ]
        }
    ]

    const toggleModule = (index: number) => {
        setExpandedModule(expandedModule === index ? null : index)
    }

    return (
        <Card className="p-6">
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Kurs dasturi</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <h3 className="font-medium text-gray-500 dark:text-gray-400">Modullar soni</h3>
                        <p className="text-xl font-semibold">5 ta</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <h3 className="font-medium text-gray-500 dark:text-gray-400">Darslar soni</h3>
                        <p className="text-xl font-semibold">89 ta</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <h3 className="font-medium text-gray-500 dark:text-gray-400">Kurs davomiyligi</h3>
                        <p className="text-xl font-semibold">24 soat 08 daqiqa</p>
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
                                <h2 className="text-lg font-semibold">{module.title}</h2>
                                <p className="text-gray-600 dark:text-gray-400">{module.description}</p>
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
                                    {module.lessons.map((lesson, lessonIndex) => (
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