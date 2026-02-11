"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const AVATAR_BLUR_DATAURL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAECAIAAADETxJQAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAMUlEQVR4nGP49+ffy5dvViydz+Dt5VdW4BcbHcWgp63cXRHKzsTA0FJfnJEcZmpqAACHCA+aNrwEHAAAAABJRU5ErkJggg==";

export function About() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1.1, 1]);
  const rotateDecorative = useTransform(scrollYProgress, [0, 1], [0, 15]);

  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0],
  );
  const contentY = useTransform(scrollYProgress, [0, 0.2], [50, 0]);
  const textGlitch = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative py-24 md:py-40 px-6 md:px-12 lg:px-24 overflow-hidden bg-[#0a0a0a]"
    >
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />{" "}
      </div>
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.02]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="runesPattern"
              x="0"
              y="0"
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
            >
              <text
                x="40"
                y="40"
                fontFamily="serif"
                fontSize="14"
                fill="#666"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                ᛉ
              </text>
              <text
                x="10"
                y="20"
                fontFamily="serif"
                fontSize="10"
                fill="#444"
                opacity="0.5"
              >
                ᚨ
              </text>
              <text
                x="60"
                y="60"
                fontFamily="serif"
                fontSize="12"
                fill="#555"
                opacity="0.3"
              >
                ᛞ
              </text>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#runesPattern)" />
        </svg>
      </div>

      <motion.div
        style={{ opacity: contentOpacity }}
        className="max-w-7xl mx-auto relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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
              CHAPTER I — PROFILE
            </motion.span>
          </div>

          <motion.h2
            className="font-serif text-5xl md:text-7xl lg:text-8xl leading-none tracking-tighter uppercase relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <motion.span
              className="absolute -left-6 top-4 text-3xl text-primary/30"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              ⚔
            </motion.span>
            ABOUT <span className="text-primary italic font-light">ME</span>
            <motion.span
              className="absolute -right-6 bottom-4 text-3xl text-primary/30"
              animate={{ rotate: [360, 0] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              ⚔
            </motion.span>
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <motion.div
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              style={{ rotate: rotateDecorative }}
              className="absolute -top-6 -left-6 w-24 h-24 border-t-2 border-l-2 border-primary/20"
            />

            <div className="relative aspect-3/4 overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 border-2 border-white/10 bg-stone-900 shadow-2xl">
              <Image
                src="/avatar.png"
                alt="Muhammad Fadlan"
                fill
                quality={75}
                priority={false}
                placeholder="blur"
                blurDataURL={AVATAR_BLUR_DATAURL}
                className="w-full h-full object-cover opacity-90 will-change-transform"
                sizes="(max-width: 768px) 100vw, 500px"
              />
              <motion.div
                style={{ scale: imageScale }}
                className="absolute inset-0"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 mix-blend-overlay pointer-events-none" />
              <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]" />

              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-2 -right-2 w-8 h-8 border-r-2 border-b-2 border-primary/30"
              />
            </div>

            <motion.div
              className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-primary"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-primary/30"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            />

            <div className="mt-8 flex items-baseline gap-4 relative">
              <span className="font-serif italic text-primary text-2xl">
                MMXXII
              </span>
              <span className="text-stone-500 text-[10px] uppercase tracking-[0.3em]">
                Start Practicing
              </span>

              <motion.div
                className="absolute -right-4 top-1/2 w-1 h-12 bg-gradient-to-b from-transparent via-primary/20 to-transparent"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </div>
          </motion.div>

          <div className="lg:col-span-7 flex flex-col justify-center pt-4">
            <motion.div
              style={{ y: contentY }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.h3
                className="font-serif text-3xl md:text-5xl leading-[1.1] mb-8 text-white tracking-tight relative"
                style={{
                  filter: textGlitch.get() > 0.5 ? "url(#glitch)" : "none",
                }}
              >
                <span className="absolute -left-8 top-0 text-2xl text-primary/20">
                  †
                </span>
                A GUY{" "}
                <span className="text-primary italic relative">
                  WHO'S ADDICTED
                  <motion.span
                    className="absolute -right-4 -top-2 text-xl"
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ⚔
                  </motion.span>
                </span>{" "}
                TO CODE.
                <span className="absolute -right-8 bottom-0 text-2xl text-primary/20">
                  †
                </span>
              </motion.h3>

              <div className="space-y-7 text-lg text-stone-400 font-sans leading-relaxed max-w-2xl relative">
                {[
                  <>
                    I am{" "}
                    <span className="text-white font-semibold tracking-tight relative">
                      FADLAN
                      <motion.span
                        className="absolute -right-3 top-0 text-xs text-primary"
                        animate={{ rotate: [0, 360] }}
                        transition={{
                          duration: 10,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        *
                      </motion.span>
                    </span>
                    , a software engineer with a strong foundation in
                    logic-driven system design and practical engineering. My
                    journey started in 2016, learning and experimenting within
                    constrained environments—from internet cafés to early mobile
                    platforms—where I developed a deep appreciation for
                    efficiency, structure, and problem-solving.
                  </>,
                  <>
                    At a young age, I began building real-world systems,
                    including school enrollment platforms and examination
                    servers. These early experiences shaped my understanding of
                    responsibility, scalability, and the importance of reliable
                    systems that support real users.
                  </>,
                  <>
                    Since then, I have worked across various environments—from
                    government-related projects such as the{" "}
                    <span className="text-white font-medium border-b border-primary/30 text-sm tracking-wide relative group">
                      Ministry of Agriculture
                      <span className="absolute -bottom-1 left-0 w-0 group-hover:w-full h-px bg-primary/50 transition-all duration-300" />
                    </span>
                    , to startups and enterprise-scale operations. My work spans
                    warehouse management systems with RFID integration, internal
                    platforms, and real-time dashboards designed to support
                    operational decision-making.
                  </>,
                  <>
                    I am currently pursuing a degree in{" "}
                    <span className="text-white relative">
                      Information Systems
                      <motion.span
                        className="absolute -right-4 top-1/2 w-2 h-2 bg-primary rotate-45"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </span>
                    , at Binus University while continuing to explore software
                    architecture and applied AI. My focus remains on building
                    systems that effectively connect software, infrastructure,
                    and meaningful human impact.
                  </>,
                ].map((text, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: i * 0.1,
                      duration: 0.8,
                      ease: [0.21, 0.47, 0.32, 0.98],
                    }}
                    viewport={{ once: true, margin: "-50px" }}
                    className="will-change-transform relative"
                  >
                    <span className="absolute -left-6 top-2 text-xs text-primary/30">
                      ›
                    </span>
                    {text}
                  </motion.p>
                ))}

                <motion.div
                  className="pt-6 relative"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="absolute -left-4 top-0 w-1 h-full bg-linear-to-b from-transparent via-primary/10 to-transparent" />

                  <p className="text-primary font-semibold uppercase mb-4 text-xs tracking-[0.25em] flex items-center gap-3">
                    <motion.span
                      className="w-2 h-2 bg-primary rotate-45"
                      animate={{ rotate: [45, 135, 45] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                    Current Crafting Tools
                  </p>
                  <div className="grid grid-cols-2 gap-y-4 gap-x-8 font-sans text-[13px] text-stone-500 uppercase tracking-widest">
                    {[
                      "TypeScript / Next.js",
                      "Go / Node.js",
                      "PostgreSQL / Redis",
                      "Applied AI Engineering",
                    ].map((tool, i) => (
                      <motion.div
                        key={i}
                        className="flex items-center gap-3 group/item relative"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.9 + i * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <motion.span
                          className="w-1.5 h-1.5 bg-primary rotate-45 transition-transform group-hover/item:scale-125 group-hover/item:rotate-90"
                          animate={{ rotate: [45, 135, 45] }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            delay: i * 0.5,
                          }}
                        />
                        <span className="transition-all duration-300 group-hover/item:text-white group-hover/item:tracking-[0.4em]">
                          {tool}
                        </span>
                        <div className="absolute -inset-2 border border-primary/0 group-hover/item:border-primary/10 transition-all duration-300 pointer-events-none" />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              <motion.div
                className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-16 border-t border-white/5 pt-10 relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1 }}
              >
                <div className="absolute -top-1 left-0 w-20 h-px bg-gradient-to-r from-primary to-transparent" />

                {[
                  { label: "Experience", value: "3+ YEARS" },
                  { label: "Status", value: "Available" },
                  { label: "Current Focus", value: "Web3 & AI" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="space-y-1 relative group"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 + i * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <motion.span
                      className="absolute -left-4 top-2 w-1 h-8 bg-primary/20 group-hover:bg-primary/40 transition-colors"
                      animate={{ height: [8, 16, 8] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3,
                      }}
                    />
                    <span className="uppercase text-[9px] text-stone-600 block">
                      {item.label}
                    </span>
                    <span className="font-sans text-primary text-xl tracking-tighter font-bold">
                      {item.value}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.div
        style={{ y: yParallax, opacity: contentOpacity }}
        className="absolute -bottom-10 -right-10 pointer-events-none select-none opacity-[0.02] transition-none"
      >
        <h3
          className="font-serif text-[25vw] font-black leading-none uppercase text-transparent"
          style={{ WebkitTextStroke: "1px rgba(212, 165, 116, 0.1)" }}
        >
          ABOUT
        </h3>
      </motion.div>

      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="glitch" x="0" y="0">
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
            />
            <feOffset dx="0" dy="2" result="offset1" />
            <feOffset dx="2" dy="0" result="offset2" />
            <feBlend mode="screen" in="SourceGraphic" in2="offset1" />
            <feBlend mode="difference" in="SourceGraphic" in2="offset2" />
          </filter>
        </defs>
      </svg>
    </section>
  );
}
