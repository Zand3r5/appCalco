import { siteConfig } from "./site-config"

/**
 * Site navigation as plain objects: the header menu, the footer columns, the legal links and the
 * business facts all live here, so changing a link or a label never means hunting through JSX.
 */

export type NavLink = {
  id: string
  label: string
  href: string
  description?: string
  external?: boolean
}

export type NavItem = NavLink & {
  description: string
  children?: NavLink[]
}

export type FooterColumn = {
  id: string
  title: string
  links: NavLink[]
}

export type LegalPage = {
  slug: string
  title: string
  paragraphs: string[]
}

/** Section ids rendered on the home page; every #anchor in the navigation must be one of these. */
export const PAGE_SECTIONS = [
  "personalizados",
  "catalogo",
  "de-a-uno",
  "categorias-title",
  "como-title",
  "opiniones",
  "empresas",
  "faq",
] as const

export const mainNav: NavItem[] = [
  {
    id: "nav-planchas",
    label: "Planchas",
    href: "#catalogo",
    description: "Planchas temáticas listas para pegar.",
    children: [
      { id: "nav-planchas-carrete", label: "Ver el carrete", href: "#catalogo", description: "Girá y elegí tu plancha." },
      { id: "nav-planchas-categorias", label: "Categorías", href: "#categorias-title", description: "Street, clásicos y ediciones limitadas." },
    ],
  },
  {
    id: "nav-de-a-uno",
    label: "De a uno",
    href: "#de-a-uno",
    description: "Calcos sueltos para armar tu mix.",
  },
  {
    id: "nav-personalizados",
    label: "Personalizados",
    href: "#personalizados",
    description: "Tu logo o tu idea, troquelado a medida.",
    children: [
      { id: "nav-personalizados-crear", label: "Diseñá el tuyo", href: "#personalizados", description: `Desde ${siteConfig.claims.customMinUnits} unidades.` },
      { id: "nav-personalizados-como", label: "Cómo funciona", href: "#como-title", description: "De tu archivo al calco en 3 pasos." },
    ],
  },
  {
    id: "nav-por-mayor",
    label: "Por mayor",
    href: "#empresas",
    description: "Precios por cantidad para marcas y eventos.",
  },
  {
    id: "nav-ayuda",
    label: "Ayuda",
    href: "#faq",
    description: "Dudas, plazos y contacto.",
    children: [
      { id: "nav-ayuda-faq", label: "Preguntas frecuentes", href: "#faq", description: "Mínimos, plazos y materiales." },
      { id: "nav-ayuda-opiniones", label: "Opiniones", href: "#opiniones", description: "Lo que dicen quienes ya compraron." },
      {
        id: "nav-ayuda-whatsapp",
        label: "Escribinos por WhatsApp",
        href: siteConfig.contact.whatsappUrl,
        description: siteConfig.business.hours,
        external: true,
      },
    ],
  },
]

export const legalPages: LegalPage[] = [
  {
    slug: "terminos",
    title: "Términos y condiciones",
    paragraphs: [
      // MOCK: replace with the reviewed legal text before launch.
      "Texto provisorio. Acá van las condiciones de compra, producción, envíos y cambios de Uknow Calcos.",
      "Los personalizados se producen recién después de que apruebes la prueba digital.",
    ],
  },
  {
    slug: "privacidad",
    title: "Política de privacidad",
    paragraphs: [
      // MOCK
      "Texto provisorio. Acá se explica qué datos pedimos (contacto y envío), para qué los usamos y cómo pedir que los borremos.",
    ],
  },
  {
    slug: "envios",
    title: "Envíos y devoluciones",
    paragraphs: [
      // MOCK
      `Texto provisorio. ${siteConfig.delivery.productionLabel}. ${siteConfig.delivery.shippingLabel}.`,
    ],
  },
  {
    slug: "arrepentimiento",
    title: "Botón de arrepentimiento",
    paragraphs: [
      // MOCK: wire a real cancellation form (Res. 424/2020) in the checkout sprint.
      "Tenés 10 días corridos desde que recibís tu compra para arrepentirte, sin costo y sin dar explicaciones.",
      `Por ahora escribinos a ${siteConfig.contact.emailHello} con tu número de pedido y lo gestionamos.`,
    ],
  },
]

const legalHref = (slug: string) => `/legales/${slug}`

export const legalLinks: NavLink[] = [
  { id: "legal-terminos", label: "Términos y condiciones", href: legalHref("terminos") },
  { id: "legal-privacidad", label: "Privacidad", href: legalHref("privacidad") },
  { id: "legal-envios", label: "Envíos y devoluciones", href: legalHref("envios") },
  { id: "legal-arrepentimiento", label: "Botón de arrepentimiento", href: legalHref("arrepentimiento") },
  {
    id: "defensa-consumidor",
    label: "Defensa del Consumidor",
    // MOCK: confirm the official URL required by Res. 271/2020 before launch.
    href: "https://www.argentina.gob.ar/produccion/defensadelconsumidor/formulario",
    external: true,
  },
]

export const footerNav: FooterColumn[] = [
  {
    id: "footer-tienda",
    title: "Tienda",
    links: [
      { id: "footer-planchas", label: "Planchas", href: "#catalogo" },
      { id: "footer-de-a-uno", label: "De a uno", href: "#de-a-uno" },
      { id: "footer-personalizados", label: "Personalizados", href: "#personalizados" },
      { id: "footer-por-mayor", label: "Por mayor", href: "#empresas" },
    ],
  },
  {
    id: "footer-ayuda",
    title: "Ayuda",
    links: [
      { id: "footer-como", label: "Cómo funciona", href: "#como-title" },
      { id: "footer-faq", label: "Preguntas frecuentes", href: "#faq" },
      { id: "footer-opiniones", label: "Opiniones", href: "#opiniones" },
    ],
  },
  {
    id: "footer-contacto",
    title: "Contacto",
    links: [
      { id: "footer-whatsapp", label: "WhatsApp", href: siteConfig.contact.whatsappUrl, external: true },
      { id: "footer-email", label: siteConfig.contact.emailHello, href: `mailto:${siteConfig.contact.emailHello}` },
      { id: "footer-instagram", label: "Instagram", href: siteConfig.contact.instagramUrl, external: true },
    ],
  },
]

export type FooterFact = { label: string; value: string }

export const footerInfo = {
  copyright: (year: number) => `© ${year} ${siteConfig.brandName}. Todos los derechos reservados.`,
  facts: [
    { label: "Razón social", value: siteConfig.business.legalName },
    { label: "CUIT", value: siteConfig.business.cuit },
    { label: "Dirección", value: siteConfig.business.address },
    { label: "Horario", value: siteConfig.business.hours },
    { label: "Envíos", value: siteConfig.delivery.shippingLabel },
    { label: "Medios de pago", value: siteConfig.business.paymentMethods.join(" · ") },
  ] satisfies FooterFact[],
}

/** Section anchors point at the home page, so the same nav works from /legales/* and future routes. */
export function resolveHref(href: string): string {
  return href.startsWith("#") ? `/${href}` : href
}

/** Every link the site navigation can render, flattened; used by tests and the search index. */
export function allNavLinks(): NavLink[] {
  const menuLinks = mainNav.flatMap((item) => [item, ...(item.children ?? [])])
  const footerLinks = footerNav.flatMap((column) => column.links)
  return [...menuLinks, ...footerLinks, ...legalLinks]
}
