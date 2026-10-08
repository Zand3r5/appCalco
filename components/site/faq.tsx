import { Plus } from "lucide-react"
import { faqs } from "@/lib/data"
import { siteConfig } from "@/lib/site-config"
import { Reveal } from "./reveal"

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="shell grid gap-10 pb-24 sm:pb-32 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
      <Reveal>
        <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground uppercase">Ayuda</p>
        <h2 id="faq-title" className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
          Preguntas frecuentes.
        </h2>
        <p className="mt-5 text-muted-foreground">
          ¿Te quedó alguna duda?{" "}
          <a
            href={siteConfig.contact.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-foreground underline decoration-brand decoration-2 underline-offset-4"
          >
            Escribinos por WhatsApp
          </a>
          .
        </p>
      </Reveal>

      <Reveal delay={0.1} className="divide-y divide-border rounded-3xl border border-border bg-card">
        {faqs.map((faq) => (
          <details key={faq.q} className="group px-6 sm:px-8 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-xl py-5 font-display text-lg font-bold focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none">
              {faq.q}
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-muted transition-transform duration-200 group-open:rotate-45 group-open:bg-brand group-open:text-ink">
                <Plus className="size-4" aria-hidden />
              </span>
            </summary>
            <p className="pb-6 text-muted-foreground">{faq.a}</p>
          </details>
        ))}
      </Reveal>
    </section>
  )
}
