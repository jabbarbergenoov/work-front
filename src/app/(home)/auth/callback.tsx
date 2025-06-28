// pages/auth/callback.tsx
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { toast } from 'sonner'

export default function GoogleCallback() {
    const router = useRouter()

    useEffect(() => {
        const token = router.query.token as string

        if (token) {
            localStorage.setItem('accessToken', token)
            toast.success('Вы успешно вошли через Google')
            router.push('/') // или /dashboard
        } else {
            toast.error('Ошибка входа через Google')
            router.push('/auth')
        }
    }, [router])

    return <p>Обработка входа через Google...</p>
}
