import { Marquee } from "@/components/ui/marquee"

const MESSAGES = [
  "Envíos a todo el país y al mundo",
  "Listos en máx. 4 días hábiles",
  "Personalizados desde 10 unidades",
  "10% OFF pagando por transferencia",
  "Vinilo premium resistente al agua",
]

export function AnnouncementBar() {
  return (
    <div className="bg-ink py-2 text-[13px] font-medium text-paper dark:border-b dark:border-border">
      <Marquee duration={38} gap="2.5rem" pauseOnHover>
        {MESSAGES.map((message) => (
          <span key={message} className="flex items-center gap-10 whitespace-nowrap">
            {message}
            <span aria-hidden className="text-pop">
              ✦
            </span>
          </span>
        ))}
      </Marquee>
    </div>
  )
}
