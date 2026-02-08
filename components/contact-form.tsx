"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowUpRight, Mail, Github, Linkedin, MailCheckIcon, Twitter, Instagram, ExternalLink, Send } from "lucide-react"

const socialLinks = [
  {
    name: "Mail",
    icon: MailCheckIcon,
    href: "mailto:mhmdfdln14@gmail.com",
    description: "Shoot me an email",
    color: "#2563eb",
    gradient: "from-blue-500/20 to-blue-600/5",
  },
  {
    name: "GitHub",
    icon: Github,
    href: "https://github.com/Indrawasthere",
    description: "Please don't fork me",
    color: "#ffffff",
    gradient: "from-white/10 to-white/5",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://linkedin.com/in/muhammadfadlanh",
    description: "Insecure, but let's connect",
    color: "#0077b5",
    gradient: "from-blue-400/20 to-blue-500/5",
  },
  {
    name: "Instagram",
    icon: Instagram,
    href: "https://instagram.com/mhmdfdlaan",
    description: "Don't stalk me too much",
    color: "#1da1f2",
    gradient: "from-red-500/20 to-orange-400/5",
  },
]

export function ContactForm() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="contact" className="relative py-32 px-8 md:px-12 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-accent/5 to-transparent pointer-events-none" />

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 mb-16 md:mb-24"
      >
        <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-4">
          04 — CONTACT
        </p>
        <h2 className="font-sans text-3xl md:text-5xl font-light italic">
          Let's Connect
        </h2>
      </motion.div>

      {/* Social Links Grid */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {socialLinks.map((social, index) => (
          <motion.a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: 0.1 + index * 0.1,
            }}
            className="group relative p-6 md:p-8 border border-white/10 bg-linear-to-br hover:border-white/20 transition-all duration-500 overflow-hidden"
          >
            {/* Gradient Overlay on Hover */}
            <motion.div
              className={`absolute inset-0 bg-linear-to-br ${social.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              initial={false}
              animate={
                hoveredIndex === index
                  ? { scale: [1, 1.1, 1] }
                  : { scale: 1 }
              }
              transition={{ duration: 0.5 }}
            />

            {/* Animated Border */}
            <motion.div
              className="absolute inset-0"
              style={{ padding: "1px" }}
            >
              <motion.div
                className="w-full h-full bg-linear-to-r from-transparent via-white/30 to-transparent"
                initial={{ x: "-100%" }}
                whileInView={{ x: "100%" }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 2,
                  ease: "linear",
                }}
                style={{
                  opacity: hoveredIndex === index ? 1 : 0,
                  transition: "opacity 0.3s",
                }}
              />
            </motion.div>

            {/* Content */}
            <div className="relative">
              {/* Top Row: Icon + Arrow */}
              <div className="flex items-center justify-between mb-4">
                <motion.div
                  animate={{
                    rotate: hoveredIndex === index ? 45 : 0,
                    scale: hoveredIndex === index ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <social.icon
                    className="w-6 h-6 transition-colors duration-300"
                    style={{
                      color:
                        hoveredIndex === index ? social.color : undefined,
                    }}
                  />
                </motion.div>

                <motion.div
                  animate={{
                    opacity: hoveredIndex === index ? 1 : 0,
                    x: hoveredIndex === index ? 0 : -10,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <ExternalLink
                    className="w-4 h-4"
                    style={{ color: social.color }}
                  />
                </motion.div>
              </div>

              {/* Name */}
              <h3
                className="font-sans text-xl font-light mb-1 transition-colors duration-300"
                style={{
                  color: hoveredIndex === index ? social.color : undefined,
                }}
              >
                {social.name}
              </h3>

              {/* Description */}
              <p className="font-mono text-xs text-muted-foreground">
                {social.description}
              </p>

              {/* Email or Handle */}
              {social.name === "Email" && (
                <p className="font-mono text-xs text-muted-foreground mt-2 truncate">
                  hello@muhammadfadlan.dev
                </p>
              )}
              {social.name === "Twitter" && (
                <p className="font-mono text-xs text-muted-foreground mt-2">
                  @muhammadfadlan
                </p>
              )}
              {social.name === "GitHub" && (
                <p className="font-mono text-xs text-muted-foreground mt-2">
                  @muhammadfadlan
                </p>
              )}
              {social.name === "LinkedIn" && (
                <p className="font-mono text-xs text-muted-foreground mt-2">
                  /in/muhammadfadlan
                </p>
              )}
            </div>

            {/* Corner Accent */}
            <div
              className="absolute bottom-0 right-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: `linear-gradient(135deg, transparent 50%, ${social.color}50% 100%)`,
              }}
            />
          </motion.a>
        ))}
      </div>

      {/* Availability Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="relative z-10 mt-16 p-6 border border-white/10 bg-white/[0.02 overflow-hidden"
      >
        {/* Animated Border */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-accent/50 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-accent/50 to-transparent" />
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative">
          {/* Status Indicator */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-accent" />
            </div>
            <span className="font-sans text-lg font-light">
              Available for work
            </span>
          </div>

          {/* Response Time */}
          <div className="flex items-center gap-3">
            <Send className="w-4 h-4 text-muted-foreground" />
            <span className="font-mono text-xs text-muted-foreground">
              Response time: 24-48 hours
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

