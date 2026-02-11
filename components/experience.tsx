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

  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const rotateDecorative = useTransform(scrollYProgress, [0, 1], [0, 10]);

  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0],
  );

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative py-24 md:py-40 px-6 md:px-12 lg:px-24 overflow-hidden bg-[#0a0a0a]"
    >
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.015]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="runesPatternExp"
              x="0"
              y="0"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <text
                x="50"
                y="50"
                fontFamily="serif"
                fontSize="12"
                fill="#444"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                ᛉ
              </text>
              <text
                x="20"
                y="20"
                fontFamily="serif"
                fontSize="10"
                fill="#333"
                opacity="0.5"
              >
                ᚨ
              </text>
              <text
                x="80"
                y="80"
                fontFamily="serif"
                fontSize="14"
                fill="#555"
                opacity="0.3"
              >
                ᛞ
              </text>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#runesPatternExp)" />
        </svg>
      </div>

      <motion.div
        style={{ rotate: rotateDecorative }}
        className="absolute -top-20 -left-20 w-40 h-40 border border-white/5 rounded-full"
      />

      <motion.div
        style={{ rotate: rotateDecorative }}
        className="absolute -bottom-20 -right-20 w-60 h-60 border border-primary/10 rounded-full"
      />

      <motion.div
        style={{ opacity }}
        className="max-w-7xl mx-auto relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24 relative"
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

          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-none tracking-tighter uppercase relative">
            <motion.span
              className="absolute -left-8 top-4 text-3xl text-primary/30"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              ⚔
            </motion.span>
            WORK{" "}
            <span className="text-primary italic font-light">EXPERIENCE</span>
            <motion.span
              className="absolute -right-8 bottom-4 text-3xl text-primary/30"
              animate={{ rotate: [360, 0] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              ⚔
            </motion.span>
          </h2>
        </motion.div>

        <div className="relative">
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute left-0 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-primary/20 to-transparent origin-top"
          />

          <div className="space-y-32 pl-8 md:pl-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.15,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
                className="relative group will-change-transform"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.3, duration: 0.3 }}
                  className="absolute -left-9.25 md:-left-13.25 top-2 w-4 h-4 rounded-full bg-[#0a0a0a] border-2 border-primary group-hover:bg-primary transition-colors duration-500 z-20"
                />

                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.5,
                  }}
                  className="absolute -left-9.25 md:-left-13.25 top-2 w-4 h-4 rounded-full bg-primary/10 z-10"
                />

                {index < experiences.length - 1 && (
                  <motion.div
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.5, duration: 0.8 }}
                    className="absolute -left-8.75 md:-left-13.25 top-6 bottom-16 w-px bg-linear-to-b from-primary/30 via-primary/10 to-transparent origin-top"
                  />
                )}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                  <div className="lg:col-span-4 relative">
                    <motion.div
                      className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-primary/20"
                      animate={{ opacity: [0.3, 0.7, 0.3] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />

                    <div className="space-y-4">
                      <h4 className="font-serif text-3xl md:text-4xl text-white uppercase tracking-tighter leading-tight group-hover:text-primary transition-colors duration-300 relative">
                        <span className="absolute -left-6 text-xl text-primary/30">
                          ›
                        </span>
                        {exp.company}
                      </h4>

                      <div className="text-primary italic font-serif text-lg md:text-xl flex items-center gap-3">
                        <motion.span
                          className="w-2 h-2 bg-primary rotate-45"
                          animate={{ rotate: [45, 135, 45] }}
                          transition={{ duration: 3, repeat: Infinity }}
                        />
                        {exp.role}
                      </div>

                      <div className="space-y-3 pt-6">
                        <motion.div
                          className="flex items-center gap-2 text-sm text-stone-500 group/meta"
                          whileHover={{ x: 5 }}
                        >
                          <Calendar className="w-4 h-4 text-primary/60 group-hover/meta:text-primary transition-colors" />
                          <span className="font-sans group-hover/meta:text-stone-300 transition-colors">
                            {exp.period}
                          </span>
                        </motion.div>
                        <motion.div
                          className="flex items-center gap-2 text-sm text-stone-500 group/meta"
                          whileHover={{ x: 5 }}
                        >
                          <MapPin className="w-4 h-4 text-primary/60 group-hover/meta:text-primary transition-colors" />
                          <span className="font-sans group-hover/meta:text-stone-300 transition-colors">
                            {exp.location}
                          </span>
                        </motion.div>
                      </div>

                      <div className="pt-8 relative">
                        <div className="absolute -left-4 top-0 w-px h-full bg-linear-to-b from-primary/10 via-transparent to-transparent" />

                        <div className="text-[10px] text-primary uppercase tracking-[0.25em] mb-3 font-sans font-bold flex items-center gap-2">
                          <motion.span
                            className="w-1.5 h-1.5 bg-primary rotate-45"
                            animate={{ rotate: [45, 135, 45] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                          Stack Utilized
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech, i) => (
                            <motion.span
                              key={tech}
                              initial={{ opacity: 0, y: 10 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.5 + i * 0.05 }}
                              className="text-[11px] font-sans px-3 py-1.5 border border-white/5 bg-white/2 text-stone-500 hover:border-primary/50 hover:text-primary hover:bg-primary/5 transition-all duration-300 cursor-default"
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-8">
                    <motion.p
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                      className="text-stone-400 text-lg leading-relaxed mb-10 font-sans max-w-2xl relative"
                    >
                      <span className="absolute -left-8 top-0 text-2xl text-primary/20 italic">
                        "
                      </span>
                      {exp.description}
                      <span className="absolute -right-8 bottom-0 text-2xl text-primary/20 italic">
                        "
                      </span>
                    </motion.p>

                    <div className="space-y-6">
                      <div className="text-[10px] text-primary uppercase tracking-[0.25em] font-sans font-bold flex items-center gap-3">
                        <motion.div
                          className="w-4 h-px bg-primary"
                          animate={{ width: [0, 20, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        Impact & Deliverables
                      </div>
                      <div className="grid grid-cols-1 gap-4">
                        {exp.achievements.map((ach, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.8 }}
                            transition={{
                              delay: 0.4 + i * 0.1,
                              duration: 0.6,
                              ease: [0.21, 0.47, 0.32, 0.98],
                            }}
                            className="flex items-start gap-4 p-5 border border-white/5 bg-linear-to-r from-white/1 to-transparent hover:from-white/3 hover:to-primary/5 transition-all duration-500 group/item relative overflow-hidden"
                          >
                            <div className="absolute inset-0 border border-primary/0 group-hover/item:border-primary/10 transition-all duration-500 pointer-events-none" />

                            <motion.div
                              className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-primary/10 group-hover/item:border-primary/30 transition-colors"
                              animate={{ opacity: [0.3, 0.7, 0.3] }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.5,
                              }}
                            />

                            <div className="shrink-0 mt-1">
                              <motion.div
                                className="w-6 h-6 rounded-full border border-primary/20 flex items-center justify-center group-hover/item:bg-primary/10 transition-colors"
                                whileHover={{ scale: 1.1 }}
                              >
                                <ChevronRight className="w-3 h-3 text-primary opacity-60 group-hover/item:opacity-100 group-hover/item:translate-x-0.5 transition-all" />
                              </motion.div>
                            </div>
                            <span className="text-stone-300 leading-relaxed font-sans text-sm md:text-base group-hover/item:text-white transition-colors">
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

      <motion.div
        style={{
          y: yParallax,
          opacity: contentOpacity,
        }}
        className="absolute -bottom-20 -right-20 pointer-events-none select-none z-0 transition-none"
      >
        <h3
          className="font-serif text-[28vw] font-black leading-none uppercase text-transparent"
          style={{ WebkitTextStroke: "1px rgba(212, 165, 116, 0.05)" }}
        >
          EXPERIENCES
        </h3>
      </motion.div>

      <motion.div
        animate={{
          boxShadow: [
            "0 0 20px rgba(212, 165, 116, 0.02)",
            "0 0 40px rgba(212, 165, 116, 0.05)",
            "0 0 20px rgba(212, 165, 116, 0.02)",
          ],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-1/4 w-px h-px rounded-full bg-primary/10"
      />

      <motion.div
        animate={{
          boxShadow: [
            "0 0 30px rgba(212, 165, 116, 0.01)",
            "0 0 50px rgba(212, 165, 116, 0.03)",
            "0 0 30px rgba(212, 165, 116, 0.01)",
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-1/3 right-1/3 w-px h-px rounded-full bg-primary/5"
      />
    </section>
  );
}
