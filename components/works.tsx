"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, ExternalLink, Github } from "lucide-react"

interface Project {
  slug: string
  title: string
  subtitle: string
  year: string
  tags: string[]
  link: string
  github?: string
  description: string
  impact: string[]
}

const projects: Project[] = [
  {
    slug: "atreus-internal",
    title: "Atreus Global Platform",
    subtitle: "Internal IT Infrastructure",
    year: "2025",
    tags: ["Next.js", "PostgreSQL", "MongoDB"],
    link: "#",
    description:
      "Built comprehensive internal platform managing company operations, employee systems, and data infrastructure with modern stack.",
    impact: ["Unified 5+ systems", "90% faster workflows", "Real-time sync"],
  },
  {
    slug: "rupa-aestetika",
    title: "Rupa Aestetika Tech",
    subtitle: "Full-Stack Web Applications",
    year: "2024",
    tags: ["React", "Node.js", "PostgreSQL"],
    link: "#",
    description:
      "Developed end-to-end solutions for technology consulting firm, implementing real-time features and performance optimizations.",
    impact: ["40% perf boost", "Real-time features", "Clean architecture"],
  },
  {
    slug: "wahana-datarindo",
    title: "Wahana Datarindo",
    subtitle: "Enterprise Solutions",
    year: "2023-2024",
    tags: ["Laravel", "React", "MySQL"],
    link: "#",
    description:
      "Built responsive enterprise applications for data management solutions, collaborating with design team for pixel-perfect implementations.",
    impact: ["Multiple clients", "Scalable systems", "Best practices"],
  },
]

export function Works() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  return (
    <section 
      id="works" 
      className="relative py-32 md:py-40 px-6 md:px-12 lg:px-16 bg-gradient-to-b from-background via-card/20 to-background overflow-hidden"
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto mb-20"
      >
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-px bg-accent" />
          <span className="label-caps text-muted-foreground">
            02 — Selected Works
          </span>
        </div>
        
        <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl max-w-4xl leading-tight">
          Fortresses{" "}
          <span className="italic font-medium text-accent/90">built</span>
        </h2>
      </motion.div>

      {/* Projects List */}
      <div className="max-w-7xl mx-auto space-y-0">
        {projects.map((project, index) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.15 }}
            className="group relative border-t-2 border-border first:border-t-0"
          >
            {/* Main Project Row */}
            <div 
              className="py-12 md:py-16 cursor-pointer"
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
            >
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                {/* Year indicator */}
                <div className="lg:w-24">
                  <span className="label-caps text-accent">
                    {project.year}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <div className="flex-1">
                  <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-2 group-hover:text-accent/90 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-lg text-muted-foreground">
                    {project.subtitle}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 lg:min-w-[300px] lg:justify-end">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 border border-border text-xs font-medium uppercase tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Expand icon */}
                <div className="lg:w-12 flex justify-end">
                  <motion.div
                    animate={{
                      rotate: expandedIndex === index ? 180 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="w-10 h-10 border-2 border-accent/30 group-hover:border-accent flex items-center justify-center transition-colors duration-300"
                  >
                    <ArrowUpRight className="w-5 h-5" />
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
                    transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="overflow-hidden"
                  >
                    <div className="pt-12 pb-6 grid grid-cols-1 md:grid-cols-2 gap-12">
                      {/* Description */}
                      <div className="space-y-6">
                        <div>
                          <h4 className="label-caps text-accent mb-4">
                            Overview
                          </h4>
                          <p className="text-lg leading-relaxed text-foreground/90">
                            {project.description}
                          </p>
                        </div>

                        {/* Impact metrics */}
                        <div>
                          <h4 className="label-caps text-accent mb-4">
                            Impact
                          </h4>
                          <div className="space-y-3">
                            {project.impact.map((item) => (
                              <div key={item} className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 bg-primary" />
                                <span className="text-sm font-medium">
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
                          className="group/btn inline-flex items-center justify-between gap-4 px-6 py-4 border-2 border-accent/30 hover:border-accent bg-accent/5 hover:bg-accent/10 transition-all duration-300"
                        >
                          <span className="label-caps">
                            View Project
                          </span>
                          <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                        </a>

                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/btn inline-flex items-center justify-between gap-4 px-6 py-4 border-2 border-border hover:border-accent/50 transition-all duration-300"
                          >
                            <span className="label-caps">
                              Source Code
                            </span>
                            <Github className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom decorative line */}
      <div className="max-w-7xl mx-auto mt-20">
        <div className="h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      </div>
    </section>
  )
}