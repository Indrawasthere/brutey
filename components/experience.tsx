"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { ArrowUpRight, Building2, Calendar } from "lucide-react"

interface Experience {
  company: string
  role: string
  period: string
  description: string
  technologies: string[]
  achievements: string[]
  location: string
}

const experiences: Experience[] = [
  {
    company: "Atreus Global",
    role: "Internal IT",
    period: "2025 — Present",
    description:
      "Leading frontend architecture and mentoring junior developers. Building scalable React applications and implementing best practices across the codebase.",
    technologies: ["Next.js", "React", "PostgreSQL", "MongoDB"],
    achievements: [
      "Reduced deployment time by 40%",
      "Mentored 5+ junior developers",
      "Implemented CI/CD pipelines",
    ],
    location: "Jakarta, Indonesia",
  },
  {
    company: "Rupa Aestetika Teknologi Aktual",
    role: "Software Engineer",
    period: "2024 — 2025",
    description:
      "Developed end-to-end web applications using modern technologies. Implemented real-time features and improved application performance by 40%.",
    technologies: ["React", "Node.js", "PostgreSQL", "AWS"],
    achievements: [
      "40% performance improvement",
      "Real-time feature implementation",
      "Client satisfaction rate 98%",
    ],
    location: "Jakarta, Indonesia",
  },
  {
    company: "Wahana Datarindo Sempurna",
    role: "Software Developer",
    period: "2023 — 2024",
    description:
      "Built responsive websites and web applications for various clients. Collaborated with designers to implement pixel-perfect UIs.",
    technologies: ["React", "Laravel", "Bootstrap", "MySQL"],
    achievements: [
      "Delivered 10+ client projects",
      "Zero critical bugs in production",
      "Best practices implementation",
    ],
    location: "Jakarta, Indonesia",
  },
]

function ExperienceCard({
  experience,
  index,
  isExpanded,
  onToggle,
}: {
  experience: Experience
  index: number
  isExpanded: boolean
  onToggle: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      {/* Main Card */}
      <div
        onClick={onToggle}
        className="relative p-8 md:p-10 border-2 border-border bg-card/30 backdrop-blur-sm cursor-pointer transition-all duration-500 hover:border-accent/50"
      >
        {/* Corner decorations */}
        <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-accent/20 group-hover:border-accent/40 transition-colors duration-300" />
        <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-accent/20 group-hover:border-accent/40 transition-colors duration-300" />
        <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-accent/20 group-hover:border-accent/40 transition-colors duration-300" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-accent/20 group-hover:border-accent/40 transition-colors duration-300" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          {/* Period */}
          <div className="lg:w-32">
            <div className="flex items-center gap-2 text-accent/70">
              <Calendar className="w-4 h-4" />
              <span className="font-mono-label text-sm tracking-wider">
                {experience.period}
              </span>
            </div>
          </div>

          {/* Company & Role */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <Building2 className="w-5 h-5 text-accent/50" />
              <h3 className="font-serif text-2xl md:text-3xl font-bold tracking-tight group-hover:text-accent/90 transition-colors duration-300">
                {experience.company}
              </h3>
            </div>
            <p className="font-mono-label text-muted-foreground uppercase tracking-wider">
              {experience.role}
            </p>
          </div>

          {/* Location */}
          <div className="lg:w-48 flex justify-end">
            <span className="text-sm text-muted-foreground">
              {experience.location}
            </span>
          </div>

          {/* Expand Icon */}
          <div className="lg:w-12 flex justify-end">
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="w-10 h-10 border border-accent/30 group-hover:border-accent flex items-center justify-center transition-colors duration-300"
            >
              <ArrowUpRight className="w-5 h-5" />
            </motion.div>
          </div>
        </div>

        {/* Technologies Preview */}
        <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-border/50">
          {experience.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs font-medium border border-border bg-background/50"
            >
              {tech}
            </span>
          ))}
          {experience.technologies.length > 4 && (
            <span className="px-3 py-1 text-xs font-medium text-muted-foreground">
              +{experience.technologies.length - 4} more
            </span>
          )}
        </div>
      </div>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <div className="pt-6 pb-2 pl-2 md:pl-4">
              {/* Description */}
              <div className="mb-8">
                <h4 className="label-caps text-accent mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent" />
                  Overview
                </h4>
                <p className="text-lg leading-relaxed text-foreground/90 max-w-3xl">
                  {experience.description}
                </p>
              </div>

              {/* Achievements */}
              <div className="mb-6">
                <h4 className="label-caps text-accent mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent" />
                  Key Achievements
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {experience.achievements.map((achievement) => (
                    <motion.div
                      key={achievement}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-3 p-4 border border-border/50 bg-background/30"
                    >
                      <div className="w-1.5 h-1.5 bg-primary" />
                      <span className="text-sm font-medium">
                        {achievement}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* All Technologies */}
              <div>
                <h4 className="label-caps text-accent mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent" />
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {experience.technologies.map((tech) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2 }}
                      className="px-4 py-2 text-sm font-medium border border-accent/30 bg-accent/5 hover:bg-accent/10 transition-colors duration-300"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function Experience() {
  const containerRef = useRef<HTMLElement>(null)
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0])

  return (
    <section
      ref={containerRef}
      id="experience"
      className="relative py-32 px-6 md:px-12 lg:px-16"
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto mb-20"
      >
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-px bg-accent" />
          <span className="label-caps text-muted-foreground">
            02 — Experience
          </span>
        </div>
        
        <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl max-w-4xl leading-tight">
          Work{" "}
          <span className="italic font-medium text-accent/90">History</span>
        </h2>
      </motion.div>

      {/* Experience Cards */}
      <div className="max-w-7xl mx-auto space-y-6">
        {experiences.map((experience, index) => (
          <ExperienceCard
            key={experience.company}
            experience={experience}
            index={index}
            isExpanded={expandedIndex === index}
            onToggle={() => setExpandedIndex(expandedIndex === index ? null : index)}
          />
        ))}
      </div>

      {/* Floating Stats */}
      <motion.div
        style={{ y, opacity }}
        className="absolute top-32 right-0 md:right-12 hidden lg:block"
      >
        <div className="flex flex-col gap-8">
          {[
            { value: "3+", label: "Years Experience" },
            { value: "25+", label: "Projects Shipped" },
            { value: "98%", label: "Client Satisfaction" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="text-right"
            >
              <div className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-accent/80">
                {stat.value}
              </div>
              <div className="font-mono-label text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Background decorative line */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden hidden md:block">
        <div className="absolute top-0 left-[20%] w-px h-full bg-linear-to-b from-transparent via-white/5 to-transparent" />
        <div className="absolute top-0 right-[25%] w-px h-full bg-linear-to-b from-transparent via-white/5 to-transparent" />
      </div>
    </section>
  )
}

