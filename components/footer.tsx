"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowUpRight, Clock, Sword } from "lucide-react"

export function Footer() {
  const [time, setTime] = useState("")
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      
      // Jakarta timezone (GMT+7)
      const jakartaTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Jakarta" }))
      const hours = jakartaTime.getHours().toString().padStart(2, "0")
      const minutes = jakartaTime.getMinutes().toString().padStart(2, "0")
      const seconds = jakartaTime.getSeconds().toString().padStart(2, "0")
      const milliseconds = jakartaTime.getMilliseconds().toString().padStart(3, "0")
      setTime(`${hours}:${minutes}:${seconds}.${milliseconds}`)
    }

    updateTime()
    const interval = setInterval(updateTime, 10)
    return () => clearInterval(interval)
  }, [])

  return (
    <footer className="relative bg-background">
      {/* Main CTA - Brutalist Portal */}
      <motion.a
        href="mailto:hello@muhammadfadlan.dev"
        data-cursor-hover
        className="relative block overflow-hidden group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Background gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-accent"
          initial={{ y: "100%" }}
          animate={{ y: isHovered ? "0%" : "100%" }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        />

        {/* Content */}
        <div className="relative py-20 md:py-28 px-8 md:px-12 border-t-2 border-b-2 border-primary/30">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <p className="font-mono-label text-primary/60 mb-2">
                07 — SUMMON ME
              </p>
              <motion.h2
                className="font-sans text-4xl md:text-6xl lg:text-8xl font-bold tracking-wider uppercase"
                animate={{
                  color: isHovered ? "#0a0a0a" : "var(--foreground)",
                }}
                transition={{ duration: 0.3 }}
              >
                Let&apos;s <span className="italic font-light text-primary">Forge</span>
              </motion.h2>
            </div>

            <motion.div
              className="flex items-center gap-4"
              animate={{
                rotate: isHovered ? 45 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-16 h-16 border-2 border-primary/50 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/20 scale-0 group-hover:scale-100 transition-transform duration-300" />
                <ArrowUpRight className="w-8 h-8 text-primary relative z-10" />
              </div>
            </motion.div>
          </div>
          
          {/* Corner decorations */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-primary/40" />
          <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-primary/40" />
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-primary/40" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-primary/40" />
        </div>
      </motion.a>

      {/* Footer Info - Medieval Dashboard */}
      <div className="px-8 md:px-12 py-8 border-t border-primary/20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Local Time - Jakarta GMT+7 */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-2 border border-primary/20">
              <Clock className="w-4 h-4 text-primary" />
              <span className="font-mono text-xs tracking-wider text-primary/80">
                <span className="text-foreground mr-2">JAKARTA</span>
                {time}
                <span className="ml-2 text-accent font-bold">GMT+7</span>
              </span>
            </div>
          </div>

          {/* Status indicator */}
          <div className="flex items-center gap-3">
            <Sword className="w-4 h-4 text-primary/60" />
            <span className="font-mono-label text-primary/60 text-[10px] tracking-widest">
              BUILT FOR ETERNITY
            </span>
          </div>

          {/* Copyright */}
          <p className="font-mono-label text-primary/60 text-[10px] tracking-widest">
            © {new Date().getFullYear()} MUHAMMAD FADLAN
          </p>
        </div>
      </div>
    </footer>
  )
}

