import type { CSSProperties, ReactNode } from "react"
import { cn } from "@/lib/utils"

type MarqueeProps = {
  children: ReactNode
  className?: string
  /** Seconds per loop. */
  duration?: number
  reverse?: boolean
  pauseOnHover?: boolean
  gap?: string
  repeat?: number
}

export function Marquee({
  children,
  className,
  duration = 40,
  reverse = false,
  pauseOnHover = false,
  gap = "2rem",
  repeat = 2,
}: MarqueeProps) {
  const style = { "--duration": `${duration}s`, "--gap": gap, gap } as CSSProperties

  return (
    <div className={cn("group flex overflow-hidden", className)} style={style}>
      {Array.from({ length: repeat }, (_, i) => (
        <div
          key={i}
          aria-hidden={i > 0 || undefined}
          className={cn(
            "flex shrink-0 animate-marquee items-center justify-around",
            reverse && "[animation-direction:reverse]",
            pauseOnHover && "group-hover:[animation-play-state:paused]"
          )}
          style={{ gap }}
        >
          {children}
        </div>
      ))}
    </div>
  )
}
