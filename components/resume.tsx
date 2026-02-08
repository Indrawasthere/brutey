"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Download, FileText, ArrowUpRight } from "lucide-react"

export function Resume() {
  const [downloadHovered, setDownloadHovered] = useState(false)
  const [previewHovered, setPreviewHovered] = useState(false)

  return (
    <section 
      id="resume" 
      className="relative py-32 md:py-40 px-6 md:px-12 lg:px-16 bg-gradient-to-b from-background via-card/30 to-background"
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
            04 — Resume
          </span>
        </div>
        
        <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl max-w-4xl leading-tight">
          Download{" "}
          <span className="italic font-medium text-accent/90">My CV</span>
        </h2>
      </motion.div>

      {/* Resume Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Download Resume Card */}
        <motion.a
          href="/fadlan_resume.pdf"
          download
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onMouseEnter={() => setDownloadHovered(true)}
          onMouseLeave={() => setDownloadHovered(false)}
          className="group relative p-8 md:p-12 border-2 border-border hover:border-accent/50 bg-card/30 backdrop-blur-sm transition-all duration-500"
        >
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-accent/30" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-accent/30" />
          
          {/* Content */}
          <div className="flex items-start justify-between gap-6">
            <div className="flex-1 space-y-4">
              {/* Icon */}
              <motion.div
                animate={{
                  scale: downloadHovered ? 1.1 : 1,
                }}
                transition={{ duration: 0.3 }}
                className="w-14 h-14 border-2 border-accent/30 group-hover:border-accent flex items-center justify-center transition-colors duration-300"
              >
                <Download className="w-7 h-7 text-accent/70 group-hover:text-accent transition-colors" />
              </motion.div>

              {/* Title */}
              <h3 className="font-serif text-3xl md:text-4xl font-bold">
                Full Resume
              </h3>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed">
                Complete work history, skills, and achievements. PDF format ready for printing or sharing.
              </p>

              {/* Stats */}
              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-accent/50" />
                  <span className="font-mono-label text-xs text-muted-foreground">
                    2 Pages
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="label-caps text-accent">
                    Updated 2025
                  </span>
                </div>
              </div>
            </div>

            {/* Arrow */}
            <motion.div
              animate={{
                x: downloadHovered ? 4 : 0,
                y: downloadHovered ? -4 : 0,
              }}
              transition={{ duration: 0.3 }}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ArrowUpRight className="w-8 h-8 text-accent" />
            </motion.div>
          </div>

          {/* Hover underline */}
          <div className="mt-6 h-0.5 bg-accent/30 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
        </motion.a>

        {/* Preview Card */}
        <motion.a
          href="/fadlan_resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          onMouseEnter={() => setPreviewHovered(true)}
          onMouseLeave={() => setPreviewHovered(false)}
          className="group relative p-8 md:p-12 border-2 border-border hover:border-accent/50 bg-card/30 backdrop-blur-sm transition-all duration-500"
        >
          {/* Corner accents */}
          <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-accent/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-accent/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Content */}
          <div className="flex items-start justify-between gap-6">
            <div className="flex-1 space-y-4">
              {/* Icon */}
              <motion.div
                animate={{
                  scale: previewHovered ? 1.1 : 1,
                }}
                transition={{ duration: 0.3 }}
                className="w-14 h-14 border-2 border-accent/30 group-hover:border-accent flex items-center justify-center transition-colors duration-300"
              >
                <FileText className="w-7 h-7 text-accent/70 group-hover:text-accent transition-colors" />
              </motion.div>

              {/* Title */}
              <h3 className="font-serif text-3xl md:text-4xl font-bold">
                Quick Preview
              </h3>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed">
                View resume directly in browser. Perfect for quick reference or sharing link with recruiters.
              </p>

              {/* CTA */}
              <div className="flex items-center gap-2 pt-4">
                <span className="label-caps text-accent">
                  Open Preview
                </span>
                <ArrowUpRight className="w-4 h-4 text-accent" />
              </div>
            </div>

            {/* Arrow */}
            <motion.div
              animate={{
                x: previewHovered ? 4 : 0,
                y: previewHovered ? -4 : 0,
              }}
              transition={{ duration: 0.3 }}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ArrowUpRight className="w-8 h-8 text-accent" />
            </motion.div>
          </div>

          {/* Hover underline */}
          <div className="mt-6 h-0.5 bg-accent/30 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
        </motion.a>
      </div>

      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="max-w-7xl mx-auto mt-20"
      >
        <div className="relative p-8 md:p-12 border-2 border-border bg-card/50 backdrop-blur-sm">
          {/* Decorative corners */}
          <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-accent/40" />
          <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-accent/40" />
          <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-accent/40" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-accent/40" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "3+", label: "Years Experience" },
              { value: "25+", label: "Projects Shipped" },
              { value: "10+", label: "Technologies" },
              { value: "100%", label: "Client Satisfaction" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="text-center"
              >
                <div className="font-serif text-4xl md:text-5xl font-bold text-accent/90 mb-2">
                  {stat.value}
                </div>
                <div className="font-mono-label text-xs tracking-widest text-muted-foreground uppercase">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}

