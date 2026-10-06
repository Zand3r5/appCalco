import { Check, Mail, MessageCircle } from "lucide-react"
import { WHATSAPP_URL } from "@/lib/data"
import { StickerArt } from "@/components/stickers/sticker-art"
import { CtaLink } from "@/components/ui/cta-link"
import { Reveal } from "./reveal"

const PERKS = ["Asesoramiento de diseño sin cargo", "Precios por volumen", "Entrega con fecha acordada"]
const WHATSAPP_B2B = `${WHATSAPP_URL}?text=${encodeURIComponent("¡Hola! Quiero un presupuesto para un pedido por mayor.")}`

export function B2BCta() {
  return (
    <section id="empresas" aria-labelledby="empresas-title" className="shell pb-20 sm:pb-28">
      <Reveal className="relative overflow-hidden rounded-[36px] bg-brand px-6 py-12 text-ink sm:px-12 sm:py-16 lg:px-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgb(0_0_0/0.08)_1.5px,transparent_1.5px)] [background-size:22px_22px]"
        />
        <div className="relative grid items-center gap-10 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="font-mono text-xs tracking-[0.3em] uppercase">Empresas · Agencias · Organizaciones</p>
            <h2 id="empresas-title" className="mt-4 font-display text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
              ¿Necesitás un pedido grande con fecha de entrega?
            </h2>
            <p className="mt-5 max-w-lg text-ink/75">
              Contanos qué necesitás y un miembro de nuestro equipo te asesora: materiales, tamaños, cantidades y
              tiempos.
            </p>
            <ul className="mt-6 space-y-2">
              {PERKS.map((perk) => (
                <li key={perk} className="flex items-center gap-2.5 font-medium">
                  <span className="grid size-6 place-items-center rounded-full bg-ink text-paper">
                    <Check className="size-3.5" aria-hidden />
                  </span>
                  {perk}
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-wrap gap-3">
              <CtaLink
                href={WHATSAPP_B2B}
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                className="bg-ink text-paper shadow-[4px_4px_0_0_#fff] hover:shadow-[6px_6px_0_0_#fff] dark:bg-ink dark:text-paper"
              >
                <MessageCircle aria-hidden />
                Hablemos por WhatsApp
              </CtaLink>
              <CtaLink
                href="mailto:ventas@uknowcalcos.com.ar?subject=Presupuesto%20por%20mayor"
                size="lg"
                variant="outline"
                className="border-ink text-ink hover:bg-ink hover:text-paper"
              >
                <Mail aria-hidden />
                Pedir presupuesto
              </CtaLink>
            </div>
          </div>

          <div aria-hidden className="relative mx-auto hidden aspect-square w-full max-w-[340px] sm:block">
            <StickerArt kind="logo" className="absolute inset-x-[6%] top-[22%] w-[88%] -rotate-12" />
            <StickerArt kind="logo" className="absolute inset-x-[6%] top-[14%] w-[88%] rotate-6" />
            <StickerArt kind="logo" className="absolute inset-x-[6%] top-[6%] w-[88%] -rotate-3 animate-float" />
            <span className="absolute right-0 bottom-4 rotate-6 rounded-xl bg-ink px-3 py-1.5 font-mono text-sm font-bold text-pop">
              x 1.000
            </span>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
