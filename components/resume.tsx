"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Download, FileText, ArrowUpRight, Shield, Target } from "lucide-react";

export function Resume() {
  const [downloadHovered, setDownloadHovered] = useState(false);
  const [previewHovered, setPreviewHovered] = useState(false);

  return (
    <section
      id="resume"
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
              V — RESUME
            </motion.span>
          </div>

          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl max-w-5xl leading-[0.95] tracking-tight text-foreground">
            BATTLE
            <br />
            <span className="text-primary italic font-light">RECORDS</span>
            <br />
          </h2>
        </div>
      </motion.div>

      {/* Resume Cards - EPIC HOVER EFFECTS! */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-0 mb-24 border-2 border-border">
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
          className="group relative p-10 md:p-14 border-r-2 md:border-r-2 border-b-2 md:border-b-0 border-border transition-all duration-500 overflow-hidden cursor-pointer"
        >
          {/* EPIC BACKGROUND - diagonal sweep */}
          <motion.div
            className="absolute inset-0 bg-primary"
            initial={{ x: "-100%", y: "100%" }}
            animate={{
              x: downloadHovered ? "0%" : "-100%",
              y: downloadHovered ? "0%" : "100%",
            }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          />

          {/* Content */}
          <div className="relative">
            {/* Index */}
            <motion.div
              className="absolute top-0 right-0 font-sans text-xs tracking-[0.3em]"
              animate={{
                color: downloadHovered ? "#0a0a0a" : "rgba(124, 45, 18, 0.4)",
              }}
              transition={{ duration: 0.3 }}
            >
              [01]
            </motion.div>

            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-8 h-8">
              <motion.div
                className="absolute top-0 left-0 w-full h-px"
                animate={{
                  backgroundColor: downloadHovered
                    ? "#0a0a0a"
                    : "rgba(124, 45, 18, 0.3)",
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="absolute top-0 left-0 w-px h-full"
                animate={{
                  backgroundColor: downloadHovered
                    ? "#0a0a0a"
                    : "rgba(124, 45, 18, 0.3)",
                }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Content */}
            <div className="flex flex-col gap-6">
              {/* Icon with bounce */}
              <motion.div
                animate={{
                  scale: downloadHovered ? 1.1 : 1,
                  y: downloadHovered ? -5 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="w-16 h-16 border-2 flex items-center justify-center transition-colors duration-300"
                style={{
                  borderColor: downloadHovered
                    ? "#0a0a0a"
                    : "rgba(124, 45, 18, 0.3)",
                }}
              >
                <motion.div
                  animate={{
                    color: downloadHovered
                      ? "#0a0a0a"
                      : "rgba(124, 45, 18, 0.7)",
                  }}
                >
                  <Download className="w-8 h-8" />
                </motion.div>
              </motion.div>

              {/* Title */}
              <motion.h3
                className="font-sans text-3xl md:text-4xl font-bold tracking-wider uppercase"
                animate={{
                  color: downloadHovered ? "#0a0a0a" : "#d4d4d8",
                }}
                transition={{ duration: 0.3 }}
              >
                FULL RESUME
              </motion.h3>

              <motion.div
                className="w-16 h-px"
                animate={{
                  backgroundColor: downloadHovered
                    ? "#0a0a0a"
                    : "rgba(124, 45, 18, 0.5)",
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Description */}
              <motion.p
                className="text-sm md:text-base leading-relaxed"
                animate={{
                  color: downloadHovered ? "rgba(10, 10, 10, 0.7)" : "#71717a",
                }}
                transition={{ duration: 0.3 }}
              >
                Complete work history, skills, and achievements. PDF format
                ready for printing or sharing with commanders.
              </motion.p>

              {/* Stats */}
              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{
                      color: downloadHovered
                        ? "#0a0a0a"
                        : "rgba(124, 45, 18, 0.5)",
                    }}
                  >
                    <FileText className="w-4 h-4" />
                  </motion.div>
                  <motion.span
                    className="font-sans text-xs tracking-wider"
                    animate={{
                      color: downloadHovered ? "#0a0a0a" : "#d4d4d8",
                    }}
                  >
                    2 PAGES
                  </motion.span>
                </div>
                <div className="w-px h-4 bg-border" />
                <motion.span
                  className="label-caps text-[10px]"
                  animate={{
                    color: downloadHovered
                      ? "rgba(10, 10, 10, 0.8)"
                      : "rgba(124, 45, 18, 0.8)",
                  }}
                >
                  UPDATED 2025
                </motion.span>
              </div>

              {/* Arrow */}
              <div className="flex items-center gap-3 mt-2">
                <motion.div
                  animate={{
                    color: downloadHovered
                      ? "#0a0a0a"
                      : "rgba(124, 45, 18, 0.5)",
                  }}
                >
                  <Shield className="w-4 h-4" />
                </motion.div>
                <motion.span
                  className="label-caps"
                  animate={{
                    color: downloadHovered
                      ? "rgba(10, 10, 10, 0.6)"
                      : "rgba(124, 45, 18, 0.6)",
                  }}
                >
                  DOWNLOAD PDF
                </motion.span>
                <motion.div
                  animate={{
                    x: downloadHovered ? 4 : 0,
                    y: downloadHovered ? -4 : 0,
                    color: downloadHovered
                      ? "#0a0a0a"
                      : "rgba(124, 45, 18, 0.5)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowUpRight className="w-5 h-5" />
                </motion.div>
              </div>
            </div>

            {/* Bottom corner */}
            <div className="absolute bottom-0 right-0 w-6 h-6">
              <motion.div
                className="absolute bottom-0 right-0 w-full h-px"
                animate={{
                  opacity: downloadHovered ? 1 : 0,
                  backgroundColor: downloadHovered
                    ? "rgba(10, 10, 10, 0.3)"
                    : "rgba(124, 45, 18, 0.3)",
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="absolute bottom-0 right-0 w-px h-full"
                animate={{
                  opacity: downloadHovered ? 1 : 0,
                  backgroundColor: downloadHovered
                    ? "rgba(10, 10, 10, 0.3)"
                    : "rgba(124, 45, 18, 0.3)",
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </motion.a>

        {/* Preview Card - mirrored effect */}
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
          className="group relative p-10 md:p-14 border-b-2 md:border-b-0 border-border transition-all duration-500 overflow-hidden cursor-pointer"
        >
          {/* EPIC BACKGROUND - diagonal sweep from opposite */}
          <motion.div
            className="absolute inset-0 bg-primary"
            initial={{ x: "100%", y: "100%" }}
            animate={{
              x: previewHovered ? "0%" : "100%",
              y: previewHovered ? "0%" : "100%",
            }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          />

          {/* Content - same pattern as download card */}
          <div className="relative">
            <motion.div
              className="absolute top-0 right-0 font-sans text-xs tracking-[0.3em]"
              animate={{
                color: previewHovered ? "#0a0a0a" : "rgba(124, 45, 18, 0.4)",
              }}
              transition={{ duration: 0.3 }}
            >
              [02]
            </motion.div>

            <div className="absolute top-0 right-0 w-8 h-8">
              <motion.div
                className="absolute top-0 right-0 w-full h-px"
                animate={{
                  backgroundColor: previewHovered
                    ? "#0a0a0a"
                    : "rgba(124, 45, 18, 0.3)",
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="absolute top-0 right-0 w-px h-full"
                animate={{
                  backgroundColor: previewHovered
                    ? "#0a0a0a"
                    : "rgba(124, 45, 18, 0.3)",
                }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <div className="flex flex-col gap-6">
              <motion.div
                animate={{
                  scale: previewHovered ? 1.1 : 1,
                  y: previewHovered ? -5 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="w-16 h-16 border-2 flex items-center justify-center transition-colors duration-300"
                style={{
                  borderColor: previewHovered
                    ? "#0a0a0a"
                    : "rgba(124, 45, 18, 0.3)",
                }}
              >
                <motion.div
                  animate={{
                    color: previewHovered
                      ? "#0a0a0a"
                      : "rgba(124, 45, 18, 0.7)",
                  }}
                >
                  <FileText className="w-8 h-8" />
                </motion.div>
              </motion.div>

              <motion.h3
                className="font-sans text-3xl md:text-4xl font-bold tracking-wider uppercase"
                animate={{
                  color: previewHovered ? "#0a0a0a" : "#d4d4d8",
                }}
                transition={{ duration: 0.3 }}
              >
                QUICK PREVIEW
              </motion.h3>

              <motion.div
                className="w-16 h-px"
                animate={{
                  backgroundColor: previewHovered
                    ? "#0a0a0a"
                    : "rgba(124, 45, 18, 0.5)",
                }}
                transition={{ duration: 0.3 }}
              />

              <motion.p
                className="text-sm md:text-base leading-relaxed"
                animate={{
                  color: previewHovered ? "rgba(10, 10, 10, 0.7)" : "#71717a",
                }}
                transition={{ duration: 0.3 }}
              >
                View resume directly in browser. Perfect for quick reference or
                sharing link with recruiters on the battlefield.
              </motion.p>

              <div className="flex items-center gap-3 pt-4">
                <motion.div
                  animate={{
                    color: previewHovered
                      ? "#0a0a0a"
                      : "rgba(124, 45, 18, 0.5)",
                  }}
                >
                  <Target className="w-4 h-4" />
                </motion.div>
                <motion.span
                  className="label-caps"
                  animate={{
                    color: previewHovered
                      ? "rgba(10, 10, 10, 0.6)"
                      : "rgba(124, 45, 18, 0.6)",
                  }}
                >
                  OPEN PREVIEW
                </motion.span>
                <motion.div
                  animate={{
                    x: previewHovered ? 4 : 0,
                    y: previewHovered ? -4 : 0,
                    color: previewHovered
                      ? "#0a0a0a"
                      : "rgba(124, 45, 18, 0.5)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowUpRight className="w-5 h-5" />
                </motion.div>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 w-6 h-6">
              <motion.div
                className="absolute bottom-0 left-0 w-full h-px"
                animate={{
                  opacity: previewHovered ? 1 : 0,
                  backgroundColor: previewHovered
                    ? "rgba(10, 10, 10, 0.3)"
                    : "rgba(124, 45, 18, 0.3)",
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="absolute bottom-0 left-0 w-px h-full"
                animate={{
                  opacity: previewHovered ? 1 : 0,
                  backgroundColor: previewHovered
                    ? "rgba(10, 10, 10, 0.3)"
                    : "rgba(124, 45, 18, 0.3)",
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </motion.a>
      </div>

      {/* Summary Stats - Monolithic block with count-up animation */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="max-w-7xl mx-auto"
      >
        <div className="relative border-4 border-border bg-card/80 backdrop-blur-sm">
          <div className="absolute inset-0 border-2 border-primary/10 m-2 pointer-events-none" />
          <div className="absolute inset-0 border border-primary/5 m-4 pointer-events-none" />

          {/* Decorative corners */}
          <div className="absolute top-0 left-0 w-10 h-10">
            <div className="absolute top-0 left-0 w-full h-px bg-primary/40" />
            <div className="absolute top-0 left-0 w-px h-full bg-primary/40" />
          </div>
          <div className="absolute top-0 right-0 w-10 h-10">
            <div className="absolute top-0 right-0 w-full h-px bg-primary/40" />
            <div className="absolute top-0 right-0 w-px h-full bg-primary/40" />
          </div>
          <div className="absolute bottom-0 left-0 w-10 h-10">
            <div className="absolute bottom-0 left-0 w-full h-px bg-primary/40" />
            <div className="absolute bottom-0 left-0 w-px h-full bg-primary/40" />
          </div>
          <div className="absolute bottom-0 right-0 w-10 h-10">
            <div className="absolute bottom-0 right-0 w-full h-px bg-primary/40" />
            <div className="absolute bottom-0 right-0 w-px h-full bg-primary/40" />
          </div>

          <div className="relative p-12 md:p-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {[
                { value: "3+", label: "YEARS EXPERIENCE" },
                { value: "25+", label: "PROJECTS SHIPPED" },
                { value: "10+", label: "TECHNOLOGIES" },
                { value: "100%", label: "CLIENT SATISFACTION" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="text-center border-r-2 border-border last:border-r-0 md:last:border-r-0"
                >
                  <motion.div
                    className="font-serif text-4xl md:text-6xl font-bold text-primary mb-3"
                    initial={{ scale: 0.5 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.6 + index * 0.1,
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                    }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="font-sans text-[10px] tracking-[0.25em] text-muted-foreground uppercase">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Vertical accent lines */}
      <div className="absolute top-0 bottom-0 left-[15%] w-px bg-linear-to-b from-transparent via-primary/10 to-transparent hidden xl:block" />
      <div className="absolute top-0 bottom-0 right-[15%] w-px bg-linear-to-b from-transparent via-primary/10 to-transparent hidden xl:block" />
    </section>
  );
}
