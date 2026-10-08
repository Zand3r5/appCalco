import type { ReactNode } from "react"
import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { sheets } from "@/lib/data"
import { siteConfig } from "@/lib/site-config"
import { StickerArt } from "@/components/stickers/sticker-art"
import { StickerSheet } from "@/components/stickers/sticker-sheet"
import { Reveal } from "./reveal"

/** Dark sheet so it pops against the light paper tile. */
const FEATURED_SHEET = sheets.find((sheet) => sheet.id === "fuego") ?? sheets[0]

function BentoLink({ href, className, children }: { href: string; className?: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-3xl p-6 transition-transform duration-300 ease-out hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none sm:p-7",
        className
      )}
    >
      {children}
      <span className="absolute right-5 bottom-5 grid size-11 place-items-center rounded-full bg-current/10 backdrop-blur-sm transition-transform duration-300 group-hover:rotate-45">
        <ArrowUpRight className="size-5" aria-hidden />
      </span>
    </a>
  )
}

/** Stickers slapped on a street wall: the custom-order hero tile. */
function StreetWall() {
  return (
    <div aria-hidden className="absolute inset-0">
      <StickerArt
        kind="tag"
        shadow={false}
        className="absolute top-8 left-4 w-40 -rotate-6 transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:-rotate-3 sm:w-52"
      />
      <StickerArt
        kind="logo"
        shadow={false}
        className="absolute top-6 right-6 w-36 rotate-6 transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-rotate-3 sm:w-48"
      />
      <StickerArt
        kind="crown"
        shadow={false}
        className="absolute top-[44%] left-[38%] w-20 rotate-12 transition-transform duration-500 ease-out group-hover:rotate-[20deg] sm:w-24"
      />
      <StickerArt
        kind="spray"
        shadow={false}
        className="absolute top-[38%] -right-4 w-28 -rotate-12 transition-transform duration-700 ease-out group-hover:-translate-x-2 sm:w-32"
      />
    </div>
  )
}

/** A themed sheet taped to the tile, tilted and cropped by the edge. */
function TapedSheet() {
  return (
    <div
      aria-hidden
      className="absolute top-5 -right-8 w-40 rotate-[9deg] transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:rotate-[4deg] sm:w-44"
    >
      <span className="tape -top-2.5 left-1/2 z-10 -translate-x-1/2 rotate-[-5deg]" />
      <StickerSheet sheet={FEATURED_SHEET} variant={1} />
    </div>
  )
}

export function CategoriesBento() {
  return (
    <section aria-labelledby="categorias-title" className="shell py-20 sm:py-28">
      <Reveal className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground uppercase">Categorías</p>
          <h2 id="categorias-title" className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            Elegí tu calco.
          </h2>
        </div>
        <p className="max-w-sm text-muted-foreground">
          Desde un sticker suelto hasta miles para tu marca. Todo impreso y troquelado por nosotros.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-[270px_270px]">
        <Reveal className="sm:col-span-2 lg:row-span-2">
          <BentoLink href="#personalizados" className="bg-concrete min-h-[420px] bg-ink text-white [--grain-opacity:0.16]">
            <StreetWall />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
            <div className="relative mt-auto max-w-sm pr-14">
              <span className="inline-block rounded-full bg-pop px-3 py-1 text-xs font-bold text-ink">El más pedido</span>
              <h3 className="mt-3 font-display text-4xl font-extrabold tracking-tight">Personalizados</h3>
              <p className="mt-2 text-white/80">Tu logo, tu foto o tu idea, troquelado a medida. Desde {siteConfig.claims.customMinUnits} unidades.</p>
            </div>
          </BentoLink>
        </Reveal>

        <Reveal delay={0.05} className="sm:col-span-2">
          <BentoLink href="#empresas" className="min-h-[240px] bg-brand text-ink">
            <StickerArt
              kind="badge24"
              className="absolute right-20 -bottom-10 w-36 rotate-12 transition-transform duration-500 group-hover:rotate-[30deg] sm:w-44"
            />
            <div className="relative max-w-[60%]">
              <h3 className="font-display text-3xl font-extrabold tracking-tight">Por mayor</h3>
              <p className="mt-2 text-ink/75">Precios escalonados para marcas, emprendimientos y eventos.</p>
            </div>
          </BentoLink>
        </Reveal>

        <Reveal delay={0.1}>
          <BentoLink href="#catalogo" className="bg-concrete min-h-[240px] bg-paper text-ink">
            <TapedSheet />
            <div className="absolute inset-0 bg-gradient-to-t from-paper via-paper/75 to-transparent" />
            <div className="relative mt-auto pr-12">
              <h3 className="font-display text-2xl font-extrabold tracking-tight">Planchas temáticas</h3>
              <p className="mt-1 text-sm text-ink/75">Muchos calcos, una sola plancha.</p>
            </div>
          </BentoLink>
        </Reveal>

        <Reveal delay={0.15}>
          <BentoLink href="#de-a-uno" className="min-h-[240px] bg-pop text-ink">
            <StickerArt
              kind="sun"
              className="absolute -top-6 -right-6 w-36 transition-transform duration-700 ease-out group-hover:rotate-90"
            />
            <div className="relative mt-auto pr-12">
              <h3 className="font-display text-2xl font-extrabold tracking-tight">Edición limitada</h3>
              <p className="mt-1 text-sm text-ink/75">Suncatchers de primavera, hasta agotar stock.</p>
            </div>
          </BentoLink>
        </Reveal>
      </div>
    </section>
  )
}
