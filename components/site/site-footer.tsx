import { AtSign, Mail, MessageCircle } from "lucide-react"
import { WHATSAPP_URL } from "@/lib/data"
import { Logo } from "./site-header"

const COLUMNS = [
  {
    title: "Tienda",
    links: [
      { label: "Personalizados", href: "#personalizados" },
      { label: "Por mayor", href: "#empresas" },
      { label: "Catálogo", href: "#catalogo" },
      { label: "Lo nuevo", href: "#nuevo" },
    ],
  },
  {
    title: "Ayuda",
    links: [
      { label: "Preguntas frecuentes", href: "#faq" },
      { label: "Opiniones", href: "#opiniones" },
      { label: "Cómo funciona", href: "#como-title" },
    ],
  },
]

const linkClass =
  "rounded text-paper/70 transition-colors duration-150 hover:text-paper focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"

export function SiteFooter() {
  return (
    <footer className="overflow-hidden bg-ink text-paper dark:border-t dark:border-border dark:bg-card">
      <div className="shell grid gap-10 pt-16 pb-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-paper/70">
            Stickers personalizados de vinilo premium. Hechos en Argentina, con mucho mate de por medio.
          </p>
        </div>

        {COLUMNS.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <p className="font-mono text-xs tracking-[0.25em] text-paper/50 uppercase">{col.title}</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {col.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className={linkClass}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div>
          <p className="font-mono text-xs tracking-[0.25em] text-paper/50 uppercase">Contacto</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={`${linkClass} inline-flex items-center gap-2`}>
                <MessageCircle className="size-4" aria-hidden /> WhatsApp
              </a>
            </li>
            <li>
              <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className={`${linkClass} inline-flex items-center gap-2`}>
                <AtSign className="size-4" aria-hidden /> Instagram
              </a>
            </li>
            <li>
              <a href="mailto:hola@temacalcos.com.ar" className={`${linkClass} inline-flex items-center gap-2`}>
                <Mail className="size-4" aria-hidden /> hola@temacalcos.com.ar
              </a>
            </li>
          </ul>
        </div>
      </div>

      <p
        aria-hidden
        className="shell -mb-[0.18em] text-center font-display text-[clamp(4rem,23vw,19rem)] leading-[0.85] font-extrabold tracking-tighter whitespace-nowrap text-paper/[0.07] select-none"
      >
        calcos
      </p>

      <div className="border-t border-paper/10">
        <div className="shell flex flex-col justify-between gap-2 py-5 text-xs text-paper/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Tema Calcos. Todos los derechos reservados.</p>
          <p>Hecho con ✦ en Argentina</p>
        </div>
      </div>
    </footer>
  )
}
