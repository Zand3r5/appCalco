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
    <article className="group flex h-full flex-col rounded-3xl border border-border bg-card p-2.5 transition-shadow duration-200 hover:shadow-[0_24px_40px_-28px_rgb(0_0_0/0.45)]">
      <div
        className="relative grid aspect-square place-items-center overflow-hidden rounded-[18px] bg-[radial-gradient(rgb(0_0_0/0.06)_1px,transparent_1px)] [background-size:14px_14px]"
        style={{ backgroundColor: product.tint }}
      >
        {product.badge && (
          <span className="absolute top-3 left-3 rounded-full bg-ink px-2.5 py-1 text-[11px] font-semibold text-paper">
            {product.badge}
          </span>
        )}
        <StickerArt
          kind={product.art}
          title={product.name}
          className="w-[62%] transition-transform duration-300 ease-out group-hover:-translate-y-1.5 group-hover:scale-105 group-hover:-rotate-6"
        />
      </div>
      <div className="flex flex-1 flex-col px-1.5 pt-3 pb-1">
        <h3 className="font-display text-base leading-tight font-bold sm:text-lg">{product.name}</h3>
        <p className="mt-1 font-mono text-sm text-muted-foreground">{priceLabel(product)}</p>
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
              {added ? "¡Agregado!" : "Agregar"}
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

export function NewArrivals() {
  return (
    <section id="nuevo" aria-labelledby="nuevo-title" className="shell py-20 sm:py-28">
      <Reveal className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground uppercase">Recién salidos</p>
          <h2 id="nuevo-title" className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            Lo nuevo.
          </h2>
        </div>
        <a
          href="#catalogo"
          className="group inline-flex items-center gap-1.5 self-start rounded-full text-sm font-semibold underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none sm:self-auto"
        >
          Ver todo el catálogo
          <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
        </a>
      </Reveal>

      <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {products.map((product, i) => (
          <li key={product.id}>
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
