"use client"

import { useEffect, useRef } from "react"
import { animate, motion, useInView, useMotionValue, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"
import { brands } from "@/lib/data"
import { Marquee } from "@/components/ui/marquee"

const STATS = [
  { value: 50, prefix: "+", suffix: "", label: "marcas nos eligen", highlight: true },
  { value: 4, prefix: "", suffix: " días", label: "hábiles máx. de producción" },
  { value: 24, prefix: "", suffix: "", label: "provincias con envío" },
  { value: 100, prefix: "", suffix: "%", label: "vinilo premium laminado" },
]

function Counter({ to, prefix, suffix }: { to: number; prefix: string; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const value = useMotionValue(0)
  const text = useTransform(value, (v) => `${prefix}${Math.round(v)}${suffix}`)

  useEffect(() => {
    if (!inView) return
    const controls = animate(value, to, { duration: 1.6, ease: [0.22, 1, 0.36, 1] })
    return () => controls.stop()
  }, [inView, to, value])

  return <motion.span ref={ref}>{text}</motion.span>
}

export function StatsBrands() {
  return (
    <section aria-labelledby="stats-title" className="pb-20 sm:pb-28">
      <div className="shell">
        <h2 id="stats-title" className="sr-only">
          Uknow Calcos en números
        </h2>
        <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {STATS.map((stat) => (
            <li
              key={stat.label}
              className={cn(
                "rounded-3xl border border-border p-6 sm:p-8",
                stat.highlight ? "border-transparent bg-pop text-ink" : "bg-card"
              )}
            >
              <p className="font-display text-5xl font-extrabold tracking-tight tabular-nums sm:text-6xl">
                <Counter to={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </p>
              <p className={cn("mt-2 text-sm", stat.highlight ? "text-ink/75" : "text-muted-foreground")}>{stat.label}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-16">
        <p className="shell text-center font-mono text-xs tracking-[0.3em] text-muted-foreground uppercase">
          Marcas que confían en nosotros
        </p>
        <Marquee
          duration={45}
          gap="1rem"
          pauseOnHover
          className="mt-6 py-3 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
        >
          {brands.map((brand, i) => (
            <span
              key={brand}
              className={cn(
                "rounded-2xl border-2 border-white bg-card px-6 py-3 font-display text-xl font-extrabold tracking-tight whitespace-nowrap text-foreground/80 shadow-[0_6px_14px_-8px_rgb(0_0_0/0.35)] dark:border-border",
                i % 2 ? "rotate-2" : "-rotate-2"
              )}
            >
              {brand}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  )
}
