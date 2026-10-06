import { Clock, CreditCard, Droplets, Truck } from "lucide-react"
import { Marquee } from "@/components/ui/marquee"

const FEATURES = [
  { icon: Truck, title: "Envíos a todo el país y al mundo" },
  { icon: Clock, title: "Listos en máx. 4 días hábiles" },
  { icon: CreditCard, title: "Todos los medios de pago" },
  { icon: Droplets, title: "Vinilo premium: agua, sol y rayones" },
]

const SHOUTS = ["Pegalo donde quieras", "Hecho en el barrio", "Uknow calcos", "Planchas y de a uno"]

/** Two crossed hazard-tape marquees: the benefits on top, brand shouts underneath. */
export function FeaturesStrip() {
  return (
    <section aria-label="Beneficios" className="relative z-10 -my-2 overflow-hidden py-10 sm:py-14">
      <div aria-hidden className="absolute inset-x-[-5%] top-1/2 -translate-y-1/2 rotate-[3deg] bg-ink py-2.5 text-paper">
        <Marquee duration={46} gap="2.5rem" reverse>
          {SHOUTS.map((shout) => (
            <span key={shout} className="flex items-center gap-10 font-display text-lg whitespace-nowrap uppercase">
              {shout}
              <span className="text-pop">✕</span>
            </span>
          ))}
        </Marquee>
      </div>

      <div className="relative -rotate-2 border-y-4 border-ink bg-brand py-3 text-ink [background-image:repeating-linear-gradient(-45deg,transparent_0_14px,rgb(0_0_0/0.06)_14px_28px)]">
        <Marquee duration={38} gap="3rem" pauseOnHover>
          {FEATURES.map(({ icon: Icon, title }) => (
            <span key={title} className="flex items-center gap-3 font-display text-xl whitespace-nowrap uppercase sm:text-2xl">
              <Icon className="size-5 shrink-0" aria-hidden />
              {title}
              <span aria-hidden className="ml-9">
                ★
              </span>
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  )
}
