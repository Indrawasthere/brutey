"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-[100]"
        style={{ scaleX }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-8 right-8 z-[100] w-14 h-14 bg-primary border-2 border-white/10 flex items-center justify-center group hover:bg-primary/80 transition-all duration-300 cursor-pointer"
        whileHover={{
          scale: 1.1,
          rotate: 5,
        }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div
          className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-white/50"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-white/50"
          animate={{
            opacity: [1, 0.5, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.svg
          className="w-6 h-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          animate={{
            y: [0, -3, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </motion.svg>
      </motion.button>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{
          opacity: isVisible ? 1 : 0,
          x: isVisible ? 0 : 20,
        }}
        className="fixed bottom-28 right-8 z-[100] flex flex-col items-center gap-2"
      >
        <div className="text-xs text-stone-400 font-mono tracking-wider">
          <motion.span
            key={Math.round(scrollYProgress.get() * 100)}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {Math.round(scrollYProgress.get() * 100)}%
          </motion.span>
        </div>
        <div className="w-px h-16 bg-stone-700 relative">
          <motion.div
            className="absolute bottom-0 left-0 w-full bg-primary"
            style={{
              height: `${scrollYProgress.get() * 100}%`,
            }}
          />
        </div>
      </motion.div>
    </>
  );
}
