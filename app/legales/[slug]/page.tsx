import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import { legalPages } from "@/lib/navigation"
import { siteConfig } from "@/lib/site-config"

export const dynamicParams = false

export function generateStaticParams() {
  return legalPages.map((page) => ({ slug: page.slug }))
}

const findPage = (slug: string) => legalPages.find((page) => page.slug === slug)

export async function generateMetadata(props: PageProps<"/legales/[slug]">): Promise<Metadata> {
  const { slug } = await props.params
  const page = findPage(slug)
  return { title: page ? `${page.title} | ${siteConfig.brandName}` : siteConfig.brandName }
}

export default async function LegalPage(props: PageProps<"/legales/[slug]">) {
  const { slug } = await props.params
  const page = findPage(slug)
  if (!page) notFound()

  return (
    <>
      <SiteHeader />
      <main id="contenido" className="bg-concrete">
        <article className="shell max-w-3xl py-16 sm:py-24">
          <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground uppercase">Legales</p>
          <h1 className="mt-3 font-display text-5xl leading-[0.95] sm:text-6xl">{page.title}</h1>
          {siteConfig.isMock && (
            <p className="mt-6 inline-block -rotate-1 rounded-sm bg-pop px-3 py-1.5 text-sm font-semibold text-ink">
              Texto provisorio: falta la versión revisada.
            </p>
          )}
          <div className="mt-8 space-y-4 text-lg text-muted-foreground">
            {page.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  )
}
