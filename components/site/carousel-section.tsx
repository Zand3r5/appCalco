import { ArrowRight } from "lucide-react"
import { ThreeDPhotoCarousel } from "@/components/ui/3d-carousel"
import { CtaLink } from "@/components/ui/cta-link"
import { carouselCards } from "@/lib/data"
import { Reveal } from "./reveal"

export function CarouselSection() {
  return (
    <section id="catalogo" aria-labelledby="catalogo-title" className="px-2 pt-20 sm:px-4 sm:pt-28">
      <div className="relative overflow-hidden rounded-[32px] bg-ink py-16 text-paper sm:rounded-[48px] sm:py-24 dark:border dark:border-border dark:bg-card">
        <p
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 text-center font-display text-[24vw] leading-none font-extrabold tracking-tighter text-transparent select-none [-webkit-text-stroke:1.5px_rgb(255_255_255/0.07)]"
        >
          calcos
        </p>

        <div className="shell relative">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="font-mono text-xs tracking-[0.3em] text-brand uppercase">Catálogo 360°</p>
            <h2 id="catalogo-title" className="mt-4 font-display text-4xl font-extrabold tracking-tight text-balance sm:text-6xl">
              Girá, elegí, pegá.
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-balance text-paper/70">
              Diseños listos para tu termo, notebook, bici o heladera. Arrastrá el carrete o tocá cualquier calco para
              verlo de cerca.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-6">
            <ThreeDPhotoCarousel cards={carouselCards} />
          </Reveal>

          <div className="mt-12 flex justify-center">
            <CtaLink
              href="#nuevo"
              variant="brand"
              size="lg"
              className="shadow-[4px_4px_0_0_var(--pop)] hover:shadow-[6px_6px_0_0_var(--pop)]"
            >
              Ver lo nuevo
              <ArrowRight aria-hidden />
            </CtaLink>
          </div>
        </div>
      </div>
    </section>
  )
}
