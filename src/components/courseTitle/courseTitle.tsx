import { Card } from "@/components/ui/card"
import { Calendar, List, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function CourseTitle({ data }: { data: any }) {
    const courseData = Array.isArray(data) ? data[0] : data;

    return (
        <div className="">
            <Card className="p-6">
                <div className="grid md:grid-cols-2 gap-8">

                    <div className="relative aspect-video rounded-lg overflow-hidden">
                        <Image
                            width={400}
                            height={400}
                            src={`http://localhost:7777/uploads/${courseData.image}` || "https://qk9g5hsrut.ufs.sh/f/xu965PmyvPo00Gmjkh79cpx21MsQhvWPLIgeAHGwlaumbU8j"}
                            alt={courseData.name || "Kurs rasmi"}
                            className="object-cover"
                        />
                    </div>

                    <div>
                        <h1 className="text-3xl font-bold mb-4">{courseData.name}</h1>
                        <p className="text-gray-700 dark:text-gray-300 mb-6">
                            {courseData.description || "Bu kurs haqida ma'lumot mavjud emas."}
                        </p>

                        {/* Course Meta */}
                        <div className="space-y-4">
                            <div className="flex items-center text-sm">
                                <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                                <span className="text-gray-600 dark:text-gray-400">
                                    Boshlangan sanasi: {courseData.createdAt}
                                </span>
                            </div>

                            <div className="flex items-center text-sm">
                                <List className="w-4 h-4 mr-2 text-gray-500" />
                                <span className="text-gray-600 dark:text-gray-400">
                                    {courseData.dars || 'darslar yoq'}
                                </span>
                            </div>


                        </div>

                        {/* Action Buttons */}
                        <div className="mt-8 flex gap-4">
                            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                <Link href={`dashboard/${1}`} className="no-underline text-white">
                                    Kursga Yozilish
                                </Link>
                            </button>

                        </div>
                    </div>
                </div>
            </Card>
        </div>)
}
