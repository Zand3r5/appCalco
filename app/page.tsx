import { AnnouncementBar } from "@/components/site/announcement-bar";
import { B2BCta } from "@/components/site/b2b-cta";
import { CarouselSection } from "@/components/site/carousel-section";
import { CategoriesBento } from "@/components/site/categories-bento";
import { Faq } from "@/components/site/faq";
import { FeaturesStrip } from "@/components/site/features-strip";
import { Hero } from "@/components/site/hero";
import { HowItWorks } from "@/components/site/how-it-works";
import { SinglesSection } from "@/components/site/singles";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { StatsBrands } from "@/components/site/stats-brands";
import { Testimonials } from "@/components/site/testimonials";
import { WhatsAppFab } from "@/components/site/whatsapp-fab";

export default function Home() {
  return (
    <>
      <AnnouncementBar />
      <SiteHeader />
      <main id="contenido">
        <Hero />
        <FeaturesStrip />
        <CarouselSection />
        <SinglesSection />
        <CategoriesBento />
        <HowItWorks />
        <StatsBrands />
        <Testimonials />
        <B2BCta />
        <Faq />
      </main>
      <SiteFooter />
      <WhatsAppFab />
    </>
  );
}
