import Course from '@/components/course/course'
import React from 'react'


const items = [
  { title: "Курс по React", id:1, backgroundImage: "https://www.sammi.ac/_next/image?url=https%3A%2F%2Fqk9g5hsrut.ufs.sh%2Ff%2Fxu965PmyvPo0iUp6fYhocXUlvFEwuZWOT81zHSksDrGxN4f9&w=1920&q=75&dpl=dpl_AyWjnwefx2RFAeEprCzJhU8VkTuz" },
  {title:"Курс по Next.js",id:2, backgroundImage: "https://www.sammi.ac/_next/image?url=https%3A%2F%2Fqk9g5hsrut.ufs.sh%2Ff%2F4b1c6d8e7a0c4b8f9c1e3d4e5f6a7b8c&w=1920&q=75&dpl=dpl_AyWjnwefx2RFAeEprCzJhU8VkTuz" },
];

export default function CoursesPage() {
  return (
    <>
      <h1>Курсы</h1>
      <div className='mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {items.map((item) => (
          <Course
            key={item.id}
            id={item.id}
            title={item.title}
            backgroundImage={item.backgroundImage}
          />
        ))}
      
      </div>

    </>
  )
}
