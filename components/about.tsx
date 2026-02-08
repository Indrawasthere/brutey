"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const statements = [
  "I negotiate with bugs, not fix them.",
  "My design pattern is chaotic neutral.",
  "Turning espresso into questionable code.",
  "I code for my future self to curse at.",
  "Debugging: the journey IS the destination.",
  "To code or not to code—never a question.",
  "Life: legacy codebase, no docs.",
  "Building software that outlives its users.",
];

export function About() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);
  const smoothX = useSpring(x, { stiffness: 100, damping: 30 });

  return (
    <section
      ref={containerRef}
      className="relative py-32 overflow-hidden md:py-0 bg-background"
    >
      {/* Section Header - Brutalist */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="px-8 md:px-12 mb-0 py-20"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-px bg-primary" />
          <p className="font-mono-label text-primary/80">
            03 — PHILOSOPHY
          </p>
        </div>
        <h2 className="font-sans text-3xl md:text-5xl font-bold tracking-tight uppercase">
          When it <span className="italic font-light text-primary">works</span>, 
          don't touch it. When it <span className="italic font-light text-accent">doesn't</span>— 
          <span className="text-destructive">panic</span>.
        </h2>
      </motion.div>

      {/* Horizontal Scroll Container - Medieval */}
      <div className="relative flex items-center overflow-hidden py-0 gap-0 h-20 border-y border-primary/10">
        {/* Gradient fades */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
        
        <motion.div
          style={{ x: smoothX }}
          className="flex gap-16 md:gap-32 px-8 md:px-12 whitespace-nowrap"
        >
          {statements.map((statement, index) => (
            <motion.p
              key={index}
              className="text-3xl md:text-5xl lg:text-6xl font-sans font-bold tracking-wide uppercase"
              style={{
                color: index % 3 === 0 ? "var(--foreground)" : 
                       index % 3 === 1 ? "var(--primary)" : 
                       "var(--accent)",
                opacity: 0.9,
              }}
            >
              {statement}
            </motion.p>
          ))}
        </motion.div>
      </div>

      {/* Decorative Line - Brutalist */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="mt-0 mx-8 md:mx-12 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent origin-left"
      />

      {/* Corner decorations */}
      <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-primary/20" />
      <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-primary/20" />
    </section>
  );
}

