"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function About() {
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
      id="about"
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
        style={{ opacity: contentOpacity }}
        className="max-w-7xl mx-auto relative z-10"
      >
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
              CHAPTER I — PROFILE
            </motion.span>
          </div>

          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-none tracking-tighter uppercase">
            ABOUT <span className="text-primary italic font-light">ME</span>
          </h2>
        </motion.div>

        {/* MAIN CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* LEFT: IMAGE SECTION */}
          <motion.div
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative aspect-3/4 overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 border border-white/10 bg-stone-900">
              <motion.img
                style={{ scale: imageScale }}
                src="/avatar.png"
                alt="Muhammad Fadlan"
                loading="lazy"
                className="w-full h-full object-cover opacity-80 will-change-transform"
              />
              <div className="absolute inset-0 bg-primary/5 mix-blend-multiply pointer-events-none" />
              <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.6)]" />
            </div>

            <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-primary" />
            <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-primary/30" />

            <div className="mt-8 flex items-baseline gap-4">
              <span className="font-serif italic text-primary text-2xl">
                MMXXII
              </span>
              <span className="label-caps text-stone-500 text-[10px]!">
                Start Practicing
              </span>
            </div>
          </motion.div>

          {/* RIGHT: CONTENT SECTION */}
          <div className="lg:col-span-7 flex flex-col justify-center pt-4">
            <motion.div
              style={{ y: contentY }} // Gerak naik pas scroll masuk
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="font-serif text-3xl md:text-5xl leading-[1.1] mb-8 text-foreground tracking-tight">
                A GUY{" "}
                <span className="text-primary italic">WHO'S ADDICTED</span> TO
                CODE.
              </h3>

              <div className="space-y-7 text-lg text-stone-400 font-sans leading-relaxed max-w-2xl">
                {/* Kita bagi per paragraf buat efek staggered fade in */}
                {[
                  <>
                    I am{" "}
                    <span className="text-white font-semibold tracking-tight">
                      Fadlan
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
                    <span className="text-white font-medium border-b border-primary/30 text-sm tracking-wide">
                      Ministry of Agriculture
                    </span>
                    , to startups and enterprise-scale operations. My work spans
                    warehouse management systems with RFID integration, internal
                    platforms, and real-time dashboards designed to support
                    operational decision-making.
                  </>,
                  <>
                    I am currently pursuing a degree in{" "}
                    <span className="text-foreground">Information Systems</span>
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
                    className="will-change-transform"
                  >
                    {text}
                  </motion.p>
                ))}

                {/* Tech Tools Section */}
                <motion.div
                  className="pt-6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                >
                  <p className="text-primary font-semibold label-caps mb-4 text-xs! tracking-[0.25em]">
                    Current Crafting Tools
                  </p>
                  <div className="grid grid-cols-2 gap-y-3 gap-x-6 font-technical text-[13px] text-stone-500 uppercase tracking-widest">
                    {[
                      "TypeScript / Next.js",
                      "Go / Node.js",
                      "PostgreSQL / Redis",
                      "Applied AI Engineering",
                    ].map((tool, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 group/item"
                      >
                        <span className="w-1.5 h-1.5 bg-primary rotate-45 transition-transform group-hover/item:scale-125" />
                        <span className="transition-colors group-hover/item:text-white">
                          {tool}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Stats Grid */}
              <motion.div
                className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-16 border-t border-white/5 pt-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1 }}
              >
                <div className="space-y-1">
                  <span className="label-caps text-[9px]! text-stone-600 block">
                    Experience
                  </span>
                  <span className="font-technical text-primary text-xl tracking-tighter font-bold">
                    3+ YEARS
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="label-caps text-[9px]! text-stone-600 block">
                    Status
                  </span>
                  <span className="font-technical text-white text-xl tracking-tighter uppercase font-bold">
                    Available
                  </span>
                </div>
                <div className="space-y-1 col-span-2 md:col-span-1">
                  <span className="label-caps text-[9px]! text-stone-600 block">
                    Current Focus
                  </span>
                  <span className="font-technical text-white text-xl tracking-tighter uppercase font-bold">
                    Web3 & AI
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Floating Big Text Parallax */}
      <motion.div
        style={{ y: yParallax, opacity: contentOpacity }}
        className="absolute -bottom-10 -right-10 pointer-events-none select-none opacity-[0.02] transition-none"
      >
        <h3 className="font-serif text-[25vw] font-bold leading-none uppercase outline-text opacity-8">
          ABOUT
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
