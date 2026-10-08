"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowUpRight, ChevronDown } from "lucide-react"
import { mainNav, resolveHref, type NavItem, type NavLink } from "@/lib/navigation"
import { cn } from "@/lib/utils"

const PANEL_TRANSITION = { duration: 0.16, ease: [0.22, 1, 0.36, 1] } as const

const triggerClass =
  "inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium text-foreground/75 transition-colors duration-150 hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"

function externalProps(link: NavLink) {
  return link.external ? { target: "_blank", rel: "noopener noreferrer" } : {}
}

function DropdownPanel({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  return (
    <motion.div
      id={`${item.id}-panel`}
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={PANEL_TRANSITION}
      className="absolute top-full left-1/2 z-50 mt-3 w-80 -translate-x-1/2"
    >
      <div className="relative rounded-md border-2 border-ink bg-card p-2 shadow-hard dark:border-border">
        <span aria-hidden className="tape -top-3 left-1/2 -translate-x-1/2 -rotate-3" />
        <a
          href={resolveHref(item.href)}
          onClick={onNavigate}
          className="group/head flex items-start justify-between gap-3 rounded-sm bg-ink px-3 py-3 text-paper focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none dark:bg-muted"
        >
          <span>
            <span className="block font-display text-lg uppercase">{item.label}</span>
            <span className="block text-xs text-paper/70">{item.description}</span>
          </span>
          <ArrowUpRight className="size-4 shrink-0 text-brand transition-transform group-hover/head:rotate-45" aria-hidden />
        </a>
        <ul className="mt-1">
          {item.children?.map((child) => (
            <li key={child.id}>
              <a
                href={resolveHref(child.href)}
                onClick={onNavigate}
                {...externalProps(child)}
                className="block rounded-sm px-3 py-2.5 transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                <span className="block text-sm font-semibold">
                  {child.label}
                  {child.external && <span className="sr-only"> (se abre en otra pestaña)</span>}
                </span>
                {child.description && <span className="block text-xs text-muted-foreground">{child.description}</span>}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

/** Desktop nav bar built from `mainNav`; items with children open a dropdown on click or keyboard. */
export function MainNav({ className }: { className?: string }) {
  const [openId, setOpenId] = useState<string | null>(null)
  const navRef = useRef<HTMLElement>(null)
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({})

  useEffect(() => {
    if (!openId) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return
      setOpenId(null)
      triggerRefs.current[openId]?.focus()
    }
    const onPointerDown = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpenId(null)
    }
    window.addEventListener("keydown", onKey)
    document.addEventListener("pointerdown", onPointerDown)
    return () => {
      window.removeEventListener("keydown", onKey)
      document.removeEventListener("pointerdown", onPointerDown)
    }
  }, [openId])

  const close = () => setOpenId(null)

  return (
    <nav ref={navRef} aria-label="Principal" className={cn("hidden lg:block", className)}>
      <ul className="flex items-center gap-0.5">
        {mainNav.map((item) => {
          const isOpen = openId === item.id
          return (
            <li
              key={item.id}
              className="relative"
              onBlur={(e) => {
                if (isOpen && !e.currentTarget.contains(e.relatedTarget as Node | null)) setOpenId(null)
              }}
            >
              {item.children ? (
                <>
                  <button
                    ref={(el) => {
                      triggerRefs.current[item.id] = el
                    }}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`${item.id}-panel`}
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    className={cn(triggerClass, isOpen && "bg-muted text-foreground")}
                  >
                    {item.label}
                    <ChevronDown
                      className={cn("size-3.5 transition-transform duration-200", isOpen && "rotate-180")}
                      aria-hidden
                    />
                  </button>
                  <AnimatePresence>{isOpen && <DropdownPanel item={item} onNavigate={close} />}</AnimatePresence>
                </>
              ) : (
                <a href={resolveHref(item.href)} className={triggerClass}>
                  {item.label}
                </a>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
