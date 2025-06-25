import React from 'react'
import { Card } from '@/components/ui/card'
import Link from 'next/link'; // Changed from lucide-react

type Props = {
    title: string;
    backgroundImage: string;
    id: number;
}

export default function CourseCard({ title, backgroundImage, id }: Props) {
    return (
        <Link href={`/courses/${id}`} className="no-underline block"> {/* Fixed template literal and added block display */}
            <Card className="max-w-sm overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col"> {/* Added hover effects and full height */}
                <div className="relative flex-1"> {/* Added flex-1 for proper image container sizing */}
                    <img
                        src={backgroundImage}
                        alt={title}
                        className="w-full h-full object-cover rounded-t-xl" 
                        loading="lazy" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" /> {/* Improved gradient */}
                </div>
                <div className="p-4"> {/* Added proper padding */}
                    <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200 truncate"> {/* Better dark mode color and truncation */}
                        {title}
                    </h1>
                   
                </div>
            </Card>
        </Link>
    )
}