import type { StickerKind } from "@/components/stickers/sticker-art"
import { siteConfig } from "@/lib/site-config"

const { productionMaxBusinessDays, shippingLabel } = siteConfig.delivery

export type Sheet = {
  id: string
  code: string
  name: string
  vibe: string
  /** Stickers printed on the sheet, biggest first. The sheet layout fits up to 7. */
  stickers: StickerKind[]
  price: number
  /** Backing paper color behind the kiss-cut stickers. */
  backing: string
  /** Dark backing: the printed label switches to white ink. */
  dark?: boolean
}

export const sheets: Sheet[] = [
  { id: "barrio", code: "001", name: "Barrio", vibe: "Street", stickers: ["tag", "spray", "crown", "drip", "star", "bolt", "eye"], price: 4900, backing: "#f4f4f1" },
  { id: "argenta", code: "002", name: "Argenta", vibe: "Clásicos", stickers: ["mate", "che", "sun", "smiley", "heart", "bolt"], price: 4900, backing: "#eef6fb" },
  { id: "fuego", code: "003", name: "Fuego", vibe: "Street", stickers: ["flame", "eye", "drip", "crown", "star", "spray", "bolt"], price: 4900, backing: "#1d1f26", dark: true },
  { id: "primavera", code: "004", name: "Primavera", vibe: "Edición limitada", stickers: ["flower", "butterfly", "sun", "heart", "star", "smiley"], price: 5600, backing: "#fdf0f5" },
  { id: "skate", code: "005", name: "Skate Club", vibe: "Street", stickers: ["skate", "flame", "tag", "eye", "star", "spray", "drip"], price: 4900, backing: "#f4f4f1" },
  { id: "todo-bien", code: "006", name: "Todo Bien", vibe: "Buena onda", stickers: ["smiley", "drip", "heart", "che", "flower", "bolt"], price: 4900, backing: "#fff8df" },
  { id: "crew", code: "007", name: "Crew", vibe: "Street", stickers: ["crown", "tag", "spray", "che", "eye", "flame", "star"], price: 4900, backing: "#1d1f26", dark: true },
  { id: "mate-calle", code: "008", name: "Mate y Calle", vibe: "Clásicos", stickers: ["mate", "spray", "tag", "sun", "drip", "crown"], price: 4900, backing: "#f1f7ea" },
  { id: "love", code: "009", name: "Love Bomb", vibe: "Buena onda", stickers: ["heart", "butterfly", "flower", "star", "smiley", "eye"], price: 4900, backing: "#fff1ef" },
  { id: "tu-marca", code: "010", name: "Tu Marca", vibe: "Personalizada", stickers: ["logo", "badge24", "tag", "star", "bolt", "heart"], price: 7900, backing: "#f4f4f1" },
]

export type Product = {
  id: string
  name: string
  art: StickerKind
  priceFrom: number
  priceTo?: number
  badge?: string
  tint: string
}

export const products: Product[] = [
  { id: "tag", name: "Tag Uknow", art: "tag", priceFrom: 1740, badge: "Top ventas", tint: "oklch(0.3 0.01 260)" },
  { id: "spray", name: "Lata de Aerosol", art: "spray", priceFrom: 1570, priceTo: 1740, badge: "Nuevo", tint: "oklch(0.9 0.12 126)" },
  { id: "drip", name: "Carita Chorreada", art: "drip", priceFrom: 1570, priceTo: 1740, tint: "oklch(0.86 0.02 260)" },
  { id: "corona", name: "Corona del Barrio", art: "crown", priceFrom: 1570, priceTo: 1740, tint: "oklch(0.3 0.01 260)" },
  { id: "fuego", name: "Fuego", art: "flame", priceFrom: 1570, priceTo: 1740, tint: "oklch(0.92 0.06 80)" },
  { id: "ojo", name: "Ojo que Todo lo Ve", art: "eye", priceFrom: 1570, priceTo: 1740, badge: "Nuevo", tint: "oklch(0.72 0.17 42)" },
  { id: "skate", name: "Skate Barrio", art: "skate", priceFrom: 1740, tint: "oklch(0.88 0.04 230)" },
  { id: "estrella", name: "Estrella Ácida", art: "star", priceFrom: 1570, priceTo: 1740, tint: "oklch(0.3 0.01 260)" },
  { id: "mate", name: "Mate Amargo", art: "mate", priceFrom: 1570, priceTo: 1740, tint: "oklch(0.92 0.06 140)" },
  { id: "che", name: "¡Che! Bubble", art: "che", priceFrom: 1570, priceTo: 1740, tint: "oklch(0.92 0.04 230)" },
  { id: "rayo", name: "Re Piola", art: "bolt", priceFrom: 1570, priceTo: 1740, tint: "oklch(0.3 0.01 260)" },
  { id: "sol", name: "Sol Suncatcher", art: "sun", priceFrom: 3500, badge: "Edición limitada", tint: "oklch(0.93 0.07 90)" },
]

export const steps = [
  { n: "01", title: "Subí tu diseño", body: "Logo, foto de tu mascota o una idea en una servilleta. Nosotros lo convertimos en calco listo para imprimir." },
  { n: "02", title: "Elegí tamaño y cantidad", body: `Desde ${siteConfig.claims.customMinUnits} unidades. Troquelado, circular o cuadrado, en vinilo mate o brillante resistente al agua.` },
  {
    n: "03",
    title: "Lo recibís en tu casa",
    body: `Producimos en máximo ${productionMaxBusinessDays} días hábiles. ${shippingLabel}.`,
  },
] as const

export type Testimonial = { name: string; city: string; text: string }

// MOCK: fictitious testimonials for layout only. Replace with real, consented customer reviews before launch.
export const testimonials: readonly Testimonial[] = [
  { name: "Martina G.", city: "Córdoba", text: "Pedí calcos con el logo de mi emprendimiento y quedaron re prolijos. El vinilo se siente de buena calidad." },
  { name: "Julián R.", city: "Rosario", text: "Los pegué en la notebook y en el termo. Después de varias lavadas siguen intactos." },
  { name: "Sofía B.", city: "Mendoza", text: "Me ayudaron a ajustar el diseño antes de imprimir. La plancha temática es hermosa." },
  { name: "Tomás L.", city: "La Plata", text: "Encargué para la banda y los repartimos en el show. Colores fuertes y buen troquelado." },
  { name: "Camila F.", city: "Mar del Plata", text: "Súper simple pedir por WhatsApp. Me respondieron rápido y llegaron bien embalados." },
  { name: "Nicolás P.", city: "Salta", text: "Compré de a uno para probar y ya volví por una plancha completa. Muy buena terminación." },
  { name: "Lucía M.", city: "Neuquén", text: "Los usé para los packs de mi tienda y a mis clientas les encantaron. Voy a repetir." },
]

// MOCK: placeholder client names. Replace with real brand logos once licensed.
export const brands = [
  "Café Ronda", "Estudio Norte", "La Birra Club", "Mostaza Studio", "Barrio Fit",
  "Tinta Viva", "Pampa Records", "Kiosco Pop", "Ruta 40 Bikes", "Mila & Co",
] as const

export const faqs = [
  { q: "¿Cuál es el mínimo de compra?", a: `Los personalizados arrancan desde ${siteConfig.claims.customMinUnits} unidades. Los stickers de catálogo se venden por unidad.` },
  { q: "¿Son resistentes al agua y al sol?", a: "Sí. Usamos vinilo premium con laminado que resiste agua, rayones y rayos UV. Ideales para termos, notebooks y autos." },
  { q: "¿En cuánto tiempo tengo mi pedido?", a: `Producimos en un máximo de ${productionMaxBusinessDays} días hábiles desde que aprobás el diseño. El envío depende de tu ubicación.` },
  { q: "¿Hacen pedidos grandes para empresas?", a: "Sí, trabajamos con marcas, agencias y organizaciones. Escribinos y te armamos un presupuesto con fecha de entrega." },
] as const


export const formatARS = (value: number) =>
  new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(value)
