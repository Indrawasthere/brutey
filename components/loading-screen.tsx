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
          {/* Animated Obsidian Background */}
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
          <div className="relative z-10 flex flex-col items-center justify-center px-6">
            {/* Title */}
            <div className="relative overflow-hidden mb-12 md:mb-16 text-center">
              <motion.h1
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.1,
                }}
                className="font-serif text-4xl sm:text-5xl md:text-6xl text-stone-300 tracking-[0.2em] sm:tracking-[0.3em]"
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
                className="font-serif text-5xl sm:text-6xl md:text-7xl text-red-600 mt-3 tracking-tight"
              >
                THE FORTRESS
              </motion.h2>
            </div>

            {/* Blade Forging Progress */}
            <div className="w-full max-w-sm md:max-w-md mb-12 md:mb-16 relative px-4 md:px-0">
              {/* Blade track */}
              <div className="relative h-1 md:h-0.5 bg-linear-to-r from-transparent via-stone-700 to-transparent overflow-hidden rounded-full">
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
                  className="absolute top-0 left-0 h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${smoothProgress}%` }}
                  transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
                  style={{
                    background:
                      "linear-gradient(90deg, #e5e5e5, #9ca3af, #e5e5e5)",
                    boxShadow: "0 0 16px rgba(180,60,40,0.4)",
                  }}
                />
              </div>
            </div>

            {/* Ritual Status Text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mb-4 md:mb-5"
            >
              <span className="font-sans text-sm md:text-xs tracking-[0.3em] md:tracking-[0.45em] text-stone-500 uppercase">
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
              className="flex items-center gap-3"
            >
              {active ? (
                <>
                  <motion.div
                    animate={{ scale: [1, 1.4, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="w-2 h-2 md:w-1.5 md:h-1.5 rounded-full bg-red-500/70"
                  />
                  <span className="text-xs md:text-[10px] tracking-[0.25em] md:tracking-[0.35em] text-stone-600 uppercase">
                    FORGING IN FIRE
                  </span>
                </>
              ) : smoothProgress >= 100 ? (
                <>
                  <div className="w-2 h-2 md:w-1.5 md:h-1.5 rounded-full bg-stone-300 animate-pulse" />
                  <span className="text-xs md:text-[10px] tracking-[0.25em] md:tracking-[0.35em] text-stone-500 uppercase">
                    FORGE COMPLETE
                  </span>
                </>
              ) : null}
            </motion.div>

            {/* Decorative Sigils */}
            <div className="absolute bottom-12 md:bottom-10 left-1/2 -translate-x-1/2">
              <motion.div
                className="flex gap-8 md:gap-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
              >
                <div className="w-12 md:w-14 h-px bg-linear-to-r from-transparent via-stone-700 to-transparent" />
                <div className="w-12 md:w-14 h-px bg-linear-to-r from-transparent via-stone-700 to-transparent" />
              </motion.div>
            </div>
          </div>{" "}
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
