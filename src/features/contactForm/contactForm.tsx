import { Instagram, Mail, MessageCircle, MessageSquareText } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export default function ContactForm() {
  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Свяжитесь с нами
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-center mb-8">
          Если у вас есть вопросы или предложения по Techflow, вы можете использовать наши контакты ниже или заполнить эту форму.
        </p>

        <div className="grid gap-6 mb-8 md:grid-cols-2">
          <div className="flex items-center space-x-4">
            <Mail className="h-5 w-5 text-primary" />
            <a href="mailto:kungrad_it@gmail.com" className="hover:underline">
              kungrad_it@gmail.com
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <MessageSquareText className="h-5 w-5 text-primary" />
            <span>@kungrad_it</span>
          </div>
          <div className="flex items-center space-x-4">
            <Instagram className="h-5 w-5 text-primary" />
            <span>@kungrad_it</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Ваше имя</Label>
            <Input id="name" placeholder="Например: Майкл Жордан" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Ваш вопрос или предложение</Label>
            <Textarea 
              id="message" 
              rows={6} 
              placeholder="Что бы вы хотели добавить на сайте Techflow?" 
            />
          </div>
          <Button className="w-full" size="lg">
            Отправить
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}