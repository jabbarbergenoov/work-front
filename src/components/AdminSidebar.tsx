"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ArrowLeft, Video } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

type Lesson = {
  id: string;
  title: string;
};

type Module = {
  id: string;
  title: string;
  lessons: Lesson[];
};

const modules: Module[] = [
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

export default function AdminSidebar() {
  const pathname = usePathname();
  
  const isLessonActive = (lessonId: string) => {
    return pathname === `/courses/dashboard/${lessonId}`;
  };

  return (
    <Sidebar className="w-64 border-r bg-gray-50 dark:bg-gray-900">
        <div className="px-7 pt-5">
            <Button
            variant={"outline"}
            >
                <ArrowLeft className="mr-2 h-4 w-4" />
            <Link href={'/'}>Ortga qaytish</Link>
            </Button>
        </div>
      <SidebarContent className="p-4 space-y-6">
        {modules.map((mod) => (
          <SidebarGroup key={mod.id} className="space-y-2">
            <SidebarGroupLabel className="text-sm font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
              {mod.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {mod.lessons.map((lesson) => (
                  <Link 
                    href={`/courses/dashboard/${lesson.id}`} 
                    key={lesson.id}
                    passHref
                  >
                    <SidebarMenuItem
                      icon={Video}
                      className={cn(
                        "px-3 py-2 rounded-md text-sm font-medium transition-colors block",
                        "hover:bg-gray-200 dark:hover:bg-gray-800",
                        isLessonActive(lesson.id)
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                          : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
                      )}
                    >
                      <span className="flex items-center gap-2">
                        <Video className="h-4 w-4" />
                        {lesson.title}
                      </span>
                    </SidebarMenuItem>
                  </Link>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}