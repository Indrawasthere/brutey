"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ExternalLink, Github, Sword } from "lucide-react";

interface Project {
  slug: string;
  title: string;
  subtitle: string;
  year: string;
  tags: string[];
  link: string;
  github?: string;
  description: string;
  impact: string[];
  index: string;
}

const projects: Project[] = [
  {
    slug: "atreus-internal",
    title: "ATREUS GLOBAL",
    subtitle: "Internal IT Infrastructure",
    year: "2025",
    tags: ["NEXT.JS", "POSTGRESQL", "MONGODB"],
    link: "#",
    description:
      "Built comprehensive internal platform managing company operations, employee systems, and data infrastructure with modern stack.",
    impact: ["Unified 5+ systems", "90% faster workflows", "Real-time sync"],
    index: "I",
  },
  {
    slug: "rupa-aestetika",
    title: "RUPA AESTETIKA TECH",
    subtitle: "Full-Stack Web Applications",
    year: "2024",
    tags: ["REACT", "NODE.JS", "POSTGRESQL"],
    link: "#",
    description:
      "Developed end-to-end solutions for technology consulting firm, implementing real-time features and performance optimizations.",
    impact: ["40% perf boost", "Real-time features", "Clean architecture"],
    index: "II",
  },
  {
    slug: "wahana-datarindo",
    title: "WAHANA DATARINDO",
    subtitle: "Enterprise Solutions",
    year: "2023-2024",
    tags: ["LARAVEL", "REACT", "MYSQL"],
    link: "#",
    description:
      "Built responsive enterprise applications for data management solutions, collaborating with design team for pixel-perfect implementations.",
    impact: ["Multiple clients", "Scalable systems", "Best practices"],
    index: "III",
  },
];

export function Works() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section
      id="works"
      className="relative py-32 md:py-40 px-6 md:px-12 lg:px-16 bg-background overflow-hidden"
    >
      {/* Brutal Grid Background */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(to right, var(--border) 1px, transparent 1px),
            linear-gradient(to bottom, var(--border) 1px, transparent 1px)
          `,
            backgroundSize: "70px 70px",
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
              IV — CRAFTMASTER
            </motion.span>
          </div>

          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl max-w-5xl leading-[0.95] tracking-tight text-foreground">
            FORTRESSES
            <br />
            <span className="text-primary italic font-light">BUILT</span>
            <br />
          </h2>
        </div>
      </motion.div>

      {/* Projects List - More brutal */}
      <div className="max-w-7xl mx-auto space-y-0 border-2 border-border">
        {projects.map((project, index) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className="group relative border-b-2 border-border last:border-b-0"
          >
            {/* Main Project Row */}
            <div
              className="relative py-12 md:py-16 px-8 md:px-12 cursor-pointer bg-background hover:bg-card/30 transition-all duration-500"
              onClick={() =>
                setExpandedIndex(expandedIndex === index ? null : index)
              }
            >
              {/* Project number - large background */}
              <div className="absolute top-4 right-4 md:top-8 md:right-8 font-serif text-6xl md:text-8xl font-bold text-primary/5 leading-none pointer-events-none">
                {project.index}
              </div>

              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-8 h-8">
                <div className="absolute top-0 left-0 w-full h-px bg-primary/30 group-hover:bg-primary transition-colors duration-300" />
                <div className="absolute top-0 left-0 w-px h-full bg-primary/30 group-hover:bg-primary transition-colors duration-300" />
              </div>

              <div className="relative flex flex-col gap-6">
                {/* Year & Index */}
                <div className="flex items-center gap-4">
                  <span className="font-sans text-xs text-primary/60 tracking-[0.3em]">
                    [{project.index}]
                  </span>
                  <div className="w-8 h-px bg-primary/30" />
                  <span className="label-caps text-primary">
                    {project.year}
                  </span>
                </div>

                {/* Title */}
                <div>
                  <h3 className="font-sans text-3xl md:text-5xl lg:text-6xl font-bold tracking-wider uppercase mb-3 group-hover:text-primary/90 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-lg md:text-xl text-muted-foreground font-light">
                    {project.subtitle}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-3">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 border-2 border-border text-xs font-bold uppercase tracking-wider hover:border-primary/50 transition-colors duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Expand indicator */}
                <div className="flex items-center gap-3 mt-2">
                  <Sword className="w-4 h-4 text-primary/50" />
                  <span className="label-caps text-primary/60">
                    {expandedIndex === index
                      ? "COLLAPSE DETAILS"
                      : "EXPAND DETAILS"}
                  </span>
                  <motion.div
                    animate={{
                      rotate: expandedIndex === index ? 180 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <ArrowUpRight className="w-5 h-5 text-primary/50" />
                  </motion.div>
                </div>
              </div>

              {/* Expanded Content */}
              <AnimatePresence>
                {expandedIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      duration: 0.5,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    className="overflow-hidden"
                  >
                    <div className="pt-12 mt-8 border-t-2 border-border">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Description */}
                        <div className="space-y-6">
                          <div>
                            <h4 className="label-caps text-primary mb-4 flex items-center gap-3">
                              <div className="w-2 h-2 bg-primary" />
                              OVERVIEW
                            </h4>
                            <p className="text-base md:text-lg leading-relaxed text-foreground/90">
                              {project.description}
                            </p>
                          </div>

                          {/* Impact metrics */}
                          <div>
                            <h4 className="label-caps text-primary mb-4 flex items-center gap-3">
                              <div className="w-2 h-2 bg-primary" />
                              IMPACT
                            </h4>
                            <div className="space-y-3">
                              {project.impact.map((item) => (
                                <div
                                  key={item}
                                  className="flex items-start gap-4 p-3 border border-border/50 bg-background/50"
                                >
                                  <div className="w-1.5 h-1.5 bg-primary mt-2" />
                                  <span className="text-sm font-medium flex-1">
                                    {item}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col justify-end gap-4">
                          <a
                            href={project.link}
                            className="group/btn relative flex items-center justify-between gap-4 px-8 py-6 border-4 border-primary/30 hover:border-primary bg-primary/5 hover:bg-primary/10 transition-all duration-300"
                          >
                            <span className="font-sans text-sm font-bold tracking-wider uppercase">
                              VIEW PROJECT
                            </span>
                            <ExternalLink className="w-5 h-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                          </a>

                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group/btn relative flex items-center justify-between gap-4 px-8 py-6 border-2 border-border hover:border-primary/50 transition-all duration-300"
                            >
                              <span className="label-caps">SOURCE CODE</span>
                              <Github className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Bottom corner */}
              <div className="absolute bottom-0 right-0 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 right-0 w-full h-px bg-primary/30" />
                <div className="absolute bottom-0 right-0 w-px h-full bg-primary/30" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Vertical accent lines */}
      <div className="absolute top-0 bottom-0 left-[12%] w-px bg-linear-to-b from-transparent via-primary/10 to-transparent hidden xl:block" />
      <div className="absolute top-0 bottom-0 right-[12%] w-px bg-linear-to-b from-transparent via-primary/10 to-transparent hidden xl:block" />
    </section>
  );
}
