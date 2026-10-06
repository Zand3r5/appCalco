"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Star } from "lucide-react"
import { StickerArt, type StickerKind } from "@/components/stickers/sticker-art"
import { CtaLink } from "@/components/ui/cta-link"

type BoardSticker = {
  kind: StickerKind
  left: string
  top: string
  width: string
  rotate: number
}

const BOARD: BoardSticker[] = [
  { kind: "logo", left: "27%", top: "27%", width: "46%", rotate: -4 },
  { kind: "tag", left: "3%", top: "5%", width: "34%", rotate: -10 },
  { kind: "bolt", left: "41%", top: "3%", width: "19%", rotate: 12 },
  { kind: "crown", left: "65%", top: "4%", width: "28%", rotate: 8 },
  { kind: "spray", left: "4%", top: "39%", width: "23%", rotate: 6 },
  { kind: "drip", left: "75%", top: "38%", width: "21%", rotate: -6 },
  { kind: "badge24", left: "8%", top: "68%", width: "26%", rotate: -8 },
  { kind: "flame", left: "41%", top: "70%", width: "22%", rotate: 4 },
  { kind: "che", left: "67%", top: "67%", width: "28%", rotate: 10 },
]

const HEADLINE_SPRING = { type: "spring", stiffness: 220, damping: 20 } as const

function Word({ children, delay }: { children: string; delay: number }) {
  return (
    <motion.span
      className="inline-block"
      initial={{ opacity: 0, y: "0.5em", rotate: 4 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ ...HEADLINE_SPRING, delay }}
    >
      {children}
    </motion.span>
  )
}

function StickerBoard() {
  const boardRef = useRef<HTMLDivElement>(null)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="relative mx-auto w-full max-w-[560px]"
    >
      <div ref={boardRef} role="img" aria-label="Plancha de stickers de ejemplo que podés arrastrar" className="relative aspect-square">
        <div
          aria-hidden
          className="absolute inset-[3%] rotate-2 rounded-md border-2 border-ink bg-card shadow-hard dark:border-border"
        >
          <div className="absolute inset-4 rounded-sm border-2 border-dashed border-foreground/10" />
          <span className="tape -top-3 left-6 -rotate-12" />
          <span className="tape -right-4 -bottom-2 rotate-[24deg]" />
          <p className="absolute bottom-2 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.3em] whitespace-nowrap text-muted-foreground uppercase">
            Plancha N.º 000 · Uknow calcos
          </p>
        </div>

        {BOARD.map((sticker, i) => (
          <motion.div
            key={sticker.kind}
            drag
            dragConstraints={boardRef}
            dragElastic={0.18}
            whileDrag={{ scale: 1.12, rotate: 0, zIndex: 40 }}
            whileHover={{ scale: 1.06 }}
            initial={{ opacity: 0, scale: 0.3, rotate: sticker.rotate - 30, y: -50 }}
            animate={{ opacity: 1, scale: 1, rotate: sticker.rotate, y: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 17, delay: 0.55 + i * 0.07 }}
            className="absolute cursor-grab touch-none active:cursor-grabbing"
            style={{ left: sticker.left, top: sticker.top, width: sticker.width }}
          >
            <div className="animate-float" style={{ animationDelay: `${i * -0.8}s`, animationDuration: `${5 + (i % 3)}s` }}>
              <StickerArt kind={sticker.kind} className="pointer-events-none h-auto w-full select-none" />
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        aria-hidden
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.4 }}
        className="pointer-events-none absolute -bottom-6 -left-2 flex items-end gap-1 font-hand text-2xl text-muted-foreground sm:-left-10"
      >
        <svg width="46" height="40" viewBox="0 0 46 40" fill="none" className="-rotate-12">
          <path d="M4 36C10 18 24 8 40 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M32 2L41 6L35 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        ¡arrastralos!
      </motion.div>
    </motion.div>
  )
}

export function Hero() {
  return (
    <section id="personalizados" className="bg-concrete relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_45%_at_78%_42%,color-mix(in_oklch,var(--brand)_16%,transparent),transparent_70%)]"
      />
      <div className="shell relative grid items-center gap-14 pt-10 pb-16 lg:grid-cols-[1.05fr_1fr] lg:pt-16 lg:pb-20">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10, rotate: -2 }}
            animate={{ opacity: 1, y: 0, rotate: -2 }}
            className="inline-flex items-center gap-2 rounded-sm bg-ink px-3 py-1.5 font-mono text-[11px] tracking-[0.2em] text-paper uppercase"
          >
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand opacity-75 motion-reduce:animate-none" />
              <span className="relative inline-flex size-2.5 rounded-full bg-brand" />
            </span>
            Producción en 24 a 96 hs
          </motion.p>

          <h1 className="mt-6 font-display text-[4.6rem] leading-[0.86] sm:text-[7rem] xl:text-[8.4rem]">
            <span className="flex flex-wrap gap-x-[0.22em]">
              <Word delay={0.05}>Tu</Word>
              <Word delay={0.13}>logo,</Word>
            </span>
            <span className="flex flex-wrap items-baseline gap-x-[0.22em]">
              <Word delay={0.21}>hecho</Word>
              <motion.span
                className="relative inline-block rounded-[0.1em] border-[0.05em] border-white bg-brand px-[0.12em] text-ink shadow-[0.05em_0.05em_0_0_var(--ink)]"
                initial={{ opacity: 0, scale: 1.9, rotate: -25 }}
                animate={{ opacity: 1, scale: 1, rotate: -4 }}
                whileHover={{ rotate: 3, scale: 1.04 }}
                transition={{ type: "spring", stiffness: 320, damping: 14, delay: 0.45 }}
              >
                calco.
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.5 }}
            className="mt-7 max-w-lg text-lg text-balance text-muted-foreground"
          >
            Stickers personalizados de vinilo premium, troquelados con la forma que quieras. Convertí tu logo, tu
            mascota o esa idea que tenés en la cabeza en calcos que duran.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.5 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <CtaLink href="#de-a-uno" size="lg">
              Diseñá tu sticker
              <ArrowRight aria-hidden />
            </CtaLink>
            <CtaLink href="#empresas" size="lg" variant="outline">
              Pedido por mayor
            </CtaLink>
          </motion.div>

          <motion.a
            href="#opiniones"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-9 inline-flex items-center gap-3 rounded-lg text-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            <span className="flex text-pop" aria-hidden>
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} className="size-4 fill-current stroke-ink/30" />
              ))}
            </span>
            <span className="text-muted-foreground">
              <strong className="font-semibold text-foreground">+50 marcas</strong> y cientos de clientes felices
            </span>
          </motion.a>
        </div>

        <StickerBoard />
      </div>
    </section>
  )
}
