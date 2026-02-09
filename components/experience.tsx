"use client";

import { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";
import {
  ArrowUpRight,
  Building2,
  Calendar,
  MapPin,
  Sword,
  Shield,
  Hammer,
  Target,
  Castle,
} from "lucide-react";

interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  technologies: string[];
  achievements: string[];
  location: string;
  realm?: string; // Medieval theme: different "realms" instead of "impact"
}

const experiences: Experience[] = [
  {
    company: "Atreus Global",
    role: "Internal IT Strategist",
    period: "2025 — Present",
    description:
      "Forging the digital infrastructure of our corporate fortress. Leading architectural decisions and mentoring fellow craftsmen in the art of modern web alchemy.",
    technologies: [
      "Next.js",
      "React",
      "PostgreSQL",
      "MongoDB",
      "TypeScript",
      "Tailwind",
      "AWS",
      "Docker",
    ],
    achievements: [
      "Sharpened deployment efficiency by 40% through ritual optimization",
      "Mentored 5+ apprentice craftsmen, raising guild productivity by 30%",
      "Established automated guardrails, reducing production anomalies by 60%",
    ],
    location: "Jakarta Citadel, Indonesia",
    realm: "Digital Infrastructure Fortress",
  },
  {
    company: "Rupa Aestetika Teknologi Aktual",
    role: "Code Artisan",
    period: "2024 — 2025",
    description:
      "Crafted responsive fortifications and interactive keeps for various clients. Forged pixel-perfect interfaces with meticulous attention to detail.",
    technologies: [
      "React",
      "Node.js",
      "PostgreSQL",
      "AWS",
      "WebSocket",
      "Redis",
      "GraphQL",
    ],
    achievements: [
      "Honored with 98% client satisfaction across 8 major commissions",
      "Forged real-time scrying glasses increasing engagement by 25%",
      "Strengthened application fortifications, improving resilience by 40%",
    ],
    location: "Jakarta Citadel, Indonesia",
    realm: "Digital Artisan Guild",
  },
  {
    company: "Wahana Datarindo Sempurna",
    role: "Code Smith",
    period: "2023 — 2024",
    description:
      "Apprenticeship in crafting responsive web fortifications. Collaborated with master designers to forge pixel-perfect interfaces.",
    technologies: [
      "React",
      "Laravel",
      "Bootstrap",
      "MySQL",
      "Git",
      "REST API",
      "Jest",
    ],
    achievements: [
      "Forged 10+ client fortifications with zero structural failures",
      "Sharpened page loading rituals by 35% across all domains",
      "Established Agile forging methodology improving production speed by 20%",
    ],
    location: "Jakarta Citadel, Indonesia",
    realm: "Foundational Craftsmanship",
  },
];

function ExperienceCard({
  experience,
  index,
  isExpanded,
  onToggle,
}: {
  experience: Experience;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  const iconMap = [Sword, Shield, Hammer];
  const IconComponent = iconMap[index % iconMap.length];

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative group"
    >
      {/* Main Card - Stone & Iron Aesthetic */}
      <motion.div
        onClick={onToggle}
        className="relative z-10 p-8 md:p-10 border-2 border-stone-700/50 bg-linear-to-br from-stone-900/80 to-stone-950/90 cursor-pointer transition-all duration-500 hover:border-amber-900/50"
        whileHover={{
          scale: 1.005,
          borderColor: "#7c2d12",
        }}
        style={{
          background:
            "linear-gradient(135deg, rgba(28, 25, 23, 0.9) 0%, rgba(12, 10, 9, 0.95) 100%)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.05), 0 20px 40px rgba(0,0,0,0.5)",
        }}
      >
        {/* Iron corner brackets */}
        <div className="absolute top-0 left-0 w-8 h-8">
          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-amber-900/30 group-hover:border-amber-900 transition-all duration-300" />
        </div>
        <div className="absolute top-0 right-0 w-8 h-8">
          <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-amber-900/30 group-hover:border-amber-900 transition-all duration-300" />
        </div>
        <div className="absolute bottom-0 left-0 w-8 h-8">
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-amber-900/30 group-hover:border-amber-900 transition-all duration-300" />
        </div>
        <div className="absolute bottom-0 right-0 w-8 h-8">
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-amber-900/30 group-hover:border-amber-900 transition-all duration-300" />
        </div>

        {/* Header row */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          {/* Period with Calendar */}
          <div className="lg:w-40">
            <div className="flex items-center gap-3 text-amber-900">
              <div className="relative">
                <Calendar className="w-5 h-5" />
                <div className="absolute -inset-1 border border-amber-900/20" />
              </div>
              <span className="font-sans text-sm tracking-wider text-stone-400">
                {experience.period}
              </span>
            </div>
          </div>

          {/* Company & Role */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-4 mb-3">
              <div className="relative p-2 border border-stone-700 bg-stone-800">
                <IconComponent className="w-6 h-6 text-amber-900" />
              </div>
              <div>
                <h3 className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-stone-200 group-hover:text-amber-900 transition-colors duration-300">
                  {experience.company}
                </h3>
                <p className="font-sans text-sm text-stone-400 uppercase tracking-wider mt-1">
                  {experience.role}
                </p>
              </div>
            </div>

            {/* Realm */}
            {experience.realm && (
              <div className="flex items-center gap-2 mt-2">
                <Castle className="w-4 h-4 text-stone-500" />
                <p className="text-sm text-stone-500 italic">
                  {experience.realm}
                </p>
              </div>
            )}
          </div>

          {/* Location */}
          <div className="lg:w-48">
            <div className="flex items-center gap-2 text-stone-400">
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-sans">{experience.location}</span>
            </div>
          </div>

          {/* Expand Icon - Iron Cross */}
          <div className="lg:w-16 flex justify-end">
            <motion.div
              animate={{
                rotate: isExpanded ? 180 : 0,
                backgroundColor: isExpanded
                  ? "rgba(124, 45, 18, 0.2)"
                  : "rgba(28, 25, 23, 0.8)",
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="w-12 h-12 border border-stone-700 group-hover:border-amber-900 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
            >
              <ArrowUpRight className="w-5 h-5 text-stone-300" />
            </motion.div>
          </div>
        </div>

        {/* Technologies Preview - Stone Tablets */}
        <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-stone-700">
          {experience.technologies.slice(0, 4).map((tech, i) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5 + i * 0.05 }}
              className="px-3 py-1.5 text-xs font-medium border border-stone-700 bg-stone-800 hover:border-amber-900 hover:bg-stone-900 transition-all duration-300 font-sans"
            >
              {tech}
            </motion.span>
          ))}
          {experience.technologies.length > 4 && (
            <span className="px-3 py-1.5 text-xs font-medium text-stone-500 border border-stone-700 font-sans">
              +{experience.technologies.length - 4} more
            </span>
          )}
        </div>
      </motion.div>

      {/* Expanded Content - Scroll Reveal */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: "auto", opacity: 1, marginTop: 16 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="relative pt-8 pb-6 pl-2 md:pl-4">
              {/* Iron rivet line */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-linear-to-b from-amber-900 via-stone-700 to-transparent">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-amber-900 rounded-full" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-stone-700 rounded-full" />
              </div>

              {/* Content grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pl-6">
                {/* Description */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Sword className="w-5 h-5 text-amber-900" />
                    <h4 className="font-sans text-sm uppercase tracking-wider text-amber-900">
                      Chronicles
                    </h4>
                  </div>
                  <p className="text-lg leading-relaxed text-stone-300 max-w-2xl">
                    {experience.description}
                  </p>
                </div>

                {/* Achievements */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Shield className="w-5 h-5 text-amber-900" />
                    <h4 className="font-sans text-sm uppercase tracking-wider text-amber-900">
                      Trophies & Honours
                    </h4>
                  </div>
                  <div className="space-y-3">
                    {experience.achievements.map((achievement, i) => (
                      <motion.div
                        key={achievement}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-3 p-4 border border-stone-700 bg-stone-900/50"
                      >
                        <div className="w-2 h-2 rounded-full bg-amber-900 mt-2 shrink-0" />
                        <span className="text-sm font-medium text-stone-300">
                          {achievement}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Hammer className="w-5 h-5 text-amber-900" />
                    <h4 className="font-sans text-sm uppercase tracking-wider text-amber-900">
                      Arsenal & Tools
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {experience.technologies.map((tech, i) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8 + i * 0.03 }}
                        whileHover={{
                          scale: 1.05,
                          borderColor: "#7c2d12",
                          backgroundColor: "rgba(124, 45, 18, 0.1)",
                        }}
                        className="px-4 py-2 text-sm font-medium border border-stone-700 bg-stone-800 transition-all duration-300 cursor-default font-sans"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function MedievalCounter({
  end,
  label,
  icon: Icon,
}: {
  end: number;
  label: string;
  icon: React.ElementType;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, end]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="text-center group"
    >
      <div className="relative inline-flex items-center justify-center w-16 h-16 mb-4 border border-stone-700 bg-stone-900">
        <Icon className="w-6 h-6 text-amber-900" />
        <div className="absolute inset-0 border border-stone-600 group-hover:border-amber-900 transition-all duration-300" />
      </div>
      <div className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-stone-200 mb-2">
        {count}+
      </div>
      <div className="font-sans text-xs tracking-[0.2em] text-stone-400 uppercase">
        {label}
      </div>
    </motion.div>
  );
}

export function Experience() {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={containerRef}
      id="experience"
      className="relative py-32 px-6 md:px-12 lg:px-16 overflow-hidden bg-stone-950"
    >
      {/* Stone Wall Background */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        {/* Stone Wall Pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%237c2d12' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            backgroundSize: "300px 300px",
          }}
        />

        {/* Subtle gradient overlays */}
        <div className="absolute inset-0 bg-linear-to-b from-stone-950/0 via-stone-950/30 to-stone-950/70" />
      </div>

      {/* Section Header */}
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 40 }}
        animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-w-7xl mx-auto mb-24"
      >
        <div className="flex items-center gap-4 mb-8">
          <motion.div
            className="w-20 h-px bg-linear-to-r from-amber-900 to-stone-700"
            initial={{ width: 0 }}
            animate={isHeaderInView ? { width: 80 } : {}}
            transition={{ delay: 0.3, duration: 1 }}
          />
          <motion.span
            className="font-sans text-sm tracking-[0.3em] text-stone-400 uppercase"
            initial={{ opacity: 0 }}
            animate={isHeaderInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
          >
            II — The Chronicle
          </motion.span>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
          <div>
            <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl max-w-5xl leading-tight text-stone-200">
              The{" "}
              <span className="italic font-medium text-amber-900">Forge</span>
              <br />
              of Experience
            </h2>
            <p className="text-lg text-stone-400 mt-6 max-w-2xl font-sans">
              A record of battles fought, fortresses built, and code forged in
              fire.
            </p>
          </div>

          {/* Medieval Counters */}
          <div className="flex gap-8">
            <MedievalCounter end={3} label="Years Forged" icon={Sword} />
            <MedievalCounter end={25} label="Projects Wrought" icon={Hammer} />
            <MedievalCounter end={98} label="Client Honor" icon={Shield} />
          </div>
        </div>
      </motion.div>

      {/* Experience Cards */}
      <div className="relative max-w-6xl mx-auto space-y-6">
        {experiences.map((experience, index) => (
          <ExperienceCard
            key={experience.company}
            experience={experience}
            index={index}
            isExpanded={expandedIndex === index}
            onToggle={() =>
              setExpandedIndex(expandedIndex === index ? null : index)
            }
          />
        ))}
      </div>

      {/* Medieval Timeline Scroll Indicator */}
      <motion.div
        style={{ y, opacity }}
        className="absolute top-32 right-0 md:right-12 hidden lg:block"
      >
        <div className="flex flex-col items-end gap-12">
          {["Apprentice", "Journeyman", "Master"].map((rank, index) => (
            <motion.div
              key={rank}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="relative flex flex-col items-end"
            >
              <div className="text-right mb-2">
                <div className="font-serif text-3xl font-bold tracking-tight text-stone-700">
                  {rank}
                </div>
                <div className="font-sans text-[10px] tracking-[0.2em] text-stone-500 uppercase">
                  Rank
                </div>
              </div>
              <div className="w-8 h-8 border-2 border-stone-700 flex items-center justify-center">
                <div className="w-2 h-2 bg-amber-900" />
              </div>
              <div className="absolute top-8 -right-1 w-px h-12 bg-linear-to-b from-amber-900/30 to-transparent" />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Stone Pillar Divider */}
      <div className="absolute left-1/2 -translate-x-1/2 top-32 bottom-32 w-px bg-linear-to-b from-transparent via-stone-700 to-transparent hidden lg:block" />

      {/* Call to Arms */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="max-w-4xl mx-auto mt-24 text-center"
      >
        <div className="inline-flex items-center gap-4 px-8 py-4 border border-stone-700 bg-stone-900/50">
          <Target className="w-5 h-5 text-amber-900" />
          <span className="font-sans text-sm text-stone-300">
            Need a digital fortress forged?{" "}
            <button className="text-amber-900 hover:text-stone-200 transition-colors duration-300 ml-2 font-sans">
              Join the campaign →
            </button>
          </span>
        </div>
      </motion.div>

      {/* Stone Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-5 mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </section>
  );
}
