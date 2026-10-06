import { ArrowDown } from "lucide-react"
import { StickerSheet } from "@/components/stickers/sticker-sheet"
import { ThreeDPhotoCarousel, type ThreeDCarouselCard } from "@/components/ui/3d-carousel"
import { CtaLink } from "@/components/ui/cta-link"
import { formatARS, sheets } from "@/lib/data"
import { Reveal } from "./reveal"

const sheetCards: ThreeDCarouselCard[] = sheets.map((sheet, i) => ({
  id: sheet.id,
  title: sheet.name,
  tag: `Plancha N.º ${sheet.code} · ${sheet.vibe}`,
  meta: `${sheet.stickers.length} calcos · ${formatARS(sheet.price)}`,
  content: <StickerSheet sheet={sheet} variant={i} />,
}))

export function CarouselSection() {
  return (
    <section id="catalogo" aria-labelledby="catalogo-title" className="px-2 pt-16 sm:px-4 sm:pt-24">
      <div className="bg-concrete relative overflow-hidden rounded-xl bg-ink py-16 text-paper [--grain-opacity:0.14] sm:rounded-2xl sm:py-24 dark:border dark:border-border dark:bg-card">
        <p
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 text-center font-display text-[30vw] leading-none tracking-tight text-transparent uppercase select-none [-webkit-text-stroke:1.5px_rgb(255_255_255/0.07)]"
        >
          planchas
        </p>
        <p
          aria-hidden
          className="pointer-events-none absolute top-8 right-6 rotate-[-8deg] font-hand text-2xl text-brand/80 select-none sm:top-12 sm:right-16 sm:text-4xl"
        >
          uknow crew
        </p>

        <div className="shell relative">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="font-mono text-xs tracking-[0.3em] text-brand uppercase">Planchas · 360°</p>
            <h2 id="catalogo-title" className="mt-4 font-display text-5xl leading-[0.95] text-balance sm:text-7xl">
              Girá, elegí, pegá.
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-balance text-paper/70">
              Planchas temáticas listas para llenar el termo, la notebook o la tabla. Arrastrá el carrete o tocá una
              plancha para verla de cerca.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-8">
            <ThreeDPhotoCarousel cards={sheetCards} ctaLabel="Ver de a uno" />
          </Reveal>

          <div className="mt-12 flex flex-col items-center gap-3">
            <p className="font-hand text-xl text-paper/70">¿Querés uno solo?</p>
            <CtaLink
              href="#de-a-uno"
              variant="brand"
              size="lg"
              className="shadow-[4px_4px_0_0_var(--pop)] hover:shadow-[6px_6px_0_0_var(--pop)]"
            >
              Calcos de a uno
              <ArrowDown aria-hidden />
            </CtaLink>
          </div>
        </div>
      </div>
    </section>
  )
}
