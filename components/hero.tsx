"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Knight3D } from "./knight-3d";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Smooth Spring for Parallax
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const yParallax = useSpring(useTransform(scrollYProgress, [0, 1], [0, -150]), springConfig);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  // Variants for Staggered Animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { clipPath: "inset(100% 0 0 0)", y: 50 },
    visible: {
      clipPath: "inset(0% 0 0 0)",
      y: 0,
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative h-[110vh] w-full overflow-hidden bg-background selection:bg-accent selection:text-accent-foreground"
    >
      {/* 1. Grainy Overlay (Texture) */}
      <div className="absolute inset-0 z-20 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* 2. Background 3D Scene with Parallax */}
      <motion.div style={{ y: yParallax }} className="absolute inset-0 z-0">
        <Knight3D />
      </motion.div>

      {/* 3. Refined Vignette & Spotlight */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.4)_50%,rgba(0,0,0,0.9)_100%)]" />

      {/* 4. Main Content */}
      <motion.div
        style={{ opacity, scale }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-30 h-full container mx-auto px-6 flex flex-col justify-center"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* LEFT: Heavy Typography (Column 1-7) */}
          <div className="lg:col-span-8 flex flex-col space-y-2">
            <motion.span 
              variants={itemVariants}
              className="font-mono text-xs md:text-sm tracking-[0.3em] text-accent/60 uppercase"
            >
              Portfolio Volume — 02
            </motion.span>
            
            <h1 className="font-serif text-[12vw] lg:text-[10vw] font-bold leading-[0.8] tracking-tighter">
              <motion.span variants={itemVariants} className="block">
                MUHAMMAD
              </motion.span>
              <motion.span 
                variants={itemVariants} 
                className="block text-accent italic font-light ml-[0.5em] lg:ml-[1em]"
              >
                Fadlan.
              </motion.span>
            </h1>
          </div>

          {/* RIGHT: Details (Column 9-12) */}
          <div className="lg:col-start-9 lg:col-span-4 space-y-12">
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="h-px w-20 bg-accent/50" />
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-light">
                <span className="text-foreground font-medium italic">Ancient logic</span> meets modern engineering. 
                Building digital fortresses with deliberate code.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Location</span>
                <p className="text-sm font-medium uppercase">Jakarta, ID</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Specialization</span>
                <p className="text-sm font-medium uppercase text-accent/80">Software Eng.</p>
              </div>
            </motion.div>

            {/* Availability Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-4 group cursor-pointer">
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </div>
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase group-hover:text-primary transition-colors">
                Available for New Projects
              </span>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* 5. Floating "MF" Watermark (Parallax) */}
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -300]) }}
        className="absolute top-20 right-[-5%] text-[25vw] font-serif font-black text-white/[0.02] select-none z-0"
      >
        MF
      </motion.div>

      {/* 6. Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30"
      >
        <div className="flex flex-col items-center gap-4">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground vertical-rl">
            Scroll
          </span>
          <motion.div
            animate={{ height: [40, 80, 40], y: [0, 5, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-[1px] bg-gradient-to-b from-accent/50 via-accent to-transparent"
          />
        </div>
      </motion.div>

      {/* Decorative Frame */}
      <div className="absolute inset-8 border border-white/[0.03] pointer-events-none z-40" />
    </section>
  );
}