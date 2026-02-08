"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { NeuralNetwork3D } from "./neural-network-3d";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.85]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-[#0a0a0a]"
    >
      {/* Neural Network 3D Background */}
      <div className="absolute inset-0">
        <NeuralNetwork3D />
      </div>

      {/* Vignette overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.7)_100%)]" />

      {/* Typography Overlay */}
      <motion.div
        style={{ opacity, scale }}
        className="relative z-10 h-full flex flex-col justify-between p-6 md:p-12"
      >
        {/* Top Left */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 0.3,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-primary" />
            <p className="font-mono-label text-primary/80">
              01 — INTRODUCTION
            </p>
          </div>
          <h1 className="font-sans text-5xl md:text-7xl lg:text-8xl font-bold tracking-wider uppercase text-foreground">
            MUHAMMAD
            <br />
            <span className="italic font-light text-primary">FADLAN</span>
          </h1>
        </motion.div>

        {/* Center Button - Brutalist Style */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.7,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
        >
          <motion.button
            data-cursor-hover
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="group relative px-10 py-5 bg-transparent overflow-hidden"
          >
            {/* Brutalist border decoration */}
            <div className="absolute inset-0 border-2 border-primary/40 transition-colors duration-300" 
                 style={{ clipPath: 'polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)' }} 
            />
            
            {/* Inner glow effect */}
            <div className="absolute inset-[3px] border border-primary/20 transition-colors duration-300"
                 style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
            />
            
            <span className="relative z-10 font-mono text-xs tracking-[0.25em] uppercase text-primary group-hover:text-white transition-colors duration-300">
              ENTER FORTRESS
            </span>
            
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-l-2 border-t-2 border-primary" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-r-2 border-b-2 border-primary" />
          </motion.button>
        </motion.div>

        {/* Bottom Right */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="self-end text-right"
        >
          <div className="flex items-center justify-end gap-3 mb-4">
            <p className="font-mono-label text-primary/80">
              02 — ROLE
            </p>
            <div className="w-8 h-[1px] bg-primary" />
          </div>
          <h1 className="font-sans text-5xl md:text-7xl lg:text-8xl font-bold tracking-wider uppercase text-foreground">
            SOFTWARE
            <br />
            <span className="italic font-light text-accent">ENGINEER</span>
          </h1>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator - Medieval Style */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-8 md:left-12 z-10"
      >
        <motion.div
          animate={{ x: [0, 5, 0], opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="flex flex-col items-center gap-3"
        >
          <span className="font-mono-label text-muted-foreground vertical-text writing-vertical-rl rotate-180">
            Descend
          </span>
          <div className="w-px h-12 bg-linear-to-b from-primary/50 via-primary to-transparent" />
        </motion.div>
      </motion.div>

      {/* Corner decorations */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-primary/30" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-primary/30" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-primary/30" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-primary/30" />
    </section>
  );
}

