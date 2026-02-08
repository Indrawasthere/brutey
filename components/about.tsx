"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const philosophies = [
  "CODE IS FORTRESS",
  "LOGIC IS WEAPON",
  "BUGS ARE CONQUERED",
  "SIMPLICITY REIGNS",
];

export function About() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative py-32 md:py-40 px-6 md:px-12 lg:px-16 overflow-hidden bg-gradient-to-b from-background via-card/30 to-background"
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto mb-24"
      >
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-px bg-accent" />
          <span className="label-caps text-muted-foreground">
            01 — Philosophy
          </span>
        </div>
        
        <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl max-w-4xl leading-tight">
          Engineering digital fortresses that stand the{" "}
          <span className="italic font-medium text-accent/90">test of time</span>
        </h2>
      </motion.div>

      {/* Philosophy Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
        {philosophies.map((philosophy, index) => (
          <motion.div
            key={philosophy}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group relative p-8 md:p-12 border-2 border-border hover:border-accent/50 bg-card/30 backdrop-blur-sm transition-all duration-500"
          >
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-accent/30" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-accent/30" />
            
            <h3 className="font-serif text-3xl md:text-4xl font-bold tracking-tight">
              {philosophy}
            </h3>
            
            <div className="mt-4 w-12 h-1 bg-accent/30 group-hover:bg-accent transition-colors duration-500" />
          </motion.div>
        ))}
      </div>

      {/* About Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto"
      >
        <div className="relative p-12 md:p-16 border-2 border-border bg-card/50 backdrop-blur-sm">
          {/* Decorative frame */}
          <div className="absolute inset-0 border-4 border-accent/10 m-4 pointer-events-none" />
          
          <div className="relative space-y-6 text-lg md:text-xl leading-relaxed text-foreground/90">
            <p>
              I craft software with the precision of a medieval engineer and the vision of a modern architect. Every line of code is a stone in the fortress, every function a carefully designed mechanism.
            </p>
            
            <p className="text-muted-foreground">
              My approach combines timeless software engineering principles with cutting-edge technologies. The result: systems that are robust, maintainable, and built to evolve.
            </p>

            <div className="pt-8 flex items-center gap-4">
              <div className="flex-1 h-px bg-accent/30" />
              <span className="label-caps text-accent">
                Forged since 2022
              </span>
              <div className="flex-1 h-px bg-accent/30" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating elements */}
      <motion.div
        style={{ y }}
        className="absolute top-20 right-10 w-32 h-32 border-2 border-accent/10 pointer-events-none hidden lg:block"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [-80, 80]) }}
        className="absolute bottom-40 left-10 w-24 h-24 border-2 border-primary/10 rotate-45 pointer-events-none hidden lg:block"
      />
    </section>
  );
}