import Link from "next/link"
import { ArrowUpRight, QrCode } from "lucide-react"
import { footerInfo, footerNav, legalLinks, resolveHref, type NavLink } from "@/lib/navigation"
import { siteConfig } from "@/lib/site-config"
import { Logo } from "./logo"

const linkClass =
  "inline-flex items-center gap-1 rounded text-paper/70 transition-colors duration-150 hover:text-paper focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"

function FooterLink({ link }: { link: NavLink }) {
  if (link.external) {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
        {link.label}
        <ArrowUpRight className="size-3" aria-hidden />
        <span className="sr-only">(se abre en otra pestaña)</span>
      </a>
    )
  }
  if (link.href.startsWith("mailto:")) {
    return (
      <a href={link.href} className={linkClass}>
        {link.label}
      </a>
    )
  }
  return (
    <Link href={resolveHref(link.href)} className={linkClass}>
      {link.label}
    </Link>
  )
}

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-concrete overflow-hidden bg-ink text-paper [--grain-opacity:0.12] dark:border-t dark:border-border dark:bg-card">
      <div className="shell grid gap-10 pt-16 pb-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-paper/70">
            Stickers de vinilo troquelados con onda street. Planchas, calcos de a uno y personalizados para tu marca.
          </p>
          <p className="mt-5 inline-block -rotate-2 font-hand text-xl text-brand">pegalo donde quieras</p>
        </div>

        {footerNav.map((column) => (
          <nav key={column.id} aria-label={column.title}>
            <p className="font-mono text-xs tracking-[0.25em] text-paper/60 uppercase">{column.title}</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {column.links.map((link) => (
                <li key={link.id}>
                  <FooterLink link={link} />
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="shell">
        {siteConfig.isMock && (
          <p className="mb-3 inline-block -rotate-1 rounded-sm bg-pop px-2.5 py-1 text-xs font-semibold text-ink">
            Datos de muestra: contacto, CUIT y opiniones son provisorios.
          </p>
        )}
        <div className="grid gap-6 rounded-md border border-paper/15 p-5 sm:grid-cols-[1fr_auto] sm:p-6">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
            {footerInfo.facts.map((fact) => (
              <div key={fact.label}>
                <dt className="font-mono text-[11px] tracking-[0.2em] text-paper/60 uppercase">{fact.label}</dt>
                <dd className="mt-0.5 text-paper/85">{fact.value}</dd>
              </div>
            ))}
          </dl>
          {/* MOCK: replace with the official ARCA "Data fiscal" QR once the business is registered. */}
          <div className="flex items-center gap-3 self-start rounded-sm bg-paper/5 p-3 sm:flex-col sm:text-center">
            <QrCode className="size-10 text-paper/60" aria-hidden />
            <p className="max-w-[9rem] text-[11px] leading-tight text-paper/60">Data fiscal (ARCA) · próximamente</p>
          </div>
        </div>

        <nav aria-label="Legales" className="mt-6">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-xs">
            {legalLinks.map((link) => (
              <li key={link.id}>
                <FooterLink link={link} />
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <p
        aria-hidden
        className="shell mt-8 -mb-[0.18em] text-center font-display text-[clamp(4rem,23vw,19rem)] leading-[0.85] tracking-tighter whitespace-nowrap text-paper/[0.07] uppercase select-none"
      >
        calcos
      </p>

      <div className="border-t border-paper/10">
        <div className="shell flex flex-col justify-between gap-2 py-5 text-xs text-paper/60 sm:flex-row">
          <p>{footerInfo.copyright(year)}</p>
          <p>
            Hecho con <span aria-hidden>✦</span> en Argentina
          </p>
        </div>
      </div>
    </footer>
  )
}
