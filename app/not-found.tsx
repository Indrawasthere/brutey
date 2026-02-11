"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MoveLeft, AlertTriangle, Ghost } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative min-h-screen bg-background flex items-center justify-center px-6 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] select-none pointer-events-none">
        <h1 className="font-serif text-[40vw] font-black uppercase italic">
          VOID
        </h1>
      </div>

      <div className="relative z-10 max-w-3xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-8"
        >
          <div className="border-2 border-primary px-4 py-1 flex items-center gap-3 bg-primary/5">
            <AlertTriangle className="w-4 h-4 text-primary" />
            <span className="font-sans text-[10px] tracking-[0.4em] font-black text-primary uppercase">
              Error Code: 404 // Lost in Archive
            </span>
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="font-serif text-7xl md:text-9xl font-bold leading-none uppercase mb-8"
        >
          YOU'VE REACHED <br />
          <span className="text-primary italic">THE EDGE</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="font-sans text-stone-400 text-lg md:text-xl mb-12 max-w-xl mx-auto leading-relaxed"
        >
          The page you seek is not recorded in these archives. It may have been
          destroyed, or perhaps it was never forged at all. Return to
          civilization, traveler.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <Link
            href="/"
            className="group relative inline-flex items-center gap-4 bg-primary px-8 py-4 transition-transform active:scale-95 overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />

            <span className="relative z-10 font-sans font-black text-black tracking-widest uppercase flex items-center gap-3">
              <MoveLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform" />
              BACK TO HOMEPAGE
            </span>
          </Link>
        </motion.div>
      </div>

      <div className="absolute bottom-12 right-12 hidden md:block opacity-20 rotate-12 pointer-events-none">
        <div className="border-4 border-double border-stone-500 p-4">
          <p className="font-serif text-sm font-bold text-stone-500 uppercase leading-tight">
            Authentication Error
            <br />
            Status: Unknown
            <br />
            ID: 0x000404
          </p>
        </div>
      </div>
    </main>
  );
}
