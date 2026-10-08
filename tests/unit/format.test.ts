import { describe, expect, it } from "vitest"

import { formatARS } from "@/lib/data"

const normalize = (value: string) => value.replace(/ /g, " ")

describe("formatARS", () => {
  it("formats a price as ARS without decimals", () => {
    const result = formatARS(4900)

    expect(normalize(result)).toBe("$ 4.900")
  })

  it("formats zero", () => {
    const result = formatARS(0)

    expect(normalize(result)).toBe("$ 0")
  })

  it("uses thousands separators on large numbers", () => {
    const result = formatARS(1234567)

    expect(normalize(result)).toBe("$ 1.234.567")
  })

  it("rounds fractional amounts instead of showing decimals", () => {
    const result = formatARS(1570.4)

    expect(normalize(result)).toBe("$ 1.570")
    expect(result).not.toContain(",")
  })
})
