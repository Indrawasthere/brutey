"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"

interface Experience {
  company: string
  role: string
  period: string
  description: string
  technologies: string[]
}

const experiences: Experience[] = [
  {
    company: "Atreus Global",
    role: "Internal IT",
    period: "2025 — Present",
    description:
      "Leading frontend architecture and mentoring junior developers. Building scalable React applications and implementing best practices across the codebase.",
    technologies: ["Next.js", "React", "PostgreSQL", "MongoDB"],
  },
  {
    company: "Rupa Aestetika Teknologi Aktual",
    role: "Software Engineer",
    period: "August 2024 — August 2025",
    description:
      "Developed end-to-end web applications using modern technologies. Implemented real-time features and improved application performance by 40%.",
    technologies: ["React", "Node.js", "PostgreSQL", "AWS"],
  },
  {
    company: "Wahana Datarindo Sempurna",
    role: "Software Developer",
    period: "October 2023 — August 2024",
    description:
      "Built responsive websites and web applications for various clients. Collaborated with designers to implement pixel-perfect UIs.",
    technologies: ["React", "Laravel", "Boostrap", "MySQL"],
  },
]

function ExperienceCard({
  experience,
  index,
}: {
  experience: Experience
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative pl-8 md:pl-12 border-l border-white/10 pb-12 last:pb-0"
    >
      {/* Timeline dot */}
      <div className="absolute left-5px top-0 w-2.5 h-2.5 rounded-full bg-accent" />

      {/* Period */}
      <span className="font-mono text-xs tracking-widest text-accent mb-2 block">
        {experience.period}
      </span>

      {/* Company & Role */}
      <h3 className="font-sans text-2xl md:text-3xl font-light mb-1">
        {experience.company}
      </h3>
      <p className="font-mono text-sm text-muted-foreground mb-4">
        {experience.role}
      </p>

      {/* Description */}
      <p className="font-mono text-sm text-muted-foreground leading-relaxed mb-4 max-w-2xl">
        {experience.description}
      </p>

      {/* Technologies */}
      <div className="flex flex-wrap gap-2">
        {experience.technologies.map((tech) => (
          <span
            key={tech}
            className="font-mono text-[10px] px-3 py-1 border border-white/10 rounded-full text-muted-foreground"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

export function Experience() {
  const containerRef = useRef<HTMLElement>(null)
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
      className="relative py-32 px-8 md:px-12"
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-16"
      >
        <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-4">
          03 — EXPERIENCE
        </p>
        <h2 className="font-sans text-3xl md:text-5xl font-light italic">
          Work History
        </h2>
      </motion.div>

      {/* Experience Timeline */}
      <div className="max-w-4xl">
        {experiences.map((experience, index) => (
          <ExperienceCard key={experience.company} experience={experience} index={index} />
        ))}
      </div>

      {/* Floating Stats */}
      <motion.div
        style={{ y, opacity }}
        className="absolute top-1/4 right-0 md:right-12 hidden lg:block"
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
              <div className="font-sans text-4xl md:text-5xl font-light tracking-tight">
                {stat.value}
              </div>
              <div className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-px h-full bg-linear-to-b from-transparent via-white/5 to-transparent" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-linear-to-b from-transparent via-white/5 to-transparent" />
      </div>
    </section>
  )
}

