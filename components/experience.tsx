"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Calendar, MapPin, ChevronRight } from "lucide-react";

interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  technologies: string[];
  achievements: string[];
  location: string;
}

const experiences: Experience[] = [
  {
    company: "Atreus Global",
    role: "Internal IT Specialist",
    period: "2025 — Present",
    description:
      "Responsible for orchestrating internal IT operations and architecting systems to streamline cross-departmental business processes. Focused on infrastructure reliability and operational excellence.",
    technologies: ["React", "Node.js", "TypeScript", "SAP", "PostgreSQL"],
    achievements: [
      "Maintained 99% system uptime through proactive infrastructure management.",
      "Engineered a real-time recruitment dashboard, enhancing stakeholder decision-making.",
      "Optimized IT asset tracking efficiency by 40% via systematic documentation.",
    ],
    location: "Jakarta, Indonesia",
  },
  {
    company: "PT. Rupa Aestetika Teknologi Aktual",
    role: "Software Engineer",
    period: "2024 — 2025",
    description:
      "Developed enterprise web applications and managed multi-site IT infrastructure for high-traffic dental operations. Bridged technical requirements with business objectives.",
    technologies: ["React", "Node.js", "Laravel", "AWS", "REST API"],
    achievements: [
      "Reduced administrative overhead by 30% through bespoke patient management workflows.",
      "Stabilized multi-site operations, increasing uptime by 45% via infrastructure modernization.",
    ],
    location: "Jakarta, Indonesia",
  },
  {
    company: "PT. Wahana Datarindo Sempurna",
    role: "Software Developer",
    period: "2023 — 2024",
    description:
      "Delivered critical hardware-integrated solutions for warehouse and asset management using RFID technology.",
    technologies: ["Laravel", "React", "MySQL", "RFID", "Hardware Integration"],
    achievements: [
      "Deployed a WMS with RFID integration, boosting inventory accuracy by 65%.",
      "Architected an internal AMS to track high-value company hardware.",
    ],
    location: "Jakarta, Indonesia",
  },
];

export function Experience() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative py-24 md:py-40 px-6 md:px-12 lg:px-24 overflow-hidden bg-background"
    >
      {/* Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* SECTION HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24"
        >
          <div className="flex items-center gap-4 mb-6">
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
              CHPATER II — CAREER OVERVIEW
            </motion.span>
          </div>

          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-none tracking-tighter uppercase">
            WORK{" "}
            <span className="text-primary italic font-light">EXPERIENCE</span>
          </h2>
        </motion.div>

        {/* MAIN CONTENT */}
        <div className="relative">
          {/* Vertical Rail */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-white/5" />

          {/* Timeline Items */}
          <div className="space-y-20 pl-8 md:pl-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative group"
              >
                {/* Timeline Node */}
                <div className="absolute -left-5] top-6 w-3 h-3 rounded-full bg-stone-800 border border-stone-950 group-hover:bg-primary transition-colors duration-300 z-10" />
                <div className="absolute -left-5.25 top-6 w-5 h-5 rounded-full bg-primary/10 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Left Column */}
                  <div className="lg:col-span-4">
                    <div className="space-y-4">
                      {/* Company */}
                      <h4 className="font-serif text-3xl md:text-4xl text-stone-200 uppercase tracking-tighter leading-tight">
                        {exp.company}
                      </h4>

                      {/* Role */}
                      <div className="text-primary italic font-sans text-lg md:text-xl">
                        {exp.role}
                      </div>

                      {/* Meta */}
                      <div className="space-y-3 pt-4">
                        <div className="flex items-center gap-2 text-sm text-stone-500">
                          <Calendar className="w-4 h-4" />
                          <span className="font-sans">{exp.period}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-stone-500">
                          <MapPin className="w-4 h-4" />
                          <span className="font-sans">{exp.location}</span>
                        </div>
                      </div>

                      {/* Tech Stack */}
                      <div className="pt-6">
                        <div className="text-xs text-stone-600 uppercase tracking-[0.25em] mb-3 font-sans">
                          Technologies
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="text-xs font-sans px-3 py-1 border border-stone-800 text-stone-400 hover:border-primary/50 hover:text-primary transition-colors"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="lg:col-span-8">
                    <p className="text-stone-300 text-lg leading-relaxed mb-8 font-sans">
                      {exp.description}
                    </p>

                    <div className="space-y-4">
                      <div className="text-sm text-stone-600 uppercase tracking-[0.25em] font-sans">
                        Key Achievements
                      </div>
                      <div className="space-y-4">
                        {exp.achievements.map((ach, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-4 p-4 border border-white/5 bg-stone-900/20 hover:bg-stone-900/40 transition-colors group/item"
                          >
                            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 border border-primary/20 group-hover/item:bg-primary/20 transition-colors">
                              <ChevronRight className="w-3 h-3 text-primary" />
                            </div>
                            <span className="text-stone-300 leading-relaxed">
                              {ach}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Text */}
      <motion.div
        style={{ y: yParallax }}
        className="absolute -bottom-20 -left-20 pointer-events-none select-none opacity-[0.02] transition-none"
      >
        <h3 className="font-serif text-[20vw] font-bold leading-none uppercase outline-text">
          EXPERIENCE
        </h3>
      </motion.div>

      <style jsx>{`
        .outline-text {
          -webkit-text-stroke: 2px white;
          color: transparent;
        }
      `}</style>
    </section>
  );
}
