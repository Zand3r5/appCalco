import type { StickerKind } from "@/components/stickers/sticker-art"

export const WHATSAPP_URL = "https://wa.me/5491100000000"

const unsplash = (id: string, size = 600) =>
  `https://images.unsplash.com/photo-${id}?w=${size}&h=${size}&fit=crop&auto=format&q=75`

export type CarouselCard = {
  src: string
  alt: string
  title: string
  tag: string
}

export const carouselCards: CarouselCard[] = [
  { src: unsplash("1625768376503-68d2495d78c5"), alt: "Pared cubierta de stickers variados", title: "Sticker bomb", tag: "Planchas" },
  { src: unsplash("1633533452206-8ab246b00e30"), alt: "Stickers sobre fondo amarillo", title: "Pack amarillo", tag: "Packs" },
  { src: unsplash("1540651810471-5699df74834f"), alt: "Colección de stickers de colores", title: "Colección color", tag: "Catálogo" },
  { src: unsplash("1572950947476-26a6e4111e80"), alt: "Stickers de colores surtidos", title: "Mix ilustrado", tag: "Catálogo" },
  { src: unsplash("1621252756235-7f37e5e5125e"), alt: "Stickers con diseños variados", title: "Diseños propios", tag: "Personalizados" },
  { src: unsplash("1500576992153-0271099def59"), alt: "Persona sosteniendo un sticker que dice Hello", title: "Hello!", tag: "Troquelados" },
  { src: unsplash("1589384267710-7a170981ca78"), alt: "Stickers de corazones y flores", title: "Corazones y flores", tag: "Edición limitada" },
  { src: unsplash("1543123452-278551b0e9a7"), alt: "Lote de stickers surtidos", title: "Lote surtido", tag: "Por mayor" },
  { src: unsplash("1583225214464-9296029427aa"), alt: "Stickers pegados en una pared blanca", title: "Muro de calcos", tag: "Planchas" },
  { src: unsplash("1552959988-b94b76838365"), alt: "Stickers coloridos sobre pared oscura", title: "Noche de calcos", tag: "Catálogo" },
  { src: unsplash("1714859100552-3e432e8f3981"), alt: "Notebook cubierta de stickers", title: "Tu notebook", tag: "Personalizados" },
  { src: unsplash("1754528770513-cf982e8f4ba1"), alt: "Pared cubierta con muchos stickers distintos", title: "Street collage", tag: "Por mayor" },
  { src: unsplash("1596917441632-db1cfd662a5a"), alt: "Sticker de carita feliz en un semáforo", title: "Carita feliz", tag: "Troquelados" },
  { src: unsplash("1649194791077-9e5721bcc10b"), alt: "Stickers pegados en el costado de un edificio", title: "Calle y vinilo", tag: "Exterior" },
]

export const categoryImages = {
  custom: unsplash("1714859100552-3e432e8f3981", 900),
  wholesale: unsplash("1543123452-278551b0e9a7", 700),
  sheets: unsplash("1633533452206-8ab246b00e30", 700),
} as const

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
  { id: "sol", name: "Sol Suncatcher Primavera", art: "sun", priceFrom: 3500, badge: "Nuevo", tint: "oklch(0.93 0.09 90)" },
  { id: "mate", name: "Mate Amargo", art: "mate", priceFrom: 1570, priceTo: 1740, tint: "oklch(0.92 0.06 140)" },
  { id: "che", name: "¡Che! Bubble", art: "che", priceFrom: 1570, priceTo: 1740, badge: "Top ventas", tint: "oklch(0.92 0.06 230)" },
  { id: "flor", name: "Flor Suncatcher", art: "flower", priceFrom: 3500, tint: "oklch(0.93 0.06 350)" },
  { id: "mariposa", name: "Mariposa Suncatcher", art: "butterfly", priceFrom: 3500, badge: "Nuevo", tint: "oklch(0.92 0.06 300)" },
  { id: "corazon", name: "Corazón Amor Eterno", art: "heart", priceFrom: 1570, priceTo: 1740, tint: "oklch(0.93 0.06 25)" },
  { id: "rayo", name: "Re Piola", art: "bolt", priceFrom: 1570, priceTo: 1740, tint: "oklch(0.94 0.08 100)" },
  { id: "smile", name: "Carita Todo Bien", art: "smiley", priceFrom: 1570, priceTo: 1740, tint: "oklch(0.93 0.07 75)" },
]

export const steps = [
  { n: "01", title: "Subí tu diseño", body: "Logo, foto de tu mascota o una idea en una servilleta. Nosotros lo convertimos en calco listo para imprimir." },
  { n: "02", title: "Elegí tamaño y cantidad", body: "Desde 10 unidades. Troquelado, circular o cuadrado, en vinilo mate o brillante resistente al agua." },
  { n: "03", title: "Lo recibís en tu casa", body: "Producimos en máximo 4 días hábiles y enviamos a todo el país y al mundo." },
] as const

export const testimonials = [
  { name: "Aylen V.", handle: "@aylenvargas", text: "Los stickers personalizados me enamoraron. Es la segunda vez que compro y voy a ir por más. ¡A mi familia le encantaron!" },
  { name: "Vicky L.", handle: "@vickyllove", text: "Siempre cumplen: calidad, entrega y atención. Pedirlos personalizados es súper práctico y las planchas temáticas son un 10." },
  { name: "Patry P.", handle: "@patrypiaggi", text: "Mandé las fotos que quería y los hicieron divinos. Rápido, seguro y me los entregaron en casa. ¡Excelente todo!" },
  { name: "Clara F.", handle: "@clarifeal", text: "Superaron mis expectativas. Compré 100 para mi estudio de body piercing y son espectaculares, un 20/10." },
  { name: "Aixa D.", handle: "@aixadepas", text: "La calidad es un diez: tienen relieve y colores re lindos. Hice personalizados y llegaron rapidísimo." },
  { name: "Carlos C.", handle: "@carloscarabba", text: "Pedí calcos de 3 modelos para mi banda y quedaron espectaculares. Gran terminación y excelente calidad." },
  { name: "Alfredo C.", handle: "@alfredocunti", text: "Súper fácil pedir por la web y por WhatsApp me resolvieron todo. Pedí desde Río Negro y llegó rapidísimo." },
] as const

// Placeholder client names — replace with real brand logos once licensed.
export const brands = [
  "Café Ronda", "Estudio Norte", "La Birra Club", "Mostaza Studio", "Barrio Fit",
  "Tinta Viva", "Pampa Records", "Kiosco Pop", "Ruta 40 Bikes", "Mila & Co",
] as const

export const faqs = [
  { q: "¿Cuál es el mínimo de compra?", a: "Los personalizados arrancan desde 10 unidades. Los stickers de catálogo se venden por unidad." },
  { q: "¿Son resistentes al agua y al sol?", a: "Sí. Usamos vinilo premium con laminado que resiste agua, rayones y rayos UV. Ideales para termos, notebooks y autos." },
  { q: "¿En cuánto tiempo tengo mi pedido?", a: "Producimos en un máximo de 4 días hábiles desde que aprobás el diseño. El envío depende de tu ubicación." },
  { q: "¿Hacen pedidos grandes para empresas?", a: "Sí, trabajamos con marcas, agencias y organizaciones. Escribinos y te armamos un presupuesto con fecha de entrega." },
] as const

export const navLinks = [
  { label: "Personalizados", href: "#personalizados" },
  { label: "Por mayor", href: "#empresas" },
  { label: "Catálogo", href: "#catalogo" },
  { label: "Lo nuevo", href: "#nuevo" },
  { label: "Preguntas", href: "#faq" },
] as const

export const formatARS = (value: number) =>
  new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(value)
