import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Experience } from "@/components/experience"
import { Works } from "@/components/works"
import { TechMarquee } from "@/components/tech-marquee"
import { ContactForm } from "@/components/contact-form"
import { Footer } from "@/components/footer"
import { CustomCursor } from "@/components/custom-cursor"
import { SmoothScroll } from "@/components/smooth-scroll"
import { SectionBlend } from "@/components/section-blend"

export default function Home() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <Navbar />
      <main id="main" tabIndex={-1}>
        <Hero />
        <SectionBlend />
        <About />
        <Experience />
        <Works />
        <TechMarquee />
        <ContactForm />
        <Footer />
      </main>
    </SmoothScroll>
  )
}

