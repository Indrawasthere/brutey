"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useProgress } from "@react-three/drei";

export function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const { progress, active } = useProgress();
  const [smoothProgress, setSmoothProgress] = useState(0);

  useEffect(() => {
    if (progress > smoothProgress) {
      setSmoothProgress(Math.round(progress));
    }
  }, [progress]);

  useEffect(() => {
    if (smoothProgress >= 100 && !active) {
      const timeout = setTimeout(() => {
        setLoading(false);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [smoothProgress, active]);

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    }
  }, [loading]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          onAnimationComplete={() => {
            document.body.style.overflowY = "auto";
          }}
          className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-[#0a0a0a]"
        >
          {/* Animated Obsidian Background Texture */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute inset-0 opacity-20"
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%"],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                backgroundImage: `
                  radial-gradient(circle at 20% 30%, rgba(120, 113, 108, 0.1) 1px, transparent 1px),
                  radial-gradient(circle at 80% 70%, rgba(120, 113, 108, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: "50px 50px, 70px 70px",
              }}
            />
          </div>
          <div className="relative z-10 flex flex-col items-center justify-center">
            {/* Title with subtle animation */}
            <div className="relative overflow-hidden mb-8 px-4 text-center">
              <motion.h1
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.1,
                }}
                className="font-serif text-3xl md:text-4xl text-stone-300 tracking-[0.3em]"
              >
                FORGING
              </motion.h1>
              <motion.h2
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.2,
                }}
                className="font-serif text-4xl md:text-5xl text-red-600 mt-2 tracking-tight"
              >
                MY FORTRESS
              </motion.h2>
            </div>

            {/* Minimal Progress Bar */}
            {/* Blade Forging Progress */}
            <div className="w-72 md:w-96 mb-10 relative">
              {/* Blade track */}
              <div className="relative h-0.5 bg-linear-to-r from-transparent via-stone-700 to-transparent overflow-hidden">
                {/* Heat shimmer */}
                <motion.div
                  className="absolute inset-0"
                  animate={{ x: ["-120%", "120%"] }}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(180, 60, 40, 0.45), transparent)",
                  }}
                />

                {/* Forged blade fill */}
                <motion.div
                  className="absolute top-0 left-0 h-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${smoothProgress}%` }}
                  transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
                  style={{
                    background:
                      "linear-gradient(90deg, #e5e5e5, #9ca3af, #e5e5e5)",
                    boxShadow: "0 0 12px rgba(180,60,40,0.35)",
                  }}
                />
              </div>
            </div>

            {/* Ritual Status Text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mb-3"
            >
              <span className="font-mono text-xs tracking-[0.45em] text-stone-500 uppercase">
                {smoothProgress < 30 && "GATHERING STEEL"}
                {smoothProgress >= 30 && smoothProgress < 70 && "TEMPERING"}
                {smoothProgress >= 70 && smoothProgress < 100 && "SHARPENING"}
                {smoothProgress >= 100 && "BLADE READY"}
              </span>
            </motion.div>

            {/* Forging Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="flex items-center gap-2"
            >
              {active ? (
                <>
                  <motion.div
                    animate={{ scale: [1, 1.4, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="w-1.5 h-1.5 rounded-full bg-red-500/70"
                  />
                  <span className="text-[10px] tracking-[0.35em] text-stone-600 uppercase">
                    FORGING IN FIRE
                  </span>
                </>
              ) : smoothProgress >= 100 ? (
                <>
                  <div className="w-1.5 h-1.5 rounded-full bg-stone-300 animate-pulse" />
                  <span className="text-[10px] tracking-[0.35em] text-stone-500 uppercase">
                    FORGE COMPLETE
                  </span>
                </>
              ) : null}
            </motion.div>

            {/* Decorative Sigils */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
              <motion.div
                className="flex gap-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
              >
                <div className="w-14 h-px bg-linear-to-r from-transparent via-stone-700 to-transparent" />
                <div className="w-14 h-px bg-linear-to-r from-transparent via-stone-700 to-transparent" />
              </motion.div>
            </div>
          </div>{" "}
          {/* This closing div was missing */}
          {/* Subtle floating particles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-px h-12 bg-stone-800/30"
                initial={{ y: -20, opacity: 0 }}
                animate={{
                  y: ["0vh", "100vh"],
                  opacity: [0, 0.5, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "linear",
                }}
                style={{
                  left: `${15 + i * 15}%`,
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
