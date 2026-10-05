"use client"

import { memo, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"
import {
  AnimatePresence,
  animate,
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  type MotionValue,
} from "framer-motion"
import Image from "next/image"
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react"
import { cn } from "@/lib/utils"

export const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect

/** SSR-safe media query: starts at `defaultValue` and syncs after mount to avoid hydration mismatches. */
export function useMediaQuery(query: string, defaultValue = false): boolean {
  const [matches, setMatches] = useState(defaultValue)

  useIsomorphicLayoutEffect(() => {
    const mql = window.matchMedia(query)
    const handleChange = () => setMatches(mql.matches)
    handleChange()
    mql.addEventListener("change", handleChange)
    return () => mql.removeEventListener("change", handleChange)
  }, [query])

  return matches
}

export type ThreeDCarouselCard = {
  src: string
  alt: string
  title: string
  tag?: string
}

const AUTO_ROTATE_DEG_PER_MS = 0.006
const RESUME_AFTER_MS = 2500
const DRAG_FACTOR = 0.22
const FLING_FACTOR = 0.05
const SPRING = { type: "spring", stiffness: 100, damping: 30, mass: 0.1 } as const
const OVERLAY_EASE = [0.32, 0.72, 0, 1] as const

type CylinderProps = {
  cards: ThreeDCarouselCard[]
  rotation: MotionValue<number>
  onSelect: (index: number) => void
  onPanStart: () => void
  onPanEnd: (velocityX: number) => void
  didPanRef: React.RefObject<boolean>
}

const Cylinder = memo(function Cylinder({ cards, rotation, onSelect, onPanStart, onPanEnd, didPanRef }: CylinderProps) {
  const isSmall = useMediaQuery("(max-width: 640px)")
  const cylinderWidth = isSmall ? 1700 : 2300
  const faceCount = cards.length
  const faceWidth = cylinderWidth / faceCount
  const radius = cylinderWidth / (2 * Math.PI)

  return (
    <div
      className="flex h-full items-center justify-center"
      style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
    >
      <motion.div
        className="relative flex h-full origin-center cursor-grab touch-pan-y justify-center active:cursor-grabbing"
        style={{ rotateY: rotation, width: cylinderWidth, transformStyle: "preserve-3d", willChange: "transform" }}
        onPointerDownCapture={() => {
          didPanRef.current = false
        }}
        onPanStart={onPanStart}
        onPan={(_, info) => rotation.set(rotation.get() + info.delta.x * DRAG_FACTOR)}
        onPanEnd={(_, info) => onPanEnd(info.velocity.x)}
      >
        {cards.map((card, i) => (
          <div
            key={card.src}
            className="absolute flex h-full origin-center items-center justify-center p-2"
            style={{
              width: `${faceWidth}px`,
              transform: `rotateY(${i * (360 / faceCount)}deg) translateZ(${radius}px)`,
            }}
          >
            <button
              type="button"
              onClick={() => {
                if (!didPanRef.current) onSelect(i)
              }}
              aria-label={`Ver ${card.title}`}
              className="group/face relative w-full rounded-2xl bg-white p-1.5 shadow-[0_10px_30px_-12px_rgb(0_0_0/0.45)] outline-none transition-transform duration-200 hover:-translate-y-1 focus-visible:ring-4 focus-visible:ring-ring"
            >
              <Image
                src={card.src}
                alt={card.alt}
                width={300}
                height={400}
                sizes="180px"
                draggable={false}
                className="pointer-events-none aspect-[3/4] w-full rounded-xl object-cover"
              />
            </button>
          </div>
        ))}
      </motion.div>
    </div>
  )
})

type ThreeDPhotoCarouselProps = {
  cards: ThreeDCarouselCard[]
  className?: string
  /** Slowly spins the cylinder when idle. Disabled automatically for reduced-motion users. */
  autoRotate?: boolean
  ctaLabel?: string
  ctaHref?: string
}

export function ThreeDPhotoCarousel({
  cards,
  className,
  autoRotate = true,
  ctaLabel = "Lo quiero",
  ctaHref = "#nuevo",
}: ThreeDPhotoCarouselProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [isHovered, setIsHovered] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const rotation = useMotionValue(0)
  const isDragging = useRef(false)
  const didPanRef = useRef(false)
  const resumeAt = useRef(0)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const step = 360 / cards.length
  const isOpen = activeIndex !== null
  const shouldSpin = autoRotate && !prefersReducedMotion && !isOpen && !isHovered

  useAnimationFrame((time, delta) => {
    if (!shouldSpin || isDragging.current || time < resumeAt.current) return
    rotation.set(rotation.get() - delta * AUTO_ROTATE_DEG_PER_MS)
  })

  const pauseAutoRotate = () => {
    resumeAt.current = performance.now() + RESUME_AFTER_MS
  }

  const rotateBy = (direction: 1 | -1) => {
    pauseAutoRotate()
    const target = Math.round((rotation.get() + direction * step) / step) * step
    animate(rotation, target, SPRING)
  }

  const handlePanStart = useCallback(() => {
    isDragging.current = true
    didPanRef.current = true
    rotation.stop()
  }, [rotation])

  const handlePanEnd = useCallback(
    (velocityX: number) => {
      isDragging.current = false
      resumeAt.current = performance.now() + RESUME_AFTER_MS
      animate(rotation, rotation.get() + velocityX * FLING_FACTOR, SPRING)
    },
    [rotation]
  )

  const close = useCallback(() => setActiveIndex(null), [])

  useEffect(() => {
    if (!isOpen) return
    closeButtonRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [isOpen, close])

  const active = activeIndex !== null ? cards[activeIndex] : null

  return (
    <div
      className={cn("relative", className)}
      onPointerEnter={(e) => e.pointerType === "mouse" && setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      <AnimatePresence>
        {active && (
          <motion.div
            key="overlay"
            className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/70 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: OVERLAY_EASE }}
            onClick={close}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={active.title}
              className="relative w-full max-w-sm rotate-[-1.5deg] rounded-[28px] bg-white p-3 text-ink shadow-2xl"
              initial={{ scale: 0.6, y: 40, rotate: -8 }}
              animate={{ scale: 1, y: 0, rotate: -1.5 }}
              exit={{ scale: 0.7, y: 30, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={active.src}
                alt={active.alt}
                width={600}
                height={600}
                sizes="(max-width: 420px) 90vw, 384px"
                className="aspect-square w-full rounded-[20px] object-cover"
              />
              <div className="flex items-end justify-between gap-3 px-2 pt-4 pb-2">
                <div>
                  {active.tag && (
                    <p className="font-mono text-[11px] tracking-widest text-neutral-500 uppercase">{active.tag}</p>
                  )}
                  <p className="font-display text-2xl font-extrabold">{active.title}</p>
                </div>
                <a
                  href={ctaHref}
                  onClick={close}
                  className="inline-flex shrink-0 items-center gap-1 rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-paper transition-transform duration-150 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
                >
                  {ctaLabel}
                  <ArrowUpRight className="size-4" aria-hidden />
                </a>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={close}
                aria-label="Cerrar"
                className="absolute -top-3 -right-3 grid size-10 place-items-center rounded-full bg-pop text-ink shadow-lg transition-transform duration-150 hover:rotate-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                <X className="size-5" aria-hidden />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative h-[300px] w-full overflow-hidden sm:h-[420px]">
        <Cylinder
          cards={cards}
          rotation={rotation}
          onSelect={setActiveIndex}
          onPanStart={handlePanStart}
          onPanEnd={handlePanEnd}
          didPanRef={didPanRef}
        />
      </div>

      <div className="mt-4 flex items-center justify-center gap-3">
        <CarouselControl label="Anterior" onClick={() => rotateBy(1)}>
          <ChevronLeft className="size-5" aria-hidden />
        </CarouselControl>
        <p className="font-mono text-xs tracking-widest text-current/70 uppercase select-none">Arrastrá o tocá un calco</p>
        <CarouselControl label="Siguiente" onClick={() => rotateBy(-1)}>
          <ChevronRight className="size-5" aria-hidden />
        </CarouselControl>
      </div>
    </div>
  )
}

function CarouselControl({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid size-11 place-items-center rounded-full border border-current/25 transition-colors duration-150 hover:bg-current/10 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none active:scale-95"
    >
      {children}
    </button>
  )
}
