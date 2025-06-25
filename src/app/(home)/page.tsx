import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import Link from 'next/link'
import { FaReact } from 'react-icons/fa'

export default function HomePage() {
  return (
    <div className=" flex items-center justify-center ">
      <Card className="w-full "> {/* Увеличил максимальную ширину */}
        <div className="flex flex-row items-stretch"> {/* Основной контейнер flex */}
          {/* Левая часть с контентом */}
          <div className="flex-1 p-6"> {/* flex-1 для растягивания */}
            <CardHeader className="text-left space-y-2"> {/* Выравнивание по левому краю */}
              <CardTitle className="text-2xl font-bold">Добро пожаловать в TECHFLOW!</CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              <p className="text-left text-gray-700 dark:text-gray-300"> {/* Выравнивание по левому краю */}
                Здесь вы можете найти информацию о наших курсах, проектах и многом другом.
                Начните своё обучение прямо сейчас!
              </p>

              <div className="flex flex-col space-y-3 max-w-xs"> {/* Ограничил ширину кнопок */}
                <Button asChild className="w-full">
                  <Link href="/courses">
                    Перейти к курсам
                  </Link>
                </Button>
                
                <Button variant="outline" asChild className="w-full">
                  <Link href="/about">
                    О нас
                  </Link>
                </Button>
              </div>
            </CardContent>

            <CardFooter className="flex justify-start"> {/* Выравнивание по левому краю */}
              <p className="text-sm text-muted-foreground">
                TECHFLOW © {new Date().getFullYear()}
              </p>
            </CardFooter>
          </div>

          {/* Правая часть с иконкой */}
          <div className="flex-1 flex items-center justify-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-r-lg">
            <FaReact className="w-64 h-64 text-blue-500 dark:text-blue-400 animate-spin-slow" /> {/* Увеличил размер и добавил анимацию */}
          </div>
        </div>
      </Card>
    </div>
  )
}