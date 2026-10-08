import type { StickerKind } from "@/components/stickers/sticker-art"
import { formatARS, products, sheets } from "./data"
import { mainNav } from "./navigation"

export type SearchKind = "plancha" | "calco" | "seccion"

export type SearchEntry = {
  id: string
  kind: SearchKind
  title: string
  subtitle: string
  href: string
  keywords: string[]
}

/** What each drawing shows, so "aerosol" or "corona" find stickers whose name doesn't say it. */
const ART_KEYWORDS: Record<StickerKind, string[]> = {
  sun: ["sol", "suncatcher"],
  mate: ["mate", "yerba", "argentina"],
  che: ["che", "globo", "argentina"],
  heart: ["corazon", "amor"],
  badge24: ["calidad", "insignia"],
  flower: ["flor", "primavera"],
  butterfly: ["mariposa", "primavera"],
  bolt: ["rayo", "re piola"],
  smiley: ["carita", "sonrisa", "todo bien"],
  logo: ["logo", "marca", "personalizado"],
  spray: ["aerosol", "lata", "graffiti"],
  crown: ["corona", "rey"],
  flame: ["fuego", "llama"],
  eye: ["ojo"],
  star: ["estrella"],
  tag: ["tag", "graffiti", "firma"],
  drip: ["chorreado", "carita"],
  skate: ["skate", "patineta", "tabla"],
}

const KIND_WORDS: Record<SearchKind, string[]> = {
  plancha: ["plancha", "planchas", "pack"],
  calco: ["calco", "calcos", "sticker", "stickers", "suelto"],
  seccion: [],
}

const KIND_ORDER: SearchKind[] = ["plancha", "calco", "seccion"]

const SCORE_EXACT_TITLE = 1000
const SCORE_TITLE_PREFIX = 500
const SCORE_TITLE_WORD = 50
const SCORE_OTHER_WORD = 10

export function normalizeText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
}

const words = (value: string) => normalizeText(value).split(" ").filter(Boolean)

export function buildSearchIndex(): SearchEntry[] {
  const sheetEntries = sheets.map<SearchEntry>((sheet) => ({
    id: `plancha-${sheet.id}`,
    kind: "plancha",
    title: sheet.name,
    subtitle: `Plancha N.º ${sheet.code} · ${sheet.stickers.length} calcos · ${formatARS(sheet.price)}`,
    href: "#catalogo",
    keywords: [sheet.vibe, ...sheet.stickers.flatMap((kind) => ART_KEYWORDS[kind])],
  }))

  const productEntries = products.map<SearchEntry>((product) => ({
    id: `calco-${product.id}`,
    kind: "calco",
    title: product.name,
    subtitle: `Calco suelto · ${formatARS(product.priceFrom)}`,
    href: "#de-a-uno",
    keywords: [...ART_KEYWORDS[product.art], ...(product.badge ? [product.badge] : [])],
  }))

  const sectionEntries = mainNav.map<SearchEntry>((item) => ({
    id: `seccion-${item.id}`,
    kind: "seccion",
    title: item.label,
    subtitle: item.description,
    href: item.href,
    keywords: (item.children ?? []).map((child) => child.label),
  }))

  return [...sheetEntries, ...productEntries, ...sectionEntries]
}

/** A query word matches an entry word that starts with it, also accepting a plural query ("planchas"). */
function tokenMatches(token: string, candidates: string[]): boolean {
  const singular = token.length > 3 && token.endsWith("s") ? token.slice(0, -1) : token
  return candidates.some((word) => word.startsWith(token) || word.startsWith(singular))
}

function scoreEntry(entry: SearchEntry, query: string, tokens: string[]): number {
  const title = normalizeText(entry.title)
  const titleWords = title.split(" ")
  const otherWords = [entry.subtitle, ...entry.keywords, ...KIND_WORDS[entry.kind]].flatMap(words)

  let score = 0
  for (const token of tokens) {
    if (tokenMatches(token, titleWords)) score += SCORE_TITLE_WORD
    else if (tokenMatches(token, otherWords)) score += SCORE_OTHER_WORD
    else return 0
  }

  if (title === query) score += SCORE_EXACT_TITLE
  else if (title.startsWith(query)) score += SCORE_TITLE_PREFIX
  return score
}

export function searchCatalog(rawQuery: string, index: SearchEntry[], limit = 8): SearchEntry[] {
  const query = normalizeText(rawQuery)
  if (!query) return []
  const tokens = query.split(" ")

  return index
    .map((entry) => ({ entry, score: scoreEntry(entry, query, tokens) }))
    .filter(({ score }) => score > 0)
    .sort(
      (a, b) =>
        b.score - a.score ||
        KIND_ORDER.indexOf(a.entry.kind) - KIND_ORDER.indexOf(b.entry.kind) ||
        a.entry.title.localeCompare(b.entry.title, "es")
    )
    .slice(0, limit)
    .map(({ entry }) => entry)
}
