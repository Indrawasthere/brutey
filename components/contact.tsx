"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Github,
  Linkedin,
  Instagram,
  ArrowUpRight,
  Zap,
  Phone,
  MapPin,
} from "lucide-react";

const socialLinks = [
  {
    name: "GITHUB",
    icon: Github,
    href: "https://github.com/Indrawasthere",
    handle: "@Indrawasthere",
    index: "01",
  },
  {
    name: "LINKEDIN",
    icon: Linkedin,
    href: "https://linkedin.com/in/muhammadfadlanh",
    handle: "/in/muhammadfadlanh",
    index: "02",
  },
  {
    name: "INSTAGRAM",
    icon: Instagram,
    href: "https://instagram.com/mhmdfdlaan",
    handle: "@mhmdfdlaan",
    index: "03",
  },
];

export function Contact() {
  const containerRef = useRef<HTMLElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const contactOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 0.15, 0.15, 0],
  );

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative py-32 md:py-48 px-6 md:px-12 lg:px-16 bg-background overflow-hidden"
    >
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-20">
        {/* SECTION HEADER */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-24 relative"
        >
          {/* Brutalist number decoration */}
          <div className="absolute -left-4 -top-10 md:-left-12 md:-top-20 font-serif text-[150px] md:text-[250px] font-bold text-primary/5 leading-none pointer-events-none">
            VI
          </div>

          <div className="relative">
            <div className="flex items-center gap-4 mb-8">
              <motion.div
                className="w-16 h-px bg-primary"
                initial={{ width: 0 }}
                whileInView={{ width: 64 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 1 }}
              />
              <motion.span
                className="font-sans text-xs md:text-sm tracking-[0.3em] text-stone-400 uppercase font-medium"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                CHAPTER VI — CONNECTIONS
              </motion.span>
            </div>

            <h2 className="font-serif text-6xl md:text-8xl lg:text-9xl leading-[0.85] tracking-tighter uppercase">
              FIND ME ON
              <br />
              <span className="text-primary italic font-light">THE NET</span>
            </h2>

            <p className="mt-10 text-lg md:text-xl text-stone-400 max-w-2xl font-sans leading-relaxed">
              Explore my digital footprints or connect through professional
              networks. For project inquiries, refer to the final chapter below.
            </p>
          </div>
        </motion.div>

        {/* Social Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative border-2 border-border bg-card/30 overflow-hidden p-8 transition-all duration-500"
            >
              <motion.div
                className="absolute inset-0 bg-primary"
                initial={{ y: "100%" }}
                animate={{ y: hoveredIndex === index ? "0%" : "100%" }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              />

              <div className="relative z-10 flex flex-col h-full justify-between min-h-[160px]">
                <div className="flex justify-between items-start">
                  <div
                    className={`w-12 h-12 border flex items-center justify-center transition-colors duration-500 ${hoveredIndex === index ? "border-black/20 bg-black/5" : "border-primary/30"}`}
                  >
                    <social.icon
                      className={`w-5 h-5 ${hoveredIndex === index ? "text-black" : "text-primary"}`}
                    />
                  </div>
                  <div
                    className={`text-[10px] font-sans tracking-[0.2em] transition-colors ${hoveredIndex === index ? "text-black/50" : "text-stone-600"}`}
                  >
                    REF. {social.index}
                  </div>
                </div>

                <div>
                  <h3
                    className={`font-serif text-3xl font-bold mb-1 transition-colors ${hoveredIndex === index ? "text-black" : "text-white"}`}
                  >
                    {social.name}
                  </h3>
                  <p
                    className={`font-sans text-sm transition-colors ${hoveredIndex === index ? "text-black/70" : "text-stone-500"}`}
                  >
                    {social.handle}
                  </p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Bottom Info Bar */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          <div className="border-2 border-border p-6 bg-card/30">
            <div className="flex items-center gap-3 text-primary mb-2">
              <Phone className="w-4 h-4" />
              <span className="text-[10px] tracking-widest uppercase text-stone-500">
                Phone
              </span>
            </div>
            <p className="font-sans text-sm">+62 878-8885-7532</p>
          </div>

          <div className="border-2 border-border p-6 bg-card/30">
            <div className="flex items-center gap-3 text-primary mb-2">
              <MapPin className="w-4 h-4" />
              <span className="text-[10px] tracking-widest uppercase text-stone-500">
                Location
              </span>
            </div>
            <p className="font-sans text-sm">Jakarta, Indonesia</p>
          </div>

          <div className="md:col-span-2 border-2 border-border p-6 bg-primary/5 flex items-center justify-between group">
            <div className="flex items-center gap-4">
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </div>
              <div>
                <p className="text-[10px] tracking-widest uppercase text-stone-500">
                  Current Status
                </p>
                <p className="font-serif text-xl font-bold">
                  AVAILABLE FOR PROJECTS
                </p>
              </div>
            </div>
            <Zap className="w-6 h-6 text-primary fill-primary opacity-20 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </div>
      <motion.div
        style={{
          y: yParallax,
          opacity: contactOpacity,
        }}
        className="absolute -bottom-20 right-0 pointer-events-none select-none z-10 whitespace-nowrap"
      >
        <h3 className="font-serif text-[28vw] font-bold leading-none uppercase outline-text">
          CONNECT
        </h3>
      </motion.div>

      <style jsx>{`
        .outline-text {
          -webkit-text-stroke: 2px rgba(255, 255, 255, 0.2);
          color: transparent;
          font-family: serif;
        }
      `}</style>
    </section>
  );
}
