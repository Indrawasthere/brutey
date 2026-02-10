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
    description: "Responsible for orchestrating internal IT operations...",
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
    description: "Developed enterprise web applications...",
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
    description: "Delivered critical hardware-integrated solutions...",
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

  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1.1, 1]);

  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0],
  );
  const contentY = useTransform(scrollYProgress, [0, 0.2], [50, 0]);

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative py-24 md:py-40 px-6 md:px-12 lg:px-24 overflow-hidden bg-background"
    >
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <motion.div
        style={{ opacity }}
        className="max-w-7xl mx-auto relative z-10"
      >
        {/* SECTION HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
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
              CHAPTER II — CAREER OVERVIEW
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
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute left-0 top-0 bottom-0 w-px bg-white/5 origin-top"
          />

          {/* Timeline Items */}
          <div className="space-y-20 pl-8 md:pl-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.15,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
                className="relative group will-change-transform"
              >
                {/* Timeline Node */}
                <div className="absolute -left-[37px] md:-left-[53px] top-2 w-3 h-3 rounded-full bg-stone-800 border border-stone-950 group-hover:bg-primary transition-colors duration-500 z-20" />

                {/* Pulse Effect */}
                <div className="absolute -left-[41px] md:-left-[57px] top-1 w-5 h-5 rounded-full bg-primary/20 scale-0 group-hover:scale-100 transition-transform duration-500 z-10" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Left Column: Company & Meta */}
                  <div className="lg:col-span-4">
                    <div className="space-y-4">
                      <h4 className="font-serif text-3xl md:text-4xl text-stone-200 uppercase tracking-tighter leading-tight group-hover:text-white transition-colors">
                        {exp.company}
                      </h4>

                      <div className="text-primary italic font-serif text-lg md:text-xl">
                        {exp.role}
                      </div>

                      <div className="space-y-3 pt-4">
                        <div className="flex items-center gap-2 text-sm text-stone-500">
                          <Calendar className="w-4 h-4 text-primary/60" />
                          <span className="font-sans">{exp.period}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-stone-500">
                          <MapPin className="w-4 h-4 text-primary/60" />
                          <span className="font-sans">{exp.location}</span>
                        </div>
                      </div>

                      {/* Tech Stack */}
                      <div className="pt-6">
                        <div className="text-[10px] text-stone-600 uppercase tracking-[0.25em] mb-3 font-sans font-bold">
                          Stack Utilized
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="text-[11px] font-technical px-2 py-1 border border-white/5 bg-white/[0.02] text-stone-500 hover:border-primary/50 hover:text-primary transition-all duration-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Description & Achievements */}
                  <div className="lg:col-span-8">
                    <p className="text-stone-400 text-lg leading-relaxed mb-8 font-sans max-w-2xl">
                      {exp.description}
                    </p>

                    <div className="space-y-4">
                      <div className="text-[10px] text-stone-600 uppercase tracking-[0.25em] font-sans font-bold">
                        Impact & Deliverables
                      </div>
                      <div className="grid grid-cols-1 gap-3">
                        {exp.achievements.map((ach, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 + i * 0.1 }}
                            className="flex items-start gap-4 p-4 border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-300 group/item"
                          >
                            <div className="flex-shrink-0 mt-1">
                              <ChevronRight className="w-4 h-4 text-primary opacity-50 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all" />
                            </div>
                            <span className="text-stone-300 leading-relaxed font-sans text-sm md:text-base">
                              {ach}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Floating Background Text Parallax */}
      <motion.div
        style={{
          y: yParallax,
          opacity: contentOpacity,
        }}
        className="absolute -bottom-20 -right-20 pointer-events-none select-none z-0 transition-none"
      >
        <h3 className="font-serif text-[28vw] font-bold leading-none uppercase outline-text">
          EXPERIENCES
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
