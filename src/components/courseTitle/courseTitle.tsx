import { Card } from "@/components/ui/card"
import { Calendar, List, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function CourseTitle() {
    return (
        <div className="">
            <Card className="p-6">
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Course Image */}
                    <div className="relative aspect-video rounded-lg overflow-hidden">
                        <img
                            src="https://www.sammi.ac/_next/image?url=https%3A%2F%2Fqk9g5hsrut.ufs.sh%2Ff%2Fxu965PmyvPo00Gmjkh79cpx21MsQhvWPLIgeAHGwlaumbU8j&w=1920&q=75&dpl=dpl_AyWjnwefx2RFAeEprCzJhU8VkTuz" // Replace with your course image path
                            alt="React Course"
                            className="object-cover"
                        />
                    </div>

                    <div>
                        <h1 className="text-3xl font-bold mb-4">React - To'liq Kurs</h1>
                        <p className="text-gray-700 dark:text-gray-300 mb-6">
                            Foundation to'liq kurs o'zbek tilida. HTML, CSS, JavaScript (BEM), Bootstrap,
                            SASS (SCSS) va amaliy loyihlar barchasi bitta kurs va asosiysi mutloqo bepul.
                            O'zingizni birinchi web saytingizni yashashingiz mumkin va uni hosting joylashni
                            ham sizga batafsil ma'lumot beramiz.
                        </p>

                        {/* Course Meta */}
                        <div className="space-y-4">
                            <div className="flex items-center text-sm">
                                <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                                <span className="text-gray-600 dark:text-gray-400">
                                    Boshlanish sanasi: {new Date().toLocaleDateString("uz-UZ", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric"
                                    })}
                                </span>
                            </div>

                            <div className="flex items-center text-sm">
                                <List className="w-4 h-4 mr-2 text-gray-500" />
                                <span className="text-gray-600 dark:text-gray-400">
                                    12 ta dars
                                </span>
                            </div>

                            <div className="flex items-center text-sm">
                                <Clock className="w-4 h-4 mr-2 text-gray-500" />
                                <span className="text-gray-600 dark:text-gray-400">
                                    Kurs davomiyligi: 8 hafta
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
                            <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                Batafsil Ma'lumot
                            </button>
                        </div>
                    </div>
                </div>
            </Card>
        </div>)
}
