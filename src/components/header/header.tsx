'use client'

import { useTheme } from 'next-themes'
import Image from 'next/image'
import { Contact, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimatePresence, motion } from "framer-motion"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import Link from 'next/link'

export default function Header() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <header className='w-full flex items-center justify-between px-6 py-3 bg-white/80 dark:bg-gray-900/30 rounded-xl backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-sm'>
      <div className="flex items-center gap-2">
        <Image
          src={'/images/logo.png'}
          width={130}
          height={30}
          alt='logo'
          className="dark:filter dark:invert dark:hue-rotate-180 transition-all"
          priority
        />
      </div>
      
      <div className='flex items-center gap-3'>
        {/* Theme Toggle Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="relative rounded-full w-10 h-10 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={theme}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.2 }}
                    transition={{ duration: 0.2 }}
                  >
                    {theme === 'dark' ? (
                      <Sun className="h-5 w-5 text-amber-300" />
                    ) : (
                      <Moon className="h-5 w-5 text-indigo-600" />
                    )}
                  </motion.div>
                </AnimatePresence>
              </Button>
            </motion.div>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="text-sm">
            {theme === 'dark' ? 'Светлая тема' : 'Тёмная тема'}
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full w-10 h-10 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                aria-label="Contact"
              >
                <Link href={'/contact'}>
                <Contact className="h-5 w-5 text-gray-700 dark:text-gray-300" />
</Link>
              </Button>
            </motion.div>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="text-sm">
            Контакты
          </TooltipContent>
        </Tooltip>
      </div>

    </header>
  )
}