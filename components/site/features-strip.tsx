import { Clock, CreditCard, Droplets, Truck } from "lucide-react"

const FEATURES = [
  { icon: Truck, title: "Envíos a todo el país", body: "Y al mundo, con seguimiento." },
  { icon: Clock, title: "Listos en 4 días hábiles", body: "Como máximo, desde que aprobás." },
  { icon: CreditCard, title: "Todos los medios de pago", body: "Tarjeta, transferencia y más." },
  { icon: Droplets, title: "Vinilo premium", body: "Resistente al agua, sol y rayones." },
]

export function FeaturesStrip() {
  return (
    <section aria-label="Beneficios" className="shell -mt-8 relative z-10">
      <ul className="grid grid-cols-1 overflow-hidden rounded-3xl border border-border bg-card shadow-[0_24px_48px_-36px_rgb(0_0_0/0.4)] sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map(({ icon: Icon, title, body }, i) => (
          <li
            key={title}
            className={
              "flex items-center gap-4 p-5 sm:p-6 " +
              (i > 0 ? "border-t border-border sm:border-t-0 " : "") +
              (i % 2 === 1 ? "sm:border-l " : "") +
              (i >= 2 ? "sm:border-t lg:border-t-0 " : "") +
              (i === 2 ? "lg:border-l" : "")
            }
          >
            <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-accent text-accent-foreground">
              <Icon className="size-5" aria-hidden />
            </span>
            <span>
              <span className="block font-semibold">{title}</span>
              <span className="block text-sm text-muted-foreground">{body}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
