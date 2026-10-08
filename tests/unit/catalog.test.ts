import { describe, expect, it } from "vitest"

import { products, sheets, testimonials } from "@/lib/data"

const ALLOWED_BADGES = ["Nuevo", "Top ventas", "Edición limitada"]
const MIN_STICKERS_PER_SHEET = 1
const MAX_STICKERS_PER_SHEET = 7

const hasDuplicates = (values: readonly string[]) => new Set(values).size !== values.length

describe("products", () => {
  it("has unique ids", () => {
    const ids = products.map((product) => product.id)

    expect(hasDuplicates(ids)).toBe(false)
  })

  it("has a priceTo greater than priceFrom whenever priceTo is present", () => {
    const ranged = products.filter((product) => product.priceTo !== undefined)

    expect(ranged.length).toBeGreaterThan(0)
    for (const product of ranged) {
      expect(product.priceTo!, product.id).toBeGreaterThan(product.priceFrom)
    }
  })

  it("has positive integer prices", () => {
    const prices = products.flatMap((product) =>
      product.priceTo === undefined ? [product.priceFrom] : [product.priceFrom, product.priceTo],
    )

    for (const price of prices) {
      expect(Number.isInteger(price), `${price} is an integer`).toBe(true)
      expect(price).toBeGreaterThan(0)
    }
  })

  it("only uses known badges", () => {
    const badges = products.flatMap((product) => (product.badge === undefined ? [] : [product.badge]))

    expect(badges.length).toBeGreaterThan(0)
    for (const badge of badges) {
      expect(ALLOWED_BADGES).toContain(badge)
    }
  })
})

describe("sheets", () => {
  it("has unique ids", () => {
    const ids = sheets.map((sheet) => sheet.id)

    expect(hasDuplicates(ids)).toBe(false)
  })

  it("has unique codes", () => {
    const codes = sheets.map((sheet) => sheet.code)

    expect(hasDuplicates(codes)).toBe(false)
  })

  it("has between 1 and 7 stickers per sheet", () => {
    for (const sheet of sheets) {
      expect(sheet.stickers.length, sheet.id).toBeGreaterThanOrEqual(MIN_STICKERS_PER_SHEET)
      expect(sheet.stickers.length, sheet.id).toBeLessThanOrEqual(MAX_STICKERS_PER_SHEET)
    }
  })

  it("has a positive integer price", () => {
    for (const sheet of sheets) {
      expect(Number.isInteger(sheet.price), sheet.id).toBe(true)
      expect(sheet.price, sheet.id).toBeGreaterThan(0)
    }
  })
})

describe("testimonials", () => {
  it("has unique names", () => {
    const names = testimonials.map((testimonial) => testimonial.name)

    expect(hasDuplicates(names)).toBe(false)
  })

  it("does not expose social handles in names or texts", () => {
    for (const testimonial of testimonials) {
      expect(testimonial.name).not.toContain("@")
      expect(testimonial.text).not.toContain("@")
    }
  })

  it("has a city, a name and a non-empty text", () => {
    for (const testimonial of testimonials) {
      expect(testimonial.name.trim()).not.toBe("")
      expect(testimonial.city.trim()).not.toBe("")
      expect(testimonial.text.trim()).not.toBe("")
    }
  })
})
