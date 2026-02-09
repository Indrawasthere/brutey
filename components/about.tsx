"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const philosophies = [
  {
    title: "CODE IS FORTRESS",
    description:
      "Every system built with architectural precision, engineered to withstand chaos and time",
  },
  {
    title: "LOGIC IS WEAPON",
    description:
      "Sharp algorithms and clean patterns - the ancient blade of computational thinking",
  },
  {
    title: "BUGS ARE CONQUERED",
    description:
      "No enemy left standing. Test-driven warfare against imperfection and entropy",
  },
  {
    title: "SIMPLICITY REIGNS",
    description:
      "Complexity is the enemy. Brutal elegance through minimalist design philosophy",
  },
];

export function About() {
  const containerRef = useRef<HTMLElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative py-32 md:py-40 px-6 md:px-12 lg:px-16 overflow-hidden bg-background"
    >
      {/* Brutal Grid Background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(to right, var(--border) 1px, transparent 1px),
            linear-gradient(to bottom, var(--border) 1px, transparent 1px)
          `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-7xl mx-auto mb-24 relative"
      >
        {/* Brutalist number decoration */}
        <div className="absolute -left-4 -top-4 md:-left-8 md:-top-8 font-serif text-[120px] md:text-[200px] font-bold text-primary/5 leading-none pointer-events-none">
          I
        </div>

        <div className="relative">
          <div className="flex items-center gap-4 mb-8">
            <motion.div
              className="w-20 h-px bg-linear-to-r from-primary to-stone-700"
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 1 }}
            />
            <motion.span
              className="font-sans text-sm tracking-[0.3em] text-stone-400 uppercase"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              I — PHILOSOPHY
            </motion.span>
          </div>

          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl max-w-5xl leading-[0.95] tracking-tight text-foreground">
            ENGINEERING
            <br />
            <span className="text-primary italic font-light">DIGITAL</span>
            <br />
            FORTRESSES
          </h2>
        </div>
      </motion.div>

      {/* Philosophy Grid - WITH EPIC HOVER EFFECTS! */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-0 mb-32 border-2 border-border">
        {philosophies.map((philosophy, index) => (
          <motion.div
            key={philosophy.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
            className="group relative p-10 md:p-14 border-border border-r-2 border-b-2 last:border-r-0 md:even:border-r-0 transition-all duration-500 overflow-hidden cursor-pointer"
          >
            {/* EPIC BACKGROUND COLOR CHANGE EFFECT*/}
            <motion.div
              className="absolute inset-0 bg-primary"
              initial={{ y: "100%" }}
              animate={{ y: hoveredCard === index ? "0%" : "100%" }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            />

            {/* Content -  */}
            <div className="relative">
              {/* Index number*/}
              <motion.div
                className="absolute top-0 right-0 font-serif text-xs tracking-[0.3em]"
                animate={{
                  color:
                    hoveredCard === index
                      ? "#0a0a0a"
                      : "rgba(124, 45, 18, 0.4)",
                }}
                transition={{ duration: 0.3 }}
              >
                [{String(index + 1).padStart(2, "0")}]
              </motion.div>

              {/* Geometric corner decorations */}
              <div className="absolute top-0 left-0 w-8 h-8">
                <motion.div
                  className="absolute top-0 left-0 w-full h-px transition-colors duration-300"
                  animate={{
                    backgroundColor:
                      hoveredCard === index
                        ? "#0a0a0a"
                        : "rgba(124, 45, 18, 0.3)",
                  }}
                />
                <motion.div
                  className="absolute top-0 left-0 w-px h-full transition-colors duration-300"
                  animate={{
                    backgroundColor:
                      hoveredCard === index
                        ? "#0a0a0a"
                        : "rgba(124, 45, 18, 0.3)",
                  }}
                />
              </div>

              <div className="space-y-6">
                <motion.h3
                  className="font-serif text-2xl md:text-3xl font-bold tracking-wider uppercase leading-tight"
                  animate={{
                    color: hoveredCard === index ? "#0a0a0a" : "#d4d4d8",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {philosophy.title}
                </motion.h3>

                <motion.div
                  className="w-16 h-px transition-colors duration-300"
                  animate={{
                    backgroundColor:
                      hoveredCard === index
                        ? "#0a0a0a"
                        : "rgba(124, 45, 18, 0.5)",
                  }}
                />

                <motion.p
                  className="text-sm md:text-base leading-relaxed"
                  animate={{
                    color:
                      hoveredCard === index
                        ? "rgba(10, 10, 10, 0.8)"
                        : "#71717a",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {philosophy.description}
                </motion.p>
              </div>

              {/* Bottom corner accent */}
              <div className="absolute bottom-0 right-0 w-6 h-6">
                <motion.div
                  className="absolute bottom-0 right-0 w-full h-px"
                  animate={{
                    backgroundColor:
                      hoveredCard === index
                        ? "rgba(10, 10, 10, 0.3)"
                        : "rgba(124, 45, 18, 0.2)",
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="absolute bottom-0 right-0 w-px h-full"
                  animate={{
                    backgroundColor:
                      hoveredCard === index
                        ? "rgba(10, 10, 10, 0.3)"
                        : "rgba(124, 45, 18, 0.2)",
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* About Statement*/}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto"
      >
        <div className="relative border-4 border-border bg-card/80 backdrop-blur-sm">
          {/* Triple frame effect */}
          <div className="absolute inset-0 border-2 border-primary/10 m-2 pointer-events-none" />
          <div className="absolute inset-0 border border-primary/5 m-4 pointer-events-none" />

          <div className="relative p-12 md:p-20 space-y-8">
            {/* Quote marks - brutalist */}
            <div className="font-serif text-6xl md:text-8xl text-primary/20 leading-none">
              "
            </div>

            <div className="space-y-6 text-lg md:text-2xl leading-relaxed font-light">
              <p className="text-foreground">
                I forge software with the{" "}
                <span className="font-medium font-sans italic  text-primary">
                  precision of medieval engineering
                </span>{" "}
                and the vision of modern architecture.
              </p>

              <p className="text-muted-foreground">
                Every line of code is a stone in the fortress. Every function, a
                mechanism of war. The approach:{" "}
                <span className="font-medium text-foreground">
                  timeless principles meet cutting-edge execution
                </span>
                .
              </p>
            </div>

            <div className="pt-8 flex items-center gap-6">
              <div className="flex-1 h-px bg-primary/30" />
              <div className="text-center">
                <div className="font-sans text-xs text-primary/60 tracking-[0.3em] mb-1">
                  ESTABLISHED
                </div>
                <div className="font-sans text-2xl font-bold text-primary">
                  MMXXII
                </div>
              </div>
              <div className="flex-1 h-px bg-primary/30" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating geometric elements*/}
      <motion.div
        style={{ y }}
        className="absolute top-20 right-10 w-40 h-40 pointer-events-none hidden lg:block"
      >
        <div className="absolute inset-0 border-2 border-primary/10" />
        <div className="absolute inset-4 border border-primary/5" />
      </motion.div>

      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [-100, 100]) }}
        className="absolute bottom-40 left-10 w-32 h-32 rotate-45 pointer-events-none hidden lg:block"
      >
        <div className="absolute inset-0 border-2 border-border" />
        <div className="absolute top-1/2 left-0 right-0 h-px bg-border" />
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-border" />
      </motion.div>

      {/* Vertical accent lines */}
      <div className="absolute top-0 bottom-0 left-[15%] w-px bg-linear-to-b from-transparent via-primary/10 to-transparent hidden xl:block" />
      <div className="absolute top-0 bottom-0 right-[15%] w-px bg-linear-to-b from-transparent via-primary/10 to-transparent hidden xl:block" />
    </section>
  );
}
