"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const techItems = [
  "REACT",
  "NEXT.JS",
  "NODE.JS",
  "TYPESCRIPT",
  "POSTGRESQL",
  "PRISMA",
  "GRAPHQL",
  "REST API",
];

const concepts = [
  "LOGIC",
  "REALITY",
  "CAUSE_EFFECT",
  "ABSTRACTION",
  "ALGORITHMS",
  "PATTERNS",
  "COMPLEXITY",
  "OPTIMIZATION",
  "DECISION MAKING",
  "COGNITION",
  "SYSTEM THINKING",
  "TRUTH",
];

function MarqueeRow({
  items,
  direction = "left",
}: {
  items: string[];
  direction?: "left" | "right";
}) {
  const duplicatedItems = [...items, ...items, ...items, ...items];

  return (
    <div className="relative overflow-hidden py-8 md:py-10 border-y border-white/5 bg-white/1">
      <div className="absolute left-0 top-0 bottom-0 w-32 md:w-60 bg-linear-to-r from-background via-background/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 md:w-60 bg-linear-to-l from-background via-background/80 to-transparent z-10 pointer-events-none" />

      <motion.div
        className={`flex gap-16 ${
          direction === "left"
            ? "animate-marquee-left"
            : "animate-marquee-right"
        } will-change-transform`}
        style={{ width: "fit-content" }}
      >
        {duplicatedItems.map((item, index) => (
          <div key={index} className="flex items-center gap-8">
            <span
              className="font-sans text-4xl md:text-6xl lg:text-7xl font-bold tracking-[0.15em] uppercase whitespace-nowrap cursor-default transition-all duration-500 hover:scale-105"
              style={{
                color: "transparent",
                WebkitTextStroke: "1.5px var(--primary)",
                opacity: 0.6,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--primary)";
                e.currentTarget.style.WebkitTextStroke = "none";
                e.currentTarget.style.opacity = "1";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "transparent";
                e.currentTarget.style.WebkitTextStroke = "1.5px var(--primary)";
                e.currentTarget.style.opacity = "0.6";
              }}
            >
              {item}
            </span>
            <div className="flex items-center gap-2 opacity-30">
              <div className="w-3 h-3 border border-primary rotate-45" />
              <div className="w-1.5 h-1.5 bg-primary/50" />
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function TechMarquee() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.95, 1]);

  return (
    <section
      ref={containerRef}
      className="relative py-24 md:py-40 px-6 md:px-12 lg:px-24 overflow-hidden bg-background"
    >
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <motion.div
        style={{ opacity, scale }}
        className="max-w-7xl mx-auto relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mb-16 md:mb-24"
        >
          <div className="flex items-center gap-4 mb-6">
            <motion.div
              className="w-20 h-px bg-linear-to-r from-primary to-transparent"
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 1 }}
            />
            <motion.span
              className="font-sans text-xs md:text-sm tracking-[0.3em] text-stone-400 uppercase font-medium"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              CHAPTER III — TECHNOLOGIES USED
            </motion.span>
          </div>
          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-none tracking-tighter uppercase">
            TECH <span className="text-primary italic font-light">ARSENAL</span>
          </h2>
        </motion.div>

        <div className="relative">
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute left-0 top-0 w-px bg-white/10 origin-top"
          />

          <div className="space-y-32 pl-8 md:pl-12">
            <motion.div
              initial={{ opacity: 10, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative group"
            >
              <div className="absolute -left-9.25 md:-left-13.25 top-2 w-3 h-3 rounded-full bg-stone-900 border border-primary/50 group-hover:bg-primary group-hover:shadow-[0_0_15px_rgba(124,45,18,0.5)] transition-all duration-500 z-20" />

              <div className="text-[10px] text-stone-600 uppercase tracking-[0.4em] mb-8 font-sans font-bold">
                Development Stack
              </div>

              <div className="relative -ml-14 md:-ml-24 lg:-ml-36 w-screen">
                <MarqueeRow items={techItems} direction="left" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 10, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative group"
            >
              <div className="absolute -left-9.25 md:-left-13.25 top-2 w-3 h-3 rounded-full bg-stone-900 border border-primary/50 group-hover:bg-primary group-hover:shadow-[0_0_15px_rgba(124,45,18,0.5)] transition-all duration-500 z-20" />

              <div className="text-[10px] text-stone-600 uppercase tracking-[0.4em] mb-8 font-sans font-bold">
                Conceptual Foundations
              </div>

              <div className="relative -ml-14 md:-ml-24 lg:-ml-36 w-screen">
                <MarqueeRow items={concepts} direction="right" />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
