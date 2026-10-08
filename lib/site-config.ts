// MOCK: placeholder business data. Replace before launch (docs/mvp-y-sprints.md §4, decisions 1 and 5).
// Every provisional value carries a `// MOCK:` comment so `grep -rn "MOCK:"` lists them all.

export type SiteConfig = {
  isMock: boolean
  brandName: string
  contact: {
    whatsappNumber: string
    whatsappUrl: string
    instagramUrl: string
    emailHello: string
    emailSales: string
  }
  delivery: {
    productionMaxBusinessDays: number
    productionLabel: string
    shippingLabel: string
  }
  claims: {
    brandsCount: number
    provincesCount: number
    shipsWorldwide: boolean
    transferDiscountPercent: number
    customMinUnits: number
  }
  business: {
    legalName: string
    cuit: string
    address: string
    hours: string
    paymentMethods: readonly string[]
  }
}

const WHATSAPP_NUMBER = "5491100000000" // MOCK: fake number
const PRODUCTION_DAYS = 4 // MOCK: single promise (the site used to say both "24 a 96 hs" and "4 días hábiles")
const SHIPS_WORLDWIDE = true // MOCK: confirm international shipping

export const siteConfig = {
  isMock: true,
  brandName: "Uknow Calcos",
  contact: {
    whatsappNumber: WHATSAPP_NUMBER,
    whatsappUrl: `https://wa.me/${WHATSAPP_NUMBER}`,
    instagramUrl: "https://www.instagram.com/", // MOCK: no handle until the account is confirmed
    emailHello: "hola@uknowcalcos.com.ar", // MOCK
    emailSales: "ventas@uknowcalcos.com.ar", // MOCK
  },
  delivery: {
    productionMaxBusinessDays: PRODUCTION_DAYS,
    productionLabel: `Listos en máx. ${PRODUCTION_DAYS} días hábiles`,
    shippingLabel: SHIPS_WORLDWIDE ? "Envíos a todo el país y al mundo" : "Envíos a todo el país",
  },
  claims: {
    brandsCount: 50, // MOCK
    provincesCount: 24, // MOCK
    shipsWorldwide: SHIPS_WORLDWIDE,
    transferDiscountPercent: 10, // MOCK
    customMinUnits: 10, // MOCK: minimum units for custom stickers
  },
  business: {
    legalName: "Uknow Calcos (razón social a confirmar)", // MOCK
    cuit: "20-00000000-0", // MOCK
    address: "CABA, Argentina", // MOCK
    hours: "Lunes a viernes de 10 a 18 h", // MOCK
    paymentMethods: ["Mercado Pago", "Tarjetas en cuotas", "Transferencia"], // MOCK
  },
} as const satisfies SiteConfig

export function whatsappLink(message?: string): string {
  const base = siteConfig.contact.whatsappUrl
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}
