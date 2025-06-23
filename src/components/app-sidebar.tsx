"use client";

import { Calendar, Home, Settings, Menu, Info, Mail } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { motion } from "framer-motion";
import { toast } from "sonner";

const items = [
  { title: "Главная панель", url: "#", icon: Home },
  { title: "Курсы", url: "#", icon: Calendar },
  { title: "О нас", url: "#", icon: Info },
  { title: "Настройки", url: "#", icon: Settings },
  { title: "Связаться", url: "#", icon: Mail },
];

export function AppSidebar() {
  return (
    <>
      {/* 🌅 Mobile Version — Dawn Gradient */}
      <div className="lg:hidden p-3">
        <Sheet>
          <SheetTrigger asChild>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all"
            >
              <Menu className="w-6 h-6 text-indigo-600" />
            </motion.button>
          </SheetTrigger>
          <SheetContent 
            side="left" 
            className="w-72 p-0 bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-0"
          >
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel className="px-5 py-6 text-sm font-medium text-indigo-600/80 dark:text-indigo-300/80 uppercase tracking-wider">
                  Навигация
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {items.map((item, index) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                          <motion.a
                            href={item.url}
                            whileHover={{ x: 5 }}
                            className="flex items-center gap-3 px-5 py-3 text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-300 rounded-lg mx-2 transition-colors"
                          >
                            <motion.div 
                              className="p-2 rounded-lg bg-white/80 dark:bg-gray-800/50 shadow-sm backdrop-blur-sm"
                              whileHover={{ scale: 1.1 }}
                            >
                              <item.icon className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
                            </motion.div>
                            <span className="font-medium">{item.title}</span>
                          </motion.a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </SheetContent>
        </Sheet>
      </div>

      {/* 🌄 Desktop Version — Sunset Gradient */}
      <div className="hidden lg:block w-64 h-screen bg-gradient-to-b from-indigo-500 via-blue-500 to-purple-500 dark:bg-gradient-to-b dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-r border-indigo-100/50 dark:border-gray-700/30">
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="px-6 py-6 text-xs font-semibold text-indigo-600/80 dark:text-indigo-300/80 uppercase tracking-wider">
                Основное меню
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="flex flex-col gap-3">
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton className="w-[90%]" asChild>
                        <motion.a
                          href={item.url}
                          whileHover={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.6)',
                            boxShadow: '0 4px 15px rgba(99, 102, 241, 0.1)'
                          }}
                          whileTap={{ scale: 0.98 }}
                          className="flex items-center gap-3 px-5 py-3 text-gray-700 dark:text-gray-300 rounded-lg mx-3 transition-all backdrop-blur-sm"
                          style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.3)',
                          }}

                        >
                          <motion.div 
                            className="p-2 rounded-lg  "
                            whileHover={{ rotate: 5 }}
                          >
                            <item.icon className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
                          </motion.div>
                          <span className="font-medium">{item.title}</span>
                          <motion.div 
                            className="ml-auto opacity-0 group-hover:opacity-100 text-indigo-500 dark:text-indigo-400"
                            initial={{ x: -10 }}
                            animate={{ x: 0 }}
                            transition={{ delay: 0.1 }}
                          >
                            →
                          </motion.div>
                        </motion.a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            
            {/* Gradient accent line */}
            <motion.div 
              className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-400 via-blue-400 to-purple-400 dark:from-indigo-500 dark:via-blue-500 dark:to-purple-500"
              initial={{ opacity: 0.7 }}
              animate={{ opacity: 1 }}
              transition={{ 
                repeat: Infinity,
                repeatType: "reverse",
                duration: 3
              }}
            />
          </SidebarContent>

          <button
      onClick={() => toast.success("Успешно!", { description: "Данные сохранены." })}
    >
      Показать тост
    </button>
        </Sidebar>
      </div>
    </>
  );
}