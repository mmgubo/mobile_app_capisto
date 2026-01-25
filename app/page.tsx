import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { CtaSection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { HeaderWithAuth } from "@/components/header-with-auth"

export default function HomePage() {


  return (
    <div className="flex min-h-screen flex-col">
      <HeaderWithAuth />
      <main className="flex-1">
        <HeroSection />
        <ServicesSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  )
}
