"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Github,
  Linkedin,
  Instagram,
  Send,
  ArrowUpRight,
  Zap,
} from "lucide-react";

const socialLinks = [
  {
    name: "EMAIL",
    icon: Mail,
    href: "mailto:mhmdfdln14@gmail.com",
    handle: "mhmdfdln14@gmail.com",
    index: "01",
  },
  {
    name: "GITHUB",
    icon: Github,
    href: "https://github.com/Indrawasthere",
    handle: "@Indrawasthere",
    index: "02",
  },
  {
    name: "LINKEDIN",
    icon: Linkedin,
    href: "https://linkedin.com/in/muhammadfadlanh",
    handle: "/in/muhammadfadlanh",
    index: "03",
  },
  {
    name: "INSTAGRAM",
    icon: Instagram,
    href: "https://instagram.com/mhmdfdlaan",
    handle: "@mhmdfdlaan",
    index: "04",
  },
];

export function Contact() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      id="contact"
      className="relative py-32 md:py-40 px-6 md:px-12 lg:px-16 bg-background"
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
            backgroundSize: "60px 60px",
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
          04
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
              VI — LETTERS
            </motion.span>
          </div>

          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl max-w-5xl leading-[0.95] tracking-tight text-foreground">
            Let's forge
            <br />
            <span className="text-primary italic font-light">SOMETHING</span>
            <br />
            BIG
          </h2>
        </div>
      </motion.div>

      {/* Social Links Grid - EPIC HOVER EFFECTS! */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-0 mb-20 border-2 border-border">
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
            className="group relative p-10 md:p-14 border-border border-r-2 border-b-2 last:border-r-0 md:even:border-r-0 transition-all duration-500 overflow-hidden cursor-pointer"
          >
            {/* EPIC BACKGROUND COLOR CHANGE - kayak footer! */}
            <motion.div
              className="absolute inset-0 bg-primary"
              initial={{ x: "-100%" }}
              animate={{ x: hoveredIndex === index ? "0%" : "-100%" }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            />

            {/* Content */}
            <div className="relative">
              {/* Index number */}
              <motion.div
                className="absolute top-0 right-0 font-mono text-xs tracking-[0.3em]"
                animate={{
                  color:
                    hoveredIndex === index
                      ? "#0a0a0a"
                      : "rgba(124, 45, 18, 0.4)",
                }}
                transition={{ duration: 0.3 }}
              >
                [{social.index}]
              </motion.div>

              {/* Corner decorations */}
              <div className="absolute top-0 left-0 w-8 h-8">
                <motion.div
                  className="absolute top-0 left-0 w-full h-px"
                  animate={{
                    backgroundColor:
                      hoveredIndex === index
                        ? "#0a0a0a"
                        : "rgba(124, 45, 18, 0.3)",
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="absolute top-0 left-0 w-px h-full"
                  animate={{
                    backgroundColor:
                      hoveredIndex === index
                        ? "#0a0a0a"
                        : "rgba(124, 45, 18, 0.3)",
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Content */}
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1 space-y-4">
                  {/* Icon with cool rotation */}
                  <motion.div
                    animate={{
                      scale: hoveredIndex === index ? 1.1 : 1,
                      rotate: hoveredIndex === index ? 360 : 0,
                    }}
                    transition={{ duration: 0.6 }}
                    className="w-14 h-14 border-2 flex items-center justify-center transition-colors duration-300"
                    style={{
                      borderColor:
                        hoveredIndex === index
                          ? "#0a0a0a"
                          : "rgba(124, 45, 18, 0.3)",
                    }}
                  >
                    <motion.div
                      animate={{
                        color:
                          hoveredIndex === index
                            ? "#0a0a0a"
                            : "rgba(124, 45, 18, 0.7)",
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <social.icon className="w-7 h-7" />
                    </motion.div>
                  </motion.div>

                  {/* Name */}
                  <motion.h3
                    className="font-sans text-2xl md:text-3xl font-bold tracking-wider uppercase"
                    animate={{
                      color: hoveredIndex === index ? "#0a0a0a" : "#d4d4d8",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {social.name}
                  </motion.h3>

                  <motion.div
                    className="w-16 h-px"
                    animate={{
                      backgroundColor:
                        hoveredIndex === index
                          ? "#0a0a0a"
                          : "rgba(124, 45, 18, 0.5)",
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Handle */}
                  <motion.p
                    className="text-sm font-mono tracking-wide"
                    animate={{
                      color:
                        hoveredIndex === index
                          ? "rgba(10, 10, 10, 0.7)"
                          : "#71717a",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {social.handle}
                  </motion.p>
                </div>

                {/* Arrow with diagonal movement */}
                <motion.div
                  animate={{
                    x: hoveredIndex === index ? 6 : 0,
                    y: hoveredIndex === index ? -6 : 0,
                    rotate: hoveredIndex === index ? 45 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    animate={{
                      color:
                        hoveredIndex === index
                          ? "#0a0a0a"
                          : "rgba(124, 45, 18, 0.5)",
                    }}
                  >
                    <ArrowUpRight className="w-6 h-6" />
                  </motion.div>
                </motion.div>
              </div>

              {/* Bottom corner */}
              <div className="absolute bottom-0 right-0 w-6 h-6">
                <motion.div
                  className="absolute bottom-0 right-0 w-full h-px"
                  animate={{
                    opacity: hoveredIndex === index ? 1 : 0,
                    backgroundColor:
                      hoveredIndex === index
                        ? "rgba(10, 10, 10, 0.3)"
                        : "rgba(124, 45, 18, 0.3)",
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="absolute bottom-0 right-0 w-px h-full"
                  animate={{
                    opacity: hoveredIndex === index ? 1 : 0,
                    backgroundColor:
                      hoveredIndex === index
                        ? "rgba(10, 10, 10, 0.3)"
                        : "rgba(124, 45, 18, 0.3)",
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          </motion.a>
        ))}
      </div>

      {/* Availability Status - More geometric */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="max-w-7xl mx-auto relative border-4 border-border bg-card/80 backdrop-blur-sm"
      >
        {/* Triple frame */}
        <div className="absolute inset-0 border-2 border-primary/10 m-2 pointer-events-none" />
        <div className="absolute inset-0 border border-primary/5 m-4 pointer-events-none" />

        {/* Decorative corners */}
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

        <div className="relative p-10 md:p-16">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            {/* Status with pulse animation */}
            <div className="flex items-center gap-6">
              <div className="relative w-12 h-12 border-2 border-primary/30 flex items-center justify-center">
                <div className="relative">
                  <motion.div
                    className="absolute inset-0 bg-primary"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <div className="relative w-4 h-4 bg-primary" />
                </div>
              </div>
              <div>
                <span className="label-caps font-sans text-sm tracking-[0.3em] text-stone-400 uppercase block mb-2">
                  CURRENT STATUS
                </span>
                <p className="font-serif text-2xl md:text-3xl font-bold tracking-wide uppercase">
                  AVAILABLE FOR BATTLE
                </p>
              </div>
            </div>

            {/* Response time with icon */}
            <div className="flex items-center gap-4 px-8 py-4 border-2 border-border bg-background/50">
              <Zap className="w-5 h-5 text-primary animate-pulse" />
              <div>
                <div className="label-caps text-primary/60 text-[10px] mb-1">
                  RESPONSE TIME
                </div>
                <div className="font-mono text-sm font-bold">24-48 HOURS</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Vertical accent lines */}
      <div className="absolute top-0 bottom-0 left-[10%] w-px bg-linear-to-b from-transparent via-primary/10 to-transparent hidden xl:block" />
      <div className="absolute top-0 bottom-0 right-[10%] w-px bg-linear-to-b from-transparent via-primary/10 to-transparent hidden xl:block" />
    </section>
  );
}
