import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { SmoothScroll } from "@/components/smooth-scroll";
import { LoadingScreen } from "@/components/loading-screen";
import dynamic from "next/dynamic";

const About = dynamic(
  () => import("@/components/about").then((m) => ({ default: m.About })),
  {
    loading: () => <div className="h-screen bg-background" />,
  },
);

const Experience = dynamic(
  () =>
    import("@/components/experience").then((m) => ({ default: m.Experience })),
  {
    loading: () => <div className="h-screen bg-background" />,
  },
);

const TechMarquee = dynamic(
  () =>
    import("@/components/tech-marquee").then((m) => ({
      default: m.TechMarquee,
    })),
  {
    loading: () => <div className="h-24 bg-background" />,
  },
);

const Works = dynamic(
  () => import("@/components/works").then((m) => ({ default: m.Works })),
  {
    loading: () => <div className="h-screen bg-background" />,
  },
);

const Resume = dynamic(
  () => import("@/components/resume").then((m) => ({ default: m.Resume })),
  {
    loading: () => <div className="h-screen bg-background" />,
  },
);

const Contact = dynamic(
  () => import("@/components/contact").then((m) => ({ default: m.Contact })),
  {
    loading: () => <div className="h-screen bg-background" />,
  },
);

const Footer = dynamic(
  () => import("@/components/footer").then((m) => ({ default: m.Footer })),
  {
    loading: () => <div className="h-64 bg-background" />,
  },
);

export default function Home() {
  return (
    <>
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
