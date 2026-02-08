"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Github, Linkedin, Instagram, Send, ArrowUpRight } from "lucide-react"

const socialLinks = [
  {
    name: "Email",
    icon: Mail,
    href: "mailto:mhmdfdln14@gmail.com",
    handle: "mhmdfdln14@gmail.com",
    color: "#52525b",
  },
  {
    name: "GitHub",
    icon: Github,
    href: "https://github.com/Indrawasthere",
    handle: "@Indrawasthere",
    color: "#71717a",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://linkedin.com/in/muhammadfadlanh",
    handle: "/in/muhammadfadlanh",
    color: "#52525b",
  },
  {
    name: "Instagram",
    icon: Instagram,
    href: "https://instagram.com/mhmdfdlaan",
    handle: "@mhmdfdlaan",
    color: "#71717a",
  },
]

export function Contact() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section 
      id="contact" 
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
            03 — Contact
          </span>
        </div>
        
        <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl max-w-4xl leading-tight">
          Let's forge{" "}
          <span className="italic font-medium text-accent/90">something</span>
        </h2>
      </motion.div>

      {/* Social Links Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {socialLinks.map((social, index) => (
          <motion.a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group relative p-8 md:p-12 border-2 border-border hover:border-accent/50 bg-card/30 backdrop-blur-sm transition-all duration-500"
          >
            {/* Corner accents */}
            <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-accent/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-accent/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Content */}
            <div className="flex items-start justify-between gap-6">
              <div className="flex-1 space-y-3">
                {/* Icon */}
                <motion.div
                  animate={{
                    scale: hoveredIndex === index ? 1.1 : 1,
                    rotate: hoveredIndex === index ? 5 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="w-12 h-12 border-2 border-accent/30 group-hover:border-accent flex items-center justify-center transition-colors duration-300"
                >
                  <social.icon className="w-6 h-6 text-accent/70 group-hover:text-accent transition-colors" />
                </motion.div>

                {/* Name */}
                <h3 className="font-serif text-2xl md:text-3xl font-bold">
                  {social.name}
                </h3>

                {/* Handle */}
                <p className="text-sm text-muted-foreground font-medium">
                  {social.handle}
                </p>
              </div>

              {/* Arrow */}
              <motion.div
                animate={{
                  x: hoveredIndex === index ? 4 : 0,
                  y: hoveredIndex === index ? -4 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                <ArrowUpRight className="w-6 h-6 text-accent/50 group-hover:text-accent transition-colors" />
              </motion.div>
            </div>

            {/* Hover underline */}
            <div className="mt-6 h-0.5 bg-accent/30 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </motion.a>
        ))}
      </div>

      {/* Availability Status */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="max-w-7xl mx-auto relative p-8 md:p-12 border-2 border-border bg-card/50 backdrop-blur-sm"
      >
        {/* Decorative corners */}
        <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-accent/40" />
        <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-accent/40" />
        <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-accent/40" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-accent/40" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Status */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-primary animate-ping opacity-50" />
              <div className="relative w-3 h-3 bg-primary" />
            </div>
            <div>
              <span className="label-caps text-accent block mb-1">
                Current Status
              </span>
              <p className="font-sans text-xl md:text-2xl font-semibold">
                Available for Work
              </p>
            </div>
          </div>

          {/* Response time */}
          <div className="flex items-center gap-3 px-6 py-3 border border-border">
            <Send className="w-4 h-4 text-muted-foreground" />
            <span className="label-caps text-muted-foreground">
              Response: 24-48 hours
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  )
}