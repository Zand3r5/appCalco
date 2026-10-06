import { ArrowRight, Scissors } from "lucide-react"
import { steps } from "@/lib/data"
import { CtaLink } from "@/components/ui/cta-link"
import { Reveal } from "./reveal"

export function HowItWorks() {
  return (
    <section aria-labelledby="como-title" className="shell grid gap-12 pb-20 sm:pb-28 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
      <Reveal className="self-start lg:sticky lg:top-28">
        <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground uppercase">Cómo funciona</p>
        <h2 id="como-title" className="mt-3 font-display text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
          Así de fácil se hace un calco.
        </h2>
        <p className="mt-5 max-w-md text-muted-foreground">
          Sin programas raros ni archivos complicados. Nos mandás lo que tengas y nuestro equipo lo deja listo para
          imprimir, con una prueba digital antes de producir.
        </p>
        <CtaLink href="#de-a-uno" className="mt-8">
          Empezar mi diseño
          <ArrowRight aria-hidden />
        </CtaLink>
      </Reveal>

      <ol className="relative space-y-5">
        <span
          aria-hidden
          className="absolute top-10 bottom-10 left-[2.75rem] border-l-2 border-dashed border-foreground/20 sm:left-[3.25rem]"
        />
        <Scissors
          aria-hidden
          className="absolute top-0 left-[2.75rem] size-5 -translate-x-1/2 rotate-90 text-muted-foreground sm:left-[3.25rem]"
        />
        {steps.map((step, i) => (
          <li key={step.n}>
            <Reveal delay={i * 0.1} className="relative flex gap-5 rounded-3xl border border-border bg-card p-6 sm:gap-7 sm:p-8">
              <span className="relative z-10 grid size-11 shrink-0 place-items-center rounded-full border-2 border-dashed border-foreground/30 bg-background font-display text-sm font-extrabold sm:size-14 sm:text-base">
                {step.n}
              </span>
              <div>
                <h3 className="font-display text-2xl font-bold tracking-tight">{step.title}</h3>
                <p className="mt-2 text-muted-foreground">{step.body}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  )
}
