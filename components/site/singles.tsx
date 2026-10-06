"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, Check, Plus } from "lucide-react"
import { formatARS, products, type Product } from "@/lib/data"
import { StickerArt } from "@/components/stickers/sticker-art"
import { useCart } from "./cart-context"
import { Reveal } from "./reveal"

const ADDED_FEEDBACK_MS = 1600
const TOAST_MS = 2400

function priceLabel({ priceFrom, priceTo }: Product) {
  return priceTo ? `desde ${formatARS(priceFrom)}` : formatARS(priceFrom)
}

function ProductCard({ product }: { product: Product }) {
  const { add } = useCart()
  const [added, setAdded] = useState(false)

  useEffect(() => {
    if (!added) return
    const t = setTimeout(() => setAdded(false), ADDED_FEEDBACK_MS)
    return () => clearTimeout(t)
  }, [added])

  return (
    <article className="group relative flex h-full flex-col rounded-md border-2 border-ink bg-card shadow-hard transition-transform duration-200 ease-out hover:-translate-y-1 dark:border-border">
      <span aria-hidden className="tape -top-3 left-1/2 z-10 -translate-x-1/2 rotate-[-3deg]" />
      <div
        className="bg-concrete relative grid aspect-square place-items-center overflow-hidden rounded-t-[4px] border-b-2 border-ink dark:border-border"
        style={{ backgroundColor: product.tint }}
      >
        {product.badge && (
          <span className="absolute top-3 left-3 -rotate-3 rounded-sm bg-pop px-2 py-0.5 font-display text-xs tracking-wide text-ink uppercase">
            {product.badge}
          </span>
        )}
        <StickerArt
          kind={product.art}
          title={product.name}
          className="w-[64%] transition-transform duration-300 ease-out group-hover:-translate-y-1.5 group-hover:scale-105 group-hover:-rotate-6"
        />
        <span className="absolute right-2.5 bottom-2.5 rotate-2 rounded-sm bg-paper px-2 py-1 font-mono text-[11px] font-semibold text-ink shadow-[2px_2px_0_0_var(--ink)] sm:text-xs">
          {priceLabel(product)}
        </span>
      </div>
      <div className="flex flex-1 flex-col px-3 pt-3 pb-3">
        <h3 className="font-display text-lg leading-[1.05] uppercase sm:text-xl">{product.name}</h3>
        <p className="mt-1 font-mono text-[11px] tracking-wider text-muted-foreground uppercase">Vinilo troquelado · 7 cm</p>
        <div className="mt-auto pt-4">
          <button
            type="button"
            onClick={() => {
              add(product.name)
              setAdded(true)
            }}
            className="flex h-10 w-full items-center justify-center overflow-hidden rounded-full bg-primary text-sm font-semibold text-primary-foreground transition-transform duration-150 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card focus-visible:outline-none active:translate-y-0"
          >
            <motion.span
              key={added ? "added" : "add"}
              initial={{ y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-1.5"
            >
              {added ? <Check className="size-4" aria-hidden /> : <Plus className="size-4" aria-hidden />}
              {added ? "¡Sumado!" : "Sumar"}
            </motion.span>
          </button>
        </div>
      </div>
    </article>
  )
}

function CartToast() {
  const { count, lastAdded } = useCart()
  const [visibleFor, setVisibleFor] = useState(0)

  useEffect(() => {
    if (visibleFor === 0) return
    const t = setTimeout(() => setVisibleFor(0), TOAST_MS)
    return () => clearTimeout(t)
  }, [visibleFor])

  // Show the toast whenever the cart count increases.
  const [seenCount, setSeenCount] = useState(count)
  if (count !== seenCount) {
    setSeenCount(count)
    if (count > seenCount) setVisibleFor(count)
  }

  return (
    <div aria-live="polite" className="pointer-events-none fixed bottom-5 left-1/2 z-50 -translate-x-1/2">
      <AnimatePresence>
        {visibleFor > 0 && lastAdded && (
          <motion.div
            key={visibleFor}
            initial={{ y: 40, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 380, damping: 26 }}
            className="flex items-center gap-3 rounded-full bg-ink py-2 pr-5 pl-2 text-sm whitespace-nowrap text-paper shadow-xl dark:border dark:border-border"
          >
            <span className="grid size-8 place-items-center rounded-full bg-brand text-ink">
              <Check className="size-4" aria-hidden />
            </span>
            <span>
              Agregaste <strong className="font-semibold">{lastAdded}</strong>
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Slight, repeating tilt so the grid reads like stickers slapped on a wall.
const TILTS = ["-rotate-1", "rotate-[0.6deg]", "rotate-0", "rotate-1"] as const

export function SinglesSection() {
  return (
    <section id="de-a-uno" aria-labelledby="de-a-uno-title" className="shell py-20 sm:py-28">
      <Reveal className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground uppercase">Calcos sueltos</p>
          <h2 id="de-a-uno-title" className="mt-3 font-display text-5xl leading-[0.95] sm:text-7xl">
            De a{" "}
            <span className="inline-block -rotate-3 rounded-md bg-brand px-[0.12em] text-ink shadow-hard">uno.</span>
          </h2>
          <p className="mt-4 max-w-md text-muted-foreground">
            ¿No necesitás la plancha entera? Elegí tus favoritos y armá tu propio mix: se venden por unidad.
          </p>
        </div>
        <a
          href="#catalogo"
          className="group inline-flex items-center gap-1.5 self-start rounded-full text-sm font-semibold underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none sm:self-auto"
        >
          <ArrowRight className="size-4 rotate-180 transition-transform duration-200 group-hover:-translate-x-0.5" aria-hidden />
          Volver a las planchas
        </a>
      </Reveal>

      <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-4">
        {products.map((product, i) => (
          <li key={product.id} className={TILTS[i % TILTS.length]}>
            <Reveal delay={(i % 4) * 0.06} className="h-full">
              <ProductCard product={product} />
            </Reveal>
          </li>
        ))}
      </ul>

      <CartToast />
    </section>
  )
}
