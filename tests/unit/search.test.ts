import { describe, expect, it } from "vitest"

import { products, sheets } from "@/lib/data"
import { buildSearchIndex, normalizeText, searchCatalog } from "@/lib/search"

const index = buildSearchIndex()
const titles = (query: string, limit?: number) => searchCatalog(query, index, limit).map((entry) => entry.title)

describe("normalizeText", () => {
  it("lowercases and strips accents", () => {
    expect(normalizeText("Estrella ÁCIDA")).toBe("estrella acida")
  })

  it("collapses punctuation and extra spaces", () => {
    expect(normalizeText("  ¡Che!   Bubble ")).toBe("che bubble")
  })
})

describe("buildSearchIndex", () => {
  it("has one entry per sheet and per single sticker", () => {
    const kinds = index.map((entry) => entry.kind)

    expect(kinds.filter((kind) => kind === "plancha")).toHaveLength(sheets.length)
    expect(kinds.filter((kind) => kind === "calco")).toHaveLength(products.length)
  })

  it("includes the store sections so people can jump to them", () => {
    const sectionTitles = index.filter((entry) => entry.kind === "seccion").map((entry) => entry.title)

    expect(sectionTitles).toEqual(expect.arrayContaining(["Personalizados", "Por mayor"]))
  })

  it("never repeats an id", () => {
    const ids = index.map((entry) => entry.id)

    expect(new Set(ids).size).toBe(ids.length)
  })
})

describe("searchCatalog", () => {
  it("returns nothing for an empty or blank query", () => {
    expect(searchCatalog("", index)).toEqual([])
    expect(searchCatalog("   ", index)).toEqual([])
  })

  it("ignores case and accents", () => {
    expect(titles("acida")[0]).toBe("Estrella Ácida")
    expect(titles("CREW")[0]).toBe("Crew")
  })

  it("ranks an exact title match first", () => {
    expect(titles("fuego")[0]).toBe("Fuego")
  })

  it("requires every word of the query to match", () => {
    expect(titles("mate calle")[0]).toBe("Mate y Calle")
    expect(titles("mate calle")).not.toContain("Mate Amargo")
  })

  it("matches singular and plural forms", () => {
    expect(titles("planchas").length).toBeGreaterThan(0)
    expect(titles("calco").length).toBeGreaterThan(0)
  })

  it("finds stickers by what is drawn on them", () => {
    expect(titles("aerosol")).toContain("Lata de Aerosol")
  })

  it("respects the result limit", () => {
    expect(searchCatalog("a", index, 3)).toHaveLength(3)
  })

  it("returns nothing when no entry matches", () => {
    expect(searchCatalog("zzzz", index)).toEqual([])
  })
})
