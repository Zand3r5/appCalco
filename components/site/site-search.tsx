"use client"

import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { CornerDownLeft, Search, X } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { resolveHref } from "@/lib/navigation"
import { buildSearchIndex, searchCatalog, type SearchEntry, type SearchKind } from "@/lib/search"
import { siteConfig } from "@/lib/site-config"
import { cn } from "@/lib/utils"

const KIND_LABEL: Record<SearchKind, string> = { plancha: "Plancha", calco: "Calco", seccion: "Sección" }
const SUGGESTIONS = ["street", "mate", "aerosol", "personalizados", "por mayor"]
const LISTBOX_ID = "site-search-results"
const optionId = (entry: SearchEntry) => `site-search-${entry.id}`

/** Header search: a trigger button plus a Ctrl/⌘+K dialog over the catalog and the site sections. */
export function SiteSearch() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [activeIndex, setActiveIndex] = useState(0)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const pathname = usePathname()

  const index = useMemo(() => buildSearchIndex(), [])
  const results = useMemo(() => searchCatalog(query, index), [query, index])
  const active = results[Math.min(activeIndex, results.length - 1)]

  const open = () => setIsOpen(true)
  const close = () => {
    setIsOpen(false)
    setQuery("")
    setActiveIndex(0)
    triggerRef.current?.focus()
  }

  const updateQuery = (value: string) => {
    setQuery(value)
    setActiveIndex(0)
  }

  const goTo = (entry: SearchEntry) => {
    close()
    if (pathname === "/" && entry.href.startsWith("#")) {
      window.location.hash = entry.href
      return
    }
    router.push(resolveHref(entry.href))
  }

  useEffect(() => {
    const onShortcut = (e: globalThis.KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setIsOpen(true)
      }
    }
    window.addEventListener("keydown", onShortcut)
    return () => window.removeEventListener("keydown", onShortcut)
  }, [])

  useEffect(() => {
    if (!isOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previous
    }
  }, [isOpen])

  const pickSuggestion = (suggestion: string) => {
    updateQuery(suggestion)
    inputRef.current?.focus()
  }

  /** Escape closes from anywhere in the dialog and Tab cycles inside it (aria-modal focus trap). */
  const onDialogKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      e.preventDefault()
      return close()
    }
    if (e.key !== "Tab") return
    const focusables = dialogRef.current?.querySelectorAll<HTMLElement>("input, button, a[href]")
    if (!focusables?.length) return
    const first = focusables[0]
    const last = focusables[focusables.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }

  const onInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!results.length) return
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault()
      const step = e.key === "ArrowDown" ? 1 : -1
      const current = results.indexOf(active)
      const next = (current + step + results.length) % results.length
      setActiveIndex(next)
      document.getElementById(optionId(results[next]))?.scrollIntoView({ block: "nearest" })
    }
    if (e.key === "Enter" && active) {
      e.preventDefault()
      goTo(active)
    }
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={open}
        aria-label="Buscar (Ctrl+K)"
        className="flex h-11 min-w-11 items-center justify-center gap-2 rounded-full border border-border bg-card/70 px-3 text-sm text-muted-foreground transition-colors duration-150 hover:border-foreground/40 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none xl:w-56"
      >
        <Search className="size-4 shrink-0" aria-hidden />
        <span className="hidden xl:inline">Buscar calcos…</span>
        <kbd className="ml-auto hidden rounded-sm border border-border px-1.5 font-mono text-[10px] xl:inline">Ctrl K</kbd>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[70] bg-ink/60 px-4 pt-[12vh] backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={close}
          >
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-label="Buscar"
              onKeyDown={onDialogKeyDown}
              initial={{ y: -12, opacity: 0, rotate: -1 }}
              animate={{ y: 0, opacity: 1, rotate: -0.5 }}
              exit={{ y: -8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="relative mx-auto w-full max-w-xl rounded-md border-2 border-ink bg-card text-card-foreground shadow-hard dark:border-border"
            >
              <span aria-hidden className="tape -top-3 left-8 -rotate-6" />
              <div className="flex items-center gap-3 border-b-2 border-ink px-4 dark:border-border">
                <Search className="size-5 shrink-0 text-muted-foreground" aria-hidden />
                <input
                  ref={inputRef}
                  autoFocus
                  role="combobox"
                  aria-expanded={results.length > 0}
                  aria-controls={LISTBOX_ID}
                  aria-activedescendant={active ? optionId(active) : undefined}
                  aria-autocomplete="list"
                  aria-label="Buscar planchas, calcos o secciones"
                  value={query}
                  onChange={(e) => updateQuery(e.target.value)}
                  onKeyDown={onInputKeyDown}
                  placeholder="Buscá planchas, calcos o secciones…"
                  className="h-14 w-full bg-transparent font-display text-xl uppercase placeholder:font-sans placeholder:text-base placeholder:normal-case placeholder:text-muted-foreground focus:outline-none"
                />
                <button
                  type="button"
                  onClick={close}
                  aria-label="Cerrar búsqueda"
                  className="grid size-11 shrink-0 place-items-center rounded-full hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                  <X className="size-4" aria-hidden />
                </button>
              </div>

              <p role="status" className="sr-only">
                {query.trim() ? `${results.length} resultados` : ""}
              </p>

              <div className="max-h-[55vh] overflow-y-auto p-2">
                {!query.trim() && (
                  <div className="p-3">
                    <p className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">Probá con</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {SUGGESTIONS.map((suggestion) => (
                        <button
                          key={suggestion}
                          type="button"
                          onClick={() => pickSuggestion(suggestion)}
                          className="min-h-11 rounded-sm bg-muted px-3 py-2 font-display text-sm uppercase transition-transform hover:-rotate-2 hover:bg-brand hover:text-ink focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {query.trim() && results.length === 0 && (
                  <p className="p-4 text-sm text-muted-foreground">
                    No encontramos nada para “{query}”.{" "}
                    <a href={siteConfig.contact.whatsappUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-foreground underline underline-offset-4">
                      Preguntanos por WhatsApp
                    </a>
                    .
                  </p>
                )}

                {results.length > 0 && (
                  <ul id={LISTBOX_ID} role="listbox" aria-label="Resultados">
                    {results.map((entry) => {
                      const isActive = entry.id === active?.id
                      return (
                        <li
                          key={entry.id}
                          id={optionId(entry)}
                          role="option"
                          aria-selected={isActive}
                          onMouseEnter={() => setActiveIndex(results.indexOf(entry))}
                          onClick={() => goTo(entry)}
                          className={cn(
                            "flex cursor-pointer items-center gap-3 rounded-sm px-3 py-2.5",
                            isActive && "bg-ink text-paper dark:bg-foreground/10 dark:ring-1 dark:ring-brand"
                          )}
                        >
                          <span
                            className={cn(
                              "w-16 shrink-0 rounded-sm px-1.5 py-0.5 text-center font-mono text-[10px] tracking-wider uppercase",
                              isActive ? "bg-brand text-ink" : "bg-muted text-muted-foreground"
                            )}
                          >
                            {KIND_LABEL[entry.kind]}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate font-semibold">{entry.title}</span>
                            <span className={cn("block truncate text-xs", isActive ? "text-paper/70" : "text-muted-foreground")}>
                              {entry.subtitle}
                            </span>
                          </span>
                          {isActive && <CornerDownLeft className="size-4 shrink-0 text-brand" aria-hidden />}
                        </li>
                      )
                    })}
                  </ul>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
