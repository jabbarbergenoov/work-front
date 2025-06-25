import React from 'react'

export default function AboutPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 dark:bg-gray-900/10 min-h-screen">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">О нашей компании</h1>
                <div className="w-24 h-1 bg-blue-600 mx-auto dark:bg-blue-500"></div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 md:p-10 transition-colors duration-300">
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    Мы - команда <span className="font-bold text-blue-600 dark:text-blue-400">TECHFLOW</span>, профессиональные разработчики с 
                    богатым опытом в создании цифровых решений. Наш портфель включает более 
                    5 успешных проектов, и мы постоянно работаем над новыми инновационными идеями.
                </p>

                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    Если вы мечтаете стать разработчиком высокого уровня - вы сделали правильный выбор. 
                    Вместе с нами вы освоите современные технологии и лучшие практики разработки.
                </p>

                <div className="bg-blue-50 dark:bg-gray-700 rounded-lg p-6 border-l-4 border-blue-600 dark:border-blue-500 transition-colors duration-300">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">Наши экспертизы:</h3>
                    <ul className="space-y-2">
                        <li className="flex items-start">
                            <span className="text-blue-600 dark:text-blue-400 mr-2">✓</span>
                            <span className="text-gray-700 dark:text-gray-300">Создание красивых и функциональных UI/UX интерфейсов</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-blue-600 dark:text-blue-400 mr-2">✓</span>
                            <span className="text-gray-700 dark:text-gray-300">Разработка современных веб-сайтов и приложений</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-blue-600 dark:text-blue-400 mr-2">✓</span>
                            <span className="text-gray-700 dark:text-gray-300">CRM системы для автоматизации бизнеса</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-blue-600 dark:text-blue-400 mr-2">✓</span>
                            <span className="text-gray-700 dark:text-gray-300">SMM и медиа-решения</span>
                        </li>
                    </ul>
                </div>

                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mt-8">
                    Присоединяйтесь к TECHFLOW, и вместе мы сможем воплотить в жизнь самые смелые 
                    технологические идеи!
                </p>
            </div>
        </div>
    )
}