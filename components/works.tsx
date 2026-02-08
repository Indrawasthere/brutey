"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, ExternalLink, Github } from "lucide-react"
import { Layers, Zap, Target } from "lucide-react"

interface ProjectCaseStudy {
  slug: string
  title: string
  subtitle: string
  year: string
  tags: string[]
  image?: string
  link: string
  github?: string
  caseStudy: {
    problem: string
    solution: string
    impact: string
    metrics?: string[]
  }
}

const projects: ProjectCaseStudy[] = [
  {
    slug: "neural-interface",
    title: "Neural Interface",
    subtitle: "AI-Powered Design System",
    year: "2024",
    tags: ["Next.js", "OpenAI", "WebGL"],
    link: "#",
    github: "https://github.com/muhammadfadlan/neural-interface",
    caseStudy: {
      problem:
        "Design teams struggled to bridge the gap between conceptual designs and production-ready code, leading to inconsistent implementations and extended development cycles.",
      solution:
        "Built an AI-powered design system that translates natural language prompts into structured design tokens and React components with full TypeScript support.",
      impact:
        "Reduced design-to-development handoff time by 60% and improved component consistency across all product lines.",
      metrics: ["60% faster handoff", "40% fewer bugs", "500+ components"],
    },
  },
  {
    slug: "quantum-dashboard",
    title: "Quantum Dashboard",
    subtitle: "Real-Time Analytics Platform",
    year: "2024",
    tags: ["React", "D3.js", "Python"],
    link: "#",
    github: "https://github.com/muhammadfadlan/quantum-dashboard",
    caseStudy: {
      problem:
        "Business stakeholders lacked real-time visibility into key performance indicators, making data-driven decisions slower and less accurate.",
      solution:
        "Developed a real-time analytics dashboard with live data streaming, customizable widgets, and predictive insights powered by machine learning.",
      impact:
        "Enabled executives to make informed decisions 3x faster with 99.9% data accuracy and reduced reporting overhead by 80%.",
      metrics: ["3x faster decisions", "99.9% accuracy", "80% less reporting"],
    },
  },
  {
    slug: "synthetic-memory",
    title: "Synthetic Memory",
    subtitle: "Vector Database Platform",
    year: "2023",
    tags: ["TypeScript", "LangChain", "Vector DB"],
    link: "#",
    caseStudy: {
      problem:
        "Organizations faced challenges in retrieving and managing unstructured data effectively, limiting their ability to leverage institutional knowledge.",
      solution:
        "Created a semantic search platform using vector embeddings and large language models to enable natural language queries across unstructured data sources.",
      impact:
        "Improved document retrieval accuracy by 75% and reduced knowledge discovery time from hours to seconds.",
      metrics: ["75% more accurate", "90% time saved", "1M+ docs indexed"],
    },
  },
  {
    slug: "echo-protocol",
    title: "Echo Protocol",
    subtitle: "Audio Processing Engine",
    year: "2023",
    tags: ["Rust", "WebAssembly", "Audio"],
    link: "#",
    github: "https://github.com/muhammadfadlan/echo-protocol",
    caseStudy: {
      problem:
        "Web-based audio processing was limited by JavaScript's single-threaded nature, causing performance issues and poor user experience in audio-intensive applications.",
      solution:
        "Engineered a high-performance audio processing engine using Rust compiled to WebAssembly, featuring real-time effects and low-latency streaming.",
      impact:
        "Achieved 10x performance improvement over pure JavaScript solutions and enabled professional-grade audio editing directly in the browser.",
      metrics: ["10x faster", "2ms latency", "50K+ users"],
    },
  },
]

const categories = [
  { name: "All", icon: Layers },
  { name: "Frontend", icon: Zap },
  { name: "Backend", icon: Target },
  { name: "AI/ML", icon: Target },
]

export function Works() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const getFilteredProjects = () => {
    if (activeCategory === "All") return projects
    return projects.filter((p) =>
      p.tags.some((t) =>
        t.toLowerCase().includes(activeCategory.toLowerCase()),
      ),
    )
  }

  return (
    <section id="works" className="relative py-32 px-8 md:px-12">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-16"
      >
        <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-4">
          04 — SELECTED WORKS
        </p>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2 className="font-sans text-3xl md:text-5xl font-light italic">
            Case Studies
          </h2>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`group inline-flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 ${
                  activeCategory === cat.name
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-white/20 hover:border-white/40"
                }`}
              >
                <cat.icon className="w-3 h-3" />
                <span className="font-mono text-xs tracking-wider">
                  {cat.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Projects List */}
      <div>
        {getFilteredProjects().map((project, index) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className="relative border-t border-white/10 first:border-t-0"
          >
            {/* Project Row */}
            <div className="py-8 md:py-12">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                {/* Year */}
                <span className="font-mono text-xs text-muted-foreground tracking-widest order-1 md:order-none">
                  {project.year}
                </span>

                {/* Main Info */}
                <div className="flex-1 order-2 md:order-none">
                  <motion.h3
                    className="font-sans text-3xl md:text-5xl font-light tracking-tight hover:text-white/70 cursor-pointer transition-colors duration-300"
                    onClick={() =>
                      setExpandedIndex(expandedIndex === index ? null : index)
                    }
                  >
                    {project.title}
                  </motion.h3>
                  <p className="font-mono text-sm text-muted-foreground mt-1">
                    {project.subtitle}
                  </p>
                </div>

                {/* Tags & Expand */}
                <div className="flex items-center gap-4 order-3 md:order-none">
                  <div className="flex gap-2 flex-wrap">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] tracking-wider px-3 py-1 border border-white/20 rounded-full text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() =>
                      setExpandedIndex(expandedIndex === index ? null : index)
                    }
                    className="p-2 border border-white/20 rounded-full hover:bg-white/10 transition-colors"
                    aria-label="Toggle case study"
                  >
                    <motion.div
                      animate={{
                        rotate: expandedIndex === index ? 180 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <ArrowUpRight className="w-5 h-5" />
                    </motion.div>
                  </button>
                </div>
              </div>

              {/* Case Study Expansion */}
              <AnimatePresence>
                {expandedIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="overflow-hidden"
                  >
                    <div className="pt-8 pb-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                      {/* Problem */}
                      <div>
                        <h4 className="font-mono text-xs tracking-[0.2em] text-accent uppercase mb-3">
                          Problem
                        </h4>
                        <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                          {project.caseStudy.problem}
                        </p>
                      </div>

                      {/* Solution */}
                      <div>
                        <h4 className="font-mono text-xs tracking-[0.2em] text-accent uppercase mb-3">
                          Solution
                        </h4>
                        <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                          {project.caseStudy.solution}
                        </p>
                      </div>

                      {/* Impact */}
                      <div>
                        <h4 className="font-mono text-xs tracking-[0.2em] text-accent uppercase mb-3">
                          Impact
                        </h4>
                        <p className="font-mono text-sm text-muted-foreground leading-relaxed mb-4">
                          {project.caseStudy.impact}
                        </p>

                        {/* Metrics */}
                        {project.caseStudy.metrics && (
                          <div className="flex flex-wrap gap-2">
                            {project.caseStudy.metrics.map((metric) => (
                              <span
                                key={metric}
                                className="font-mono text-[10px] px-3 py-1 bg-accent/10 border border-accent/30 rounded-full text-accent"
                              >
                                {metric}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Links */}
                    <div className="flex gap-4 mt-6 pt-6 border-t border-white/10">
                      <a
                        href={project.link}
                        data-cursor-hover
                        className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 rounded-full hover:border-accent hover:bg-accent/10 transition-all duration-300"
                      >
                        <span className="font-mono text-xs tracking-wider">
                          View Project
                        </span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-cursor-hover
                          className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 rounded-full hover:border-white/40 transition-all duration-300"
                        >
                          <Github className="w-4 h-4" />
                          <span className="font-mono text-xs tracking-wider">
                            Source Code
                          </span>
                        </a>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Border */}
      <div className="border-t border-white/10" />
    </section>
  )
}

