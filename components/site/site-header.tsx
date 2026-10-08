"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Menu, ShoppingBag, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { mainNav, resolveHref } from "@/lib/navigation"
import { CtaLink } from "@/components/ui/cta-link"
import { useCart } from "./cart-context"
import { Logo } from "./logo"
import { MainNav } from "./main-nav"
import { SiteSearch } from "./site-search"
import { ThemeToggle } from "./theme-toggle"

const iconButton =
  "relative grid size-11 place-items-center rounded-full transition-colors duration-150 hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"

function CartLink() {
  const { count } = useCart()
  return (
    <a
      href={resolveHref("#de-a-uno")}
      aria-label={`Carrito: ${count} ${count === 1 ? "producto" : "productos"}`}
      className={iconButton}
    >
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
  )
}

function MobileMenu({ onNavigate }: { onNavigate: () => void }) {
  return (
    <motion.nav
      id="mobile-menu"
      aria-label="Menú móvil"
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden border-t border-border lg:hidden"
    >
      <ul className="shell flex flex-col gap-1 py-4">
        {mainNav.map((item, i) => (
          <motion.li key={item.id} initial={{ x: -12, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.04 * i }}>
            <a
              href={resolveHref(item.href)}
              onClick={onNavigate}
              className="block rounded-sm py-2 font-display text-3xl uppercase focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              {item.label}
            </a>
            {item.children && (
              <ul className="mb-2 flex flex-wrap gap-2">
                {item.children.map((child) => (
                  <li key={child.id}>
                    <a
                      href={resolveHref(child.href)}
                      onClick={onNavigate}
                      {...(child.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="inline-flex min-h-11 items-center rounded-sm bg-muted px-3 text-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                    >
                      {child.label}
                      {child.external && <span className="sr-only"> (se abre en otra pestaña)</span>}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </motion.li>
        ))}
      </ul>
    </motion.nav>
  )
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  const closeMenu = () => {
    setOpen(false)
    menuButtonRef.current?.focus()
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return
      setOpen(false)
      menuButtonRef.current?.focus()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-200",
        scrolled || open ? "border-border bg-background/85 backdrop-blur-md" : "border-transparent bg-transparent"
      )}
    >
      <a
        href="#contenido"
        className="sr-only rounded-sm bg-ink px-3 py-2 text-paper focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[80]"
      >
        Saltar al contenido
      </a>

      <div className="shell flex h-16 items-center gap-3">
        <Logo />
        <MainNav className="mx-auto" />

        <div className="ml-auto flex items-center gap-1 lg:ml-0">
          <SiteSearch />
          <ThemeToggle />
          <CartLink />
          <CtaLink href={resolveHref("#personalizados")} size="sm" className="ml-2 hidden sm:inline-flex">
            Diseñá el tuyo
          </CtaLink>
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => (open ? closeMenu() : setOpen(true))}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            className={cn(iconButton, "lg:hidden")}
          >
            {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>{open && <MobileMenu onNavigate={() => setOpen(false)} />}</AnimatePresence>
    </header>
  )
}
