import { describe, expect, it } from "vitest"

import {
  PAGE_SECTIONS,
  allNavLinks,
  footerInfo,
  footerNav,
  legalLinks,
  legalPages,
  mainNav,
  resolveHref,
} from "@/lib/navigation"
import { siteConfig } from "@/lib/site-config"

const internalHrefs = () => allNavLinks().map((link) => link.href).filter((href) => !/^(https?:|mailto:)/.test(href))

describe("mainNav", () => {
  it("has the five top-level sections of the store in order", () => {
    const labels = mainNav.map((item) => item.label)

    expect(labels).toEqual(["Planchas", "De a uno", "Personalizados", "Por mayor", "Ayuda"])
  })

  it("gives every top-level item a short description for the dropdown", () => {
    const missing = mainNav.filter((item) => !item.description?.trim())

    expect(missing).toEqual([])
  })
})

describe("navigation ids", () => {
  it("never repeats an id across menu, footer and legal links", () => {
    const ids = allNavLinks().map((link) => link.id)

    expect(new Set(ids).size).toBe(ids.length)
  })
})

describe("navigation hrefs", () => {
  it("points every #anchor at a section that exists on the home page", () => {
    const anchors = internalHrefs()
      .filter((href) => href.startsWith("#"))
      .map((href) => href.slice(1))

    const unknown = anchors.filter((id) => !(PAGE_SECTIONS as readonly string[]).includes(id))

    expect(unknown).toEqual([])
  })

  it("points every internal path at a page that is defined", () => {
    const paths = internalHrefs().filter((href) => href.startsWith("/"))
    const defined = legalPages.map((page) => `/legales/${page.slug}`)

    const unknown = paths.filter((path) => !defined.includes(path))

    expect(unknown).toEqual([])
  })

  it("opens external links only over https or mailto", () => {
    const external = allNavLinks()
      .map((link) => link.href)
      .filter((href) => /^[a-z]+:/.test(href))

    const unsafe = external.filter((href) => !/^(https:|mailto:)/.test(href))

    expect(unsafe).toEqual([])
  })
})

describe("resolveHref", () => {
  it("anchors section links to the home page so they work from any route", () => {
    expect(resolveHref("#catalogo")).toBe("/#catalogo")
  })

  it("leaves paths and external links untouched", () => {
    expect(resolveHref("/legales/terminos")).toBe("/legales/terminos")
    expect(resolveHref("https://wa.me/123")).toBe("https://wa.me/123")
    expect(resolveHref("mailto:hola@x.com")).toBe("mailto:hola@x.com")
  })
})

describe("footerNav", () => {
  it("groups links in titled columns that are never empty", () => {
    const empty = footerNav.filter((column) => !column.title || column.links.length === 0)

    expect(footerNav.length).toBeGreaterThanOrEqual(3)
    expect(empty).toEqual([])
  })
})

describe("legal links (Argentine e-commerce requirements)", () => {
  it("includes the Botón de arrepentimiento", () => {
    const labels = legalLinks.map((link) => link.label.toLowerCase())

    expect(labels.some((label) => label.includes("arrepentimiento"))).toBe(true)
  })

  it("links to Defensa del Consumidor on an official gob.ar site", () => {
    const consumer = legalLinks.find((link) => link.id === "defensa-consumidor")

    expect(consumer?.href).toMatch(/^https:\/\/www\.argentina\.gob\.ar\//)
  })

  it("defines a page with content for every internal legal link", () => {
    const withoutBody = legalPages.filter((page) => page.paragraphs.length === 0)

    expect(withoutBody).toEqual([])
  })
})

describe("footerInfo", () => {
  it("builds the copyright line with the given year and the brand", () => {
    const line = footerInfo.copyright(2031)

    expect(line).toBe(`© 2031 ${siteConfig.brandName}. Todos los derechos reservados.`)
  })

  it("lists the important business data shown in the footer", () => {
    const labels = footerInfo.facts.map((fact) => fact.label)

    expect(labels).toEqual(expect.arrayContaining(["Razón social", "CUIT", "Horario", "Envíos", "Medios de pago"]))
  })
})
