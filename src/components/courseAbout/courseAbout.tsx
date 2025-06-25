import React from 'react'
import { Card } from '../ui/card'
import { CheckCircle } from 'lucide-react'

export default function CourseAbout() {
    const topics = [
        "Class component",
        "Function component",
        "Hooklar",
        "Custom hooklar",
        "API bilan ishlash",
        "Redux",
        "Redux toolkit",
        "Amaliy loyihalar"
    ]

    return (
        <Card className="p-6 rounded-lg shadow-sm mt-5">
            <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                Nimalarni o'rganasiz?
            </h1>

            <div className="space-y-3">
                {topics.map((topic, index) => (
                    <div key={index} className="flex items-start">
                        <CheckCircle className="w-5 h-5 mt-0.5 mr-2 text-green-500 flex-shrink-0" />
                        <p className="text-gray-700 dark:text-gray-300">
                            {topic}
                        </p>
                    </div>
                ))}
            </div>

        
        </Card>
    )
}