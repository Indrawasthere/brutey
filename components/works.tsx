"use client";

import { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useTransform,
  useScroll,
} from "framer-motion";
import { ArrowUpRight, ExternalLink, Github, Sword } from "lucide-react";

interface Project {
  slug: string;
  title: string;
  subtitle: string;
  year: string;
  tags: string[];
  link: string;
  github?: string;
  description: string;
  impact: string[];
  index: string;
}

const projects: Project[] = [
  {
    slug: "sipakat-pbj",
    title: "SIPAKAT-PBJ",
    subtitle: "Government Procurement Monitoring System",
    year: "2024",
    tags: ["REACT", "TYPESCRIPT", "POSTGRESQL", "TAILWIND"],
    link: "#",
    github: "https://github.com/Indrawasthere/spkmb",
    description:
      "Integrated monitoring platform for government procurement processes, providing real-time analytics, audit tracking, and structured vendor collaboration.",
    impact: [
      "Transparent procurement oversight",
      "Real-time analytics & audit trails",
      "Improved vendor coordination",
    ],
    index: "I",
  },
  {
    slug: "proveit",
    title: "PROVE IT",
    subtitle: "Approval & Document Workflow System",
    year: "2024",
    tags: ["NEXT.JS", "PRISMA", "POSTGRESQL", "NEXTAUTH"],
    link: "#",
    github: "https://github.com/Indrawasthere/approvalsystem",
    description:
      "Multi-layer approval workflow system with structured document management, access control, and Google Drive integration.",
    impact: [
      "Streamlined approval workflows",
      "Centralized document management",
      "Reduced manual processing",
    ],
    index: "II",
  },
  {
    slug: "hyra",
    title: "HYRA",
    subtitle: "AI-Assisted HR Information System",
    year: "2025",
    tags: ["REACT", "FASTAPI", "MONGODB", "AI"],
    link: "#",
    github: "https://github.com/Indrawasthere/hyra",
    description:
      "AI-powered HRIS designed to support attendance analytics, CV screening, and salary recommendations using machine learning models.",
    impact: [
      "Automated HR analysis",
      "Data-driven hiring support",
      "Reduced HR operational overhead",
    ],
    index: "III",
  },
  {
    slug: "orca-pos",
    title: "ORCA POS",
    subtitle: "Enterprise Point of Sale System",
    year: "2025",
    tags: ["REACT", "GOLANG", "POSTGRESQL"],
    link: "#",
    github: "https://github.com/Indrawasthere/pointsale",
    description:
      "Enterprise-grade point of sale system with multi-role access, kitchen display integration, and scalable backend services.",
    impact: [
      "Multi-role & multi-branch support",
      "Operational visibility",
      "High transaction reliability",
    ],
    index: "IV",
  },
];

export function Works() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1.1, 1]);

  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0],
  );
  const contentY = useTransform(scrollYProgress, [0, 0.2], [50, 0]);

  return (
    <section
      ref={containerRef}
      id="works"
      className="relative py-32 md:py-40 px-6 md:px-12 lg:px-16 bg-background overflow-hidden"
    >
      {/* Brutal Grid Background */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)`,
            backgroundSize: "70px 70px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24 relative"
        >
          {/* Parallax Background Number */}
          <div className="absolute -left-10 -top-20 font-serif text-[15vw] font-bold text-primary/[0.03] leading-none pointer-events-none select-none">
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
                className="font-sans text-xs md:text-sm tracking-[0.3em] text-stone-400 uppercase font-medium"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                CHAPTER IV — FEATURED PROJECTS
              </motion.span>
            </div>

            <h2 className="font-serif text-5xl md:text-7xl lg:text-9xl leading-none tracking-tighter uppercase">
              SYSTEMS{" "}
              <span className="text-primary italic font-light">BUILT</span>
            </h2>
          </div>
        </motion.div>

        {/* Projects List - Brutalist Container */}
        <div className="border-t-2 border-x-2 border-border/60 bg-white/[0.01]">
          {projects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative border-b-2 border-border/60 overflow-hidden"
            >
              {/* Main Project Row */}
              <div
                className="relative py-12 md:py-20 px-8 md:px-12 cursor-pointer transition-all duration-700 ease-in-out hover:bg-white/[0.02]"
                onClick={() =>
                  setExpandedIndex(expandedIndex === index ? null : index)
                }
              >
                {/* Floating Index Decor */}
                <motion.div className="absolute top-4 right-8 md:top-8 font-serif text-7xl md:text-9xl font-bold text-primary/[0.04] leading-none pointer-events-none group-hover:text-primary/[0.08] transition-all duration-700">
                  {project.index}
                </motion.div>

                <div className="relative flex flex-col gap-6 max-w-4xl">
                  {/* Meta */}
                  <div className="flex items-center gap-4">
                    <span className="font-sans text-[10px] text-primary tracking-widest px-2 py-0.5 border border-primary/30">
                      CASE {project.index}
                    </span>
                    <div className="w-8 h-[1px] bg-stone-800" />
                    <span className="font-sans text-xs text-stone-500 tracking-widest uppercase">
                      RELEASED — {project.year}
                    </span>
                  </div>

                  {/* Title Area */}
                  <div className="space-y-2">
                    <h3 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight uppercase group-hover:translate-x-2 transition-transform duration-500">
                      {project.title}
                    </h3>
                    <p className="text-lg md:text-xl text-stone-500 font-sans italic">
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Tech Stack Bubbles */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 border border-white/5 bg-white/[0.02] text-[10px] font-sans text-stone-400 group-hover:border-primary/40 group-hover:text-primary transition-all duration-500"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Toggle Interaction */}
                  <div className="flex items-center gap-4 mt-4">
                    <div
                      className={`p-2 rounded-full border border-primary/20 transition-all duration-500 ${expandedIndex === index ? "bg-primary rotate-45" : "bg-transparent"}`}
                    >
                      <ArrowUpRight
                        className={`w-4 h-4 ${expandedIndex === index ? "text-white" : "text-primary"}`}
                      />
                    </div>
                    <span className="text-[10px] font-bold tracking-[0.3em] text-stone-500 group-hover:text-primary transition-colors">
                      {expandedIndex === index
                        ? "CLOSE CASE STUDY"
                        : "OPEN CASE STUDY"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Expanded Content */}
              <AnimatePresence>
                {expandedIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden bg-white/[0.015]"
                  >
                    <div className="px-8 md:px-12 pb-16 pt-4 border-t border-white/5">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                        {/* Description */}
                        <div className="md:col-span-7 space-y-10">
                          <div className="space-y-4">
                            <h4 className="text-[10px] font-bold text-primary tracking-[0.4em] uppercase">
                              Executive Summary
                            </h4>
                            <p className="text-stone-300 text-lg md:text-xl leading-relaxed font-sans">
                              {project.description}
                            </p>
                          </div>

                          <div className="space-y-6">
                            <h4 className="text-[10px] font-bold text-primary tracking-[0.4em] uppercase">
                              Core Deliverables
                            </h4>
                            <div className="grid grid-cols-1 gap-3">
                              {project.impact.map((item) => (
                                <div
                                  key={item}
                                  className="flex items-center gap-4 p-4 border border-white/5 bg-black/20 group/item hover:bg-white/[0.03] transition-colors"
                                >
                                  <Sword className="w-4 h-4 text-primary/40 group-hover/item:text-primary group-hover/item:rotate-12 transition-all" />
                                  <span className="text-stone-400 font-sans text-sm md:text-base">
                                    {item}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Actions / Side Panel */}
                        <div className="md:col-span-5 flex flex-col justify-start gap-4">
                          <h4 className="text-[10px] font-bold text-stone-600 tracking-[0.4em] uppercase mb-2">
                            Access Portal
                          </h4>

                          <a
                            href={project.link}
                            className="group/link relative flex items-center justify-between p-6 border-2 border-primary/20 hover:border-primary bg-primary/5 transition-all duration-500"
                          >
                            <div className="space-y-1">
                              <span className="block text-sm font-bold tracking-widest text-white">
                                LIVE RECON
                              </span>
                              <span className="block text-[10px] text-stone-500 uppercase">
                                Production Environment
                              </span>
                            </div>
                            <ExternalLink className="w-6 h-6 text-primary group-hover/link:scale-110 transition-transform" />
                          </a>

                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group/link flex items-center justify-between p-6 border border-white/10 hover:border-white/30 bg-white/[0.02] transition-all duration-500"
                            >
                              <div className="space-y-1">
                                <span className="block text-sm font-bold tracking-widest text-white">
                                  REPOSITORY
                                </span>
                                <span className="block text-[10px] text-stone-500 uppercase">
                                  Source Code
                                </span>
                              </div>
                              <Github className="w-6 h-6 text-stone-400 group-hover/link:text-white transition-colors" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative vertical lines */}
      <div className="absolute top-0 bottom-0 left-[5%] w-px bg-white/5 hidden 2xl:block" />
      <div className="absolute top-0 bottom-0 right-[5%] w-px bg-white/5 hidden 2xl:block" />
      <motion.div
        style={{
          y: yParallax,
          opacity: contentOpacity,
        }}
        className="absolute -bottom-20 -right-20 pointer-events-none select-none z-0 transition-none"
      >
        <h3 className="font-serif text-[28vw] font-bold leading-none uppercase outline-text">
          WORKS
        </h3>
      </motion.div>

      <style jsx>{`
        .outline-text {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.1);
          color: transparent;
        }
      `}</style>
    </section>
  );
}
