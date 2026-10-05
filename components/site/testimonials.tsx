import { Star } from "lucide-react"
import { testimonials } from "@/lib/data"
import { Marquee } from "@/components/ui/marquee"
import { Reveal } from "./reveal"

type Testimonial = (typeof testimonials)[number]

const AVATAR_TINTS = ["bg-brand", "bg-pop", "bg-accent"]

function TestimonialCard({ item, index }: { item: Testimonial; index: number }) {
  return (
    <figure className="flex w-[300px] shrink-0 flex-col rounded-3xl border border-border bg-card p-6 sm:w-[360px]">
      <div className="flex text-pop" aria-label="5 de 5 estrellas">
        {Array.from({ length: 5 }, (_, i) => (
          <Star key={i} className="size-4 fill-current stroke-ink/30" aria-hidden />
        ))}
      </div>
      <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed">“{item.text}”</blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        <span
          aria-hidden
          className={`grid size-10 place-items-center rounded-full font-display font-extrabold text-ink ${AVATAR_TINTS[index % AVATAR_TINTS.length]}`}
        >
          {item.name[0]}
        </span>
        <span>
          <span className="block font-semibold">{item.name}</span>
          <span className="block font-mono text-xs text-muted-foreground">{item.handle}</span>
        </span>
      </figcaption>
    </figure>
  )
}

export function Testimonials() {
  const half = Math.ceil(testimonials.length / 2)
  const rows = [testimonials.slice(0, half), testimonials.slice(half)]

  return (
    <section id="opiniones" aria-labelledby="opiniones-title" className="overflow-hidden pb-20 sm:pb-28">
      <Reveal className="shell max-w-2xl text-center">
        <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground uppercase">Opiniones reales</p>
        <h2 id="opiniones-title" className="mt-3 font-display text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
          Clientes felices, calcos pegados.
        </h2>
      </Reveal>

      <div className="mt-12 space-y-4 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        {rows.map((row, r) => (
          <Marquee key={r} duration={55 + r * 10} gap="1rem" reverse={r === 1} pauseOnHover>
            {row.map((item, i) => (
              <TestimonialCard key={item.handle} item={item} index={i + r} />
            ))}
          </Marquee>
        ))}
      </div>
    </section>
  )
}
