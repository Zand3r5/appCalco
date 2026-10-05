"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Menu, ShoppingBag, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { navLinks } from "@/lib/data"
import { CtaLink } from "@/components/ui/cta-link"
import { useCart } from "./cart-context"
import { ThemeToggle } from "./theme-toggle"

export function Logo({ className }: { className?: string }) {
  return (
    <a
      href="#top"
      aria-label="Tema Calcos, inicio"
      className={cn(
        "group inline-flex items-center gap-1.5 rounded-lg font-display text-xl font-extrabold tracking-tight focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
        className
      )}
    >
      <span>TEMA</span>
      <span className="inline-block -rotate-6 rounded-lg border-2 border-white bg-brand px-1.5 leading-tight text-ink shadow-[0_2px_6px_rgb(0_0_0/0.18)] transition-transform duration-200 group-hover:rotate-3">
        calcos
      </span>
    </a>
  )
}

const iconButton =
  "relative grid size-10 place-items-center rounded-full transition-colors duration-150 hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { count } = useCart()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-200",
        scrolled || open ? "border-border bg-background/80 backdrop-blur-md" : "border-transparent bg-transparent"
      )}
    >
      <div className="shell flex h-16 items-center gap-4">
        <Logo />

        <nav aria-label="Principal" className="mx-auto hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-foreground/75 transition-colors duration-150 hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1 lg:ml-0">
          <ThemeToggle />
          <a href="#nuevo" aria-label={`Carrito: ${count} productos`} className={iconButton}>
            <motion.span key={count} animate={count ? { rotate: [0, -14, 10, 0] } : undefined} transition={{ duration: 0.45 }}>
              <ShoppingBag className="size-[18px]" aria-hidden />
            </motion.span>
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 18 }}
                  className="absolute -top-0.5 -right-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-brand px-1 font-mono text-[11px] font-bold text-ink"
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </a>
          <CtaLink href="#personalizados" size="sm" className="ml-2 hidden sm:inline-flex">
            Diseñá el tuyo
          </CtaLink>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            className={cn(iconButton, "lg:hidden")}
          >
            {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Menú móvil"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-border lg:hidden"
          >
            <ul className="shell flex flex-col py-4">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ x: -12, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl py-3 font-display text-2xl font-bold focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
