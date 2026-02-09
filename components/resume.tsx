"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Download,
  FileText,
  ArrowUpRight,
  Shield,
  Target,
  ExternalLink,
} from "lucide-react";

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
              CHAPTER V — RESUME
            </motion.span>
          </div>

          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-none tracking-tighter uppercase">
            CURRICULUM{" "}
            <span className="text-primary italic font-light">VITAE</span>
          </h2>
        </div>
      </motion.div>

      {/* Resume Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-0 mb-24 border-2 border-border group/cards">
        {/* Download Resume Card */}
        <motion.a
          href="/fadlan_resume.pdf"
          download
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{
            duration: 0.6,
            delay: 0.2,
            hover: { duration: 0.3 },
          }}
          onMouseEnter={() => setDownloadHovered(true)}
          onMouseLeave={() => setDownloadHovered(false)}
          className="relative p-10 md:p-14 border-r-2 md:border-r-2 border-b-2 md:border-b-0 border-border overflow-hidden cursor-pointer bg-card"
        >
          {/* Background Glow Effect */}
          <motion.div
            className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: downloadHovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          />

          {/* Main Background Sweep */}
          <motion.div
            className="absolute inset-0 bg-primary"
            initial={{ x: "-100%", y: "100%" }}
            animate={{
              x: downloadHovered ? "0%" : "-100%",
              y: downloadHovered ? "0%" : "100%",
            }}
            transition={{
              duration: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          />

          {/* Content Container */}
          <div className="relative z-10">
            {/* Top Right Index */}
            <motion.div
              className="absolute top-0 right-0 font-sans text-xs tracking-[0.3em] font-bold"
              animate={{
                color: downloadHovered ? "#0a0a0a" : "rgba(124, 45, 18, 0.4)",
              }}
              transition={{ duration: 0.3 }}
            >
              [01]
            </motion.div>

            {/* Corner Accents */}
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

            {/* Main Content */}
            <div className="flex flex-col gap-6">
              {/* Icon Container */}
              <motion.div
                animate={{
                  scale: downloadHovered ? 1.05 : 1,
                  rotate: downloadHovered ? 5 : 0,
                }}
                transition={{ duration: 0.4 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-primary/10 blur-md scale-125 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <motion.div
                  animate={{
                    borderColor: downloadHovered
                      ? "#0a0a0a"
                      : "rgba(124, 45, 18, 0.3)",
                  }}
                  className="relative w-16 h-16 border-2 flex items-center justify-center bg-card/50 backdrop-blur-sm"
                >
                  <motion.div
                    animate={{
                      color: downloadHovered
                        ? "#0a0a0a"
                        : "rgba(124, 45, 18, 0.7)",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <Download className="w-8 h-8" />
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Title Section */}
              <div className="space-y-3">
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
              </div>

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

              {/* Stats Row */}
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
                    className="font-sans text-xs tracking-wider font-medium"
                    animate={{
                      color: downloadHovered ? "#0a0a0a" : "#d4d4d8",
                    }}
                  >
                    2 PAGES
                  </motion.span>
                </div>
                <div
                  className="w-px h-4"
                  style={{
                    background: downloadHovered
                      ? "#0a0a0a"
                      : "rgba(124, 45, 18, 0.3)",
                  }}
                />
                <motion.span
                  className="text-[10px] tracking-[0.2em] font-sans"
                  animate={{
                    color: downloadHovered
                      ? "rgba(10, 10, 10, 0.8)"
                      : "rgba(124, 45, 18, 0.8)",
                  }}
                >
                  UPDATED 2026
                </motion.span>
              </div>

              {/* Call to Action */}
              <motion.div
                className="flex items-center gap-3 mt-2 group/cta"
                animate={{
                  y: downloadHovered ? -2 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  animate={{
                    color: downloadHovered
                      ? "#0a0a0a"
                      : "rgba(124, 45, 18, 0.5)",
                  }}
                  className="relative"
                >
                  <Shield className="w-4 h-4" />
                  <motion.div
                    className="absolute inset-0 bg-primary/20 blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: downloadHovered ? 1 : 0 }}
                  />
                </motion.div>
                <motion.span
                  className="text-xs tracking-[0.2em] uppercase font-sans"
                  animate={{
                    color: downloadHovered
                      ? "rgba(10, 10, 10, 0.8)"
                      : "rgba(124, 45, 18, 0.8)",
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
                  className="relative"
                >
                  <ArrowUpRight className="w-5 h-5" />
                  <motion.div
                    className="absolute inset-0 bg-primary/20 blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: downloadHovered ? 1 : 0 }}
                  />
                </motion.div>
              </motion.div>
            </div>

            {/* Bottom Corner */}
            <div className="absolute bottom-0 right-0 w-6 h-6">
              <motion.div
                className="absolute bottom-0 right-0 w-full h-px"
                animate={{
                  width: downloadHovered ? "100%" : "0%",
                  backgroundColor: downloadHovered
                    ? "rgba(10, 10, 10, 0.5)"
                    : "rgba(124, 45, 18, 0.3)",
                }}
                transition={{ duration: 0.4, delay: downloadHovered ? 0.1 : 0 }}
              />
              <motion.div
                className="absolute bottom-0 right-0 w-px h-full"
                animate={{
                  height: downloadHovered ? "100%" : "0%",
                  backgroundColor: downloadHovered
                    ? "rgba(10, 10, 10, 0.5)"
                    : "rgba(124, 45, 18, 0.3)",
                }}
                transition={{ duration: 0.4, delay: downloadHovered ? 0.2 : 0 }}
              />
            </div>
          </div>
        </motion.a>

        {/* Preview Card */}
        <motion.a
          href="/fadlan_resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{
            duration: 0.6,
            delay: 0.3,
            hover: { duration: 0.3 },
          }}
          onMouseEnter={() => setPreviewHovered(true)}
          onMouseLeave={() => setPreviewHovered(false)}
          className="relative p-10 md:p-14 border-b-2 md:border-b-0 border-border overflow-hidden cursor-pointer bg-card"
        >
          {/* Background Glow Effect */}
          <motion.div
            className="absolute inset-0 bg-linear-to-bl from-primary/5 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: previewHovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          />

          {/* Main Background Sweep */}
          <motion.div
            className="absolute inset-0 bg-primary"
            initial={{ x: "100%", y: "100%" }}
            animate={{
              x: previewHovered ? "0%" : "100%",
              y: previewHovered ? "0%" : "100%",
            }}
            transition={{
              duration: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          />

          {/* Content Container */}
          <div className="relative z-10">
            {/* Top Left Index */}
            <motion.div
              className="absolute top-0 left-0 font-sans text-xs tracking-[0.3em] font-bold"
              animate={{
                color: previewHovered ? "#0a0a0a" : "rgba(124, 45, 18, 0.4)",
              }}
              transition={{ duration: 0.3 }}
            >
              [02]
            </motion.div>

            {/* Corner Accents */}
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

            {/* Main Content */}
            <div className="flex flex-col gap-6">
              {/* Icon Container */}
              <motion.div
                animate={{
                  scale: previewHovered ? 1.05 : 1,
                  rotate: previewHovered ? -5 : 0,
                }}
                transition={{ duration: 0.4 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-primary/10 blur-md scale-125 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <motion.div
                  animate={{
                    borderColor: previewHovered
                      ? "#0a0a0a"
                      : "rgba(124, 45, 18, 0.3)",
                  }}
                  className="relative w-16 h-16 border-2 flex items-center justify-center bg-card/50 backdrop-blur-sm"
                >
                  <motion.div
                    animate={{
                      color: previewHovered
                        ? "#0a0a0a"
                        : "rgba(124, 45, 18, 0.7)",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <ExternalLink className="w-8 h-8" />
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Title Section */}
              <div className="space-y-3">
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
              </div>

              {/* Description */}
              <motion.p
                className="text-sm md:text-base leading-relaxed"
                animate={{
                  color: previewHovered ? "rgba(10, 10, 10, 0.7)" : "#71717a",
                }}
                transition={{ duration: 0.3 }}
              >
                View resume directly in browser. Perfect for quick reference or
                sharing link with recruiters.
              </motion.p>

              {/* Stats Row */}
              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-2">
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
                    className="font-sans text-xs tracking-wider font-medium"
                    animate={{
                      color: previewHovered ? "#0a0a0a" : "#d4d4d8",
                    }}
                  >
                    INSTANT VIEW
                  </motion.span>
                </div>
                <div
                  className="w-px h-4"
                  style={{
                    background: previewHovered
                      ? "#0a0a0a"
                      : "rgba(124, 45, 18, 0.3)",
                  }}
                />
                <motion.span
                  className="text-[10px] tracking-[0.2em] font-sans"
                  animate={{
                    color: previewHovered
                      ? "rgba(10, 10, 10, 0.8)"
                      : "rgba(124, 45, 18, 0.8)",
                  }}
                >
                  NO DOWNLOAD
                </motion.span>
              </div>

              {/* Call to Action */}
              <motion.div
                className="flex items-center gap-3 mt-2 group/cta"
                animate={{
                  y: previewHovered ? -2 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  animate={{
                    color: previewHovered
                      ? "#0a0a0a"
                      : "rgba(124, 45, 18, 0.5)",
                  }}
                  className="relative"
                >
                  <FileText className="w-4 h-4" />
                  <motion.div
                    className="absolute inset-0 bg-primary/20 blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: previewHovered ? 1 : 0 }}
                  />
                </motion.div>
                <motion.span
                  className="text-xs tracking-[0.2em] uppercase font-sans"
                  animate={{
                    color: previewHovered
                      ? "rgba(10, 10, 10, 0.8)"
                      : "rgba(124, 45, 18, 0.8)",
                  }}
                >
                  VIEW IN BROWSER
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
                  className="relative"
                >
                  <ArrowUpRight className="w-5 h-5" />
                  <motion.div
                    className="absolute inset-0 bg-primary/20 blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: previewHovered ? 1 : 0 }}
                  />
                </motion.div>
              </motion.div>
            </div>

            {/* Bottom Corner */}
            <div className="absolute bottom-0 left-0 w-6 h-6">
              <motion.div
                className="absolute bottom-0 left-0 w-full h-px"
                animate={{
                  width: previewHovered ? "100%" : "0%",
                  backgroundColor: previewHovered
                    ? "rgba(10, 10, 10, 0.5)"
                    : "rgba(124, 45, 18, 0.3)",
                }}
                transition={{ duration: 0.4, delay: previewHovered ? 0.1 : 0 }}
              />
              <motion.div
                className="absolute bottom-0 left-0 w-px h-full"
                animate={{
                  height: previewHovered ? "100%" : "0%",
                  backgroundColor: previewHovered
                    ? "rgba(10, 10, 10, 0.5)"
                    : "rgba(124, 45, 18, 0.3)",
                }}
                transition={{ duration: 0.4, delay: previewHovered ? 0.2 : 0 }}
              />
            </div>
          </div>
        </motion.a>
      </div>

      {/* Enhanced Stats Block */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="max-w-7xl mx-auto"
      >
        <div className="relative border-4 border-border bg-card/80 backdrop-blur-sm overflow-hidden group/stats">
          {/* Animated Border Glow */}
          <motion.div
            className="absolute inset-0 border-2 border-primary/20 m-2 pointer-events-none"
            animate={{
              borderColor: [
                "rgba(124, 45, 18, 0.2)",
                "rgba(124, 45, 18, 0.4)",
                "rgba(124, 45, 18, 0.2)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          {/* Floating Particles */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary/30 rounded-full"
              initial={{
                x: Math.random() * 100 + "%",
                y: Math.random() * 100 + "%",
                opacity: 0,
              }}
              animate={{
                y: ["0%", "-100%", "0%"],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 2 + Math.random(),
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}

          {/* Decorative corners */}
          <div className="absolute top-0 left-0 w-12 h-12">
            <motion.div
              className="absolute top-0 left-0 w-full h-px bg-primary/40"
              animate={{ width: ["0%", "100%", "100%"] }}
              transition={{ duration: 1, delay: 0.5 }}
            />
            <motion.div
              className="absolute top-0 left-0 w-px h-full bg-primary/40"
              animate={{ height: ["0%", "100%", "100%"] }}
              transition={{ duration: 1, delay: 0.6 }}
            />
          </div>
          <div className="absolute top-0 right-0 w-12 h-12">
            <motion.div
              className="absolute top-0 right-0 w-full h-px bg-primary/40"
              animate={{ width: ["0%", "100%", "100%"] }}
              transition={{ duration: 1, delay: 0.7 }}
            />
            <motion.div
              className="absolute top-0 right-0 w-px h-full bg-primary/40"
              animate={{ height: ["0%", "100%", "100%"] }}
              transition={{ duration: 1, delay: 0.8 }}
            />
          </div>

          <div className="relative p-12 md:p-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {[
                { value: "3+", label: "YEARS EXPERIENCE" },
                { value: "15+", label: "PROJECTS SHIPPED" },
                { value: "10+", label: "TECHNOLOGIES" },
                { value: "100%", label: "SATISFACTION" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.5 + index * 0.1,
                    duration: 0.5,
                    type: "spring",
                    stiffness: 100,
                    damping: 10,
                  }}
                  className="text-center border-r-2 border-border last:border-r-0 md:last:border-r-0 relative group/stat"
                >
                  {/* Hover Effect */}
                  <motion.div className="absolute inset-0 bg-primary/5 rounded-lg opacity-0 group-hover/stat:opacity-100 transition-opacity duration-300" />

                  <div className="relative">
                    {/* Icon */}
                    <motion.div
                      className="text-2xl mb-3 opacity-0 group-hover/stat:opacity-100 transition-opacity duration-300"
                      animate={{ y: [0, -5, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.2,
                      }}
                    >
                      {stat.icon}
                    </motion.div>

                    {/* Value with Count Up Effect */}
                    <motion.div
                      className="font-serif text-4xl md:text-6xl font-bold text-primary mb-3"
                      initial={{ scale: 0.5, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: 0.6 + index * 0.1,
                        type: "spring",
                        stiffness: 150,
                        damping: 12,
                      }}
                    >
                      {stat.value}
                    </motion.div>

                    {/* Label */}
                    <div className="font-sans text-[10px] tracking-[0.25em] text-muted-foreground uppercase">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-20" />
    </section>
  );
}
