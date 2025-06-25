import CourseAbout from "@/components/courseAbout/courseAbout"
import CourseModules from "@/components/CourseModules/CourseModules"
import CourseTitle from "@/components/courseTitle/courseTitle"


interface Props {
  params: {
    id: string
  }
}

export default function CourseIdPage({ params }: Props) {
  return (
    <>
      <CourseTitle />
      <CourseAbout />
      <CourseModules />
    </>

  )
}