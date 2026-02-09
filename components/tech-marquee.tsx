"use client";

import { motion } from "framer-motion";

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
    <div className="relative overflow-hidden py-8 md:py-10 border-y-2 border-border">
      {/* Gradient fades */}
      <div className="absolute left-0 top-0 bottom-0 w-40 bg-linear-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-40 bg-linear-to-l from-background to-transparent z-10 pointer-events-none" />

      <motion.div
        className={`flex gap-16 ${direction === "left" ? "animate-marquee-left" : "animate-marquee-right"}`}
        style={{ width: "fit-content" }}
      >
        {duplicatedItems.map((item, index) => (
          <div key={index} className="group relative flex items-center gap-8">
            <span
              className="font-sans text-4xl md:text-6xl lg:text-7xl font-bold tracking-[0.15em] uppercase whitespace-nowrap cursor-default transition-all duration-300"
              style={{
                color: "transparent",
                WebkitTextStroke: "2px var(--primary)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--primary)";
                e.currentTarget.style.WebkitTextStroke = "none";
                e.currentTarget.style.textShadow = "0 0 30px var(--primary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "transparent";
                e.currentTarget.style.WebkitTextStroke = "2px var(--primary)";
                e.currentTarget.style.textShadow = "none";
              }}
            >
              {item}
            </span>

            {/* Geometric separator */}
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 border-2 border-primary/30 rotate-45" />
              <div className="w-2 h-2 bg-primary/20" />
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function TechMarquee() {
  return (
    <section className="relative py-32 md:py-40 overflow-hidden bg-background">
      {/* Brutal Grid Background */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(to right, var(--border) 1px, transparent 1px),
            linear-gradient(to bottom, var(--border) 1px, transparent 1px)
          `,
            backgroundSize: "100px 100px",
          }}
        />
      </div>

      {/* Section Header - More brutal */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-7xl mx-auto mb-24 relative"
      >
        {/* Brutalist number decoration */}
        <div className="absolute -left-4 -top-4 md:-left-8 md:-top-8 font-serif text-[120px] md:text-[200px] font-bold text-primary/5 leading-none pointer-events-none">
          III
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
              III — ARSENAL
            </motion.span>
          </div>

          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl max-w-5xl leading-[0.95] tracking-tight text-foreground">
            WEAPON
            <br />
            <span className="text-primary italic font-light">CHOICE</span>
            <br />
          </h2>
        </div>
      </motion.div>

      {/* Marquee Rows */}
      <div className="space-y-0 relative">
        <MarqueeRow items={techItems} direction="left" />
        <MarqueeRow items={concepts} direction="right" />
      </div>

      {/* Bottom decorative section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="px-6 md:px-12 lg:px-16 mt-16"
      >
        <div className="max-w-7xl mx-auto">
          <div className="relative border-4 border-border bg-card/80 backdrop-blur-sm p-10 md:p-14">
            {/* Triple frame effect */}
            <div className="absolute inset-0 border-2 border-primary/10 m-2 pointer-events-none" />
            <div className="absolute inset-0 border border-primary/5 m-4 pointer-events-none" />

            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-8 h-8">
              <div className="absolute top-0 left-0 w-full h-px bg-primary/40" />
              <div className="absolute top-0 left-0 w-px h-full bg-primary/40" />
            </div>
            <div className="absolute top-0 right-0 w-8 h-8">
              <div className="absolute top-0 right-0 w-full h-px bg-primary/40" />
              <div className="absolute top-0 right-0 w-px h-full bg-primary/40" />
            </div>
            <div className="absolute bottom-0 left-0 w-8 h-8">
              <div className="absolute bottom-0 left-0 w-full h-px bg-primary/40" />
              <div className="absolute bottom-0 left-0 w-px h-full bg-primary/40" />
            </div>
            <div className="absolute bottom-0 right-0 w-8 h-8">
              <div className="absolute bottom-0 right-0 w-full h-px bg-primary/40" />
              <div className="absolute bottom-0 right-0 w-px h-full bg-primary/40" />
            </div>

            <div className="relative text-center space-y-6">
              <div className="font-serif text-2xl md:text-4xl font-bold tracking-tight">
                "EVERY TOOL IS A WEAPON"
              </div>
              <div className="w-20 h-px bg-primary/50 mx-auto" />
              <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Master craftsman's arsenal: battle-tested technologies forged in
                the fires of production, wielded with precision and purpose.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Vertical accent lines */}
      <div className="absolute top-0 bottom-0 left-[8%] w-px bg-linear-to-b from-transparent via-primary/10 to-transparent hidden xl:block" />
      <div className="absolute top-0 bottom-0 right-[8%] w-px bg-linear-to-b from-transparent via-primary/10 to-transparent hidden xl:block" />
    </section>
  );
}
