"use client"

import { motion } from "framer-motion"

const techItems = [
  "REACT",
  "NEXT.JS",
  "NODE.JS",
  "TYPESCRIPT",
  "POSTGRESQL",
  "PRISMA",
  "GRAPHQL",
  "REST API",
]

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
]

function MarqueeRow({ items, direction = "left" }: { items: string[]; direction?: "left" | "right" }) {
  const duplicatedItems = [...items, ...items, ...items, ...items]

  return (
    <div className="relative overflow-hidden py-6 border-y border-primary/10">
      {/* Gradient fades */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
      
      <motion.div
        className={`flex gap-12 ${direction === "left" ? "animate-marquee-left" : "animate-marquee-right"}`}
        style={{ width: "fit-content" }}
      >
        {duplicatedItems.map((item, index) => (
          <span
            key={index}
            className="group font-sans text-4xl md:text-6xl lg:text-7xl font-bold tracking-widest uppercase whitespace-nowrap cursor-default"
            style={{
              color: "transparent",
              WebkitTextStroke: "1px var(--primary)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--primary)"
              e.currentTarget.style.WebkitTextStroke = "none"
              e.currentTarget.style.textShadow = "0 0 20px var(--primary)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "transparent"
              e.currentTarget.style.WebkitTextStroke = "1px var(--primary)"
              e.currentTarget.style.textShadow = "none"
            }}
          >
            {item}
            <span className="mx-8 text-primary/20">◆</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export function TechMarquee() {
  return (
    <section className="relative py-24 overflow-hidden md:py-32 bg-background">
      {/* Section Header - Brutalist */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="px-8 md:px-12 mb-12"
      >
        <div className="flex items-center gap-4 mb-6">
          <p className="font-mono-label text-primary/80">
            05 — ARSENAL
          </p>
          <div className="w-12 h-px bg-primary/30" />
        </div>
        <h2 className="font-sans text-3xl md:text-5xl font-bold tracking-wider uppercase">
          Weapons of <span className="italic font-light text-primary">Choice</span>
        </h2>
      </motion.div>

      {/* Marquee Rows */}
      <div className="space-y-0">
        <MarqueeRow items={techItems} direction="left" />
        <MarqueeRow items={concepts} direction="right" />
      </div>

      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-primary/20" />
      <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-primary/20" />
    </section>
  )
}

