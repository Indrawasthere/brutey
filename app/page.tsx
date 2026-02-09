import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { About } from "@/components/about";
import { Experience } from "@/components/experience";
import { TechMarquee } from "@/components/tech-marquee";
import { Works } from "@/components/works";
import { Resume } from "@/components/resume";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { SmoothScroll } from "@/components/smooth-scroll";
import { LoadingScreen } from "@/components/loading-screen";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <SmoothScroll>
        <Navbar />
        <main className="bg-black min-h-screen no-scrollbar">
          <Hero />
          <About />
          <Experience />
          <TechMarquee />
          <Works />
          <Resume />
          <Contact />
          <Footer />
        </main>
      </SmoothScroll>
    </>
  );
}
