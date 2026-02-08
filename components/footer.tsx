"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowUpRight, Clock } from "lucide-react"

export function Footer() {
  const [time, setTime] = useState("")
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const jakartaTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Jakarta" }))
      const hours = jakartaTime.getHours().toString().padStart(2, "0")
      const minutes = jakartaTime.getMinutes().toString().padStart(2, "0")
      const seconds = jakartaTime.getSeconds().toString().padStart(2, "0")
      setTime(`${hours}:${minutes}:${seconds}`)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <footer className="relative bg-background border-t-2 border-border">
      {/* Main CTA */}
      <motion.a
        href="mailto:mhmdfdln14@gmail.com"
        className="relative block overflow-hidden group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Background effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-accent via-accent to-primary"
          initial={{ y: "100%" }}
          animate={{ y: isHovered ? "0%" : "100%" }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        />

        {/* Content */}
        <div className="relative py-24 md:py-32 px-6 md:px-12 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              {/* Text */}
              <div>
                <p className="label-caps text-muted-foreground group-hover:text-background/80 mb-4 transition-colors duration-300">
                  04 — Get in Touch
                </p>
                <motion.h2
                  className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight"
                  animate={{
                    color: isHovered ? "#0a0a0a" : "#d4d4d8",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  Let's Build
                  <br />
                  <span className="italic font-medium">Together</span>
                </motion.h2>
              </div>

              {/* Icon */}
              <motion.div
                className="w-20 h-20 md:w-24 md:h-24 border-2 border-accent/30 group-hover:border-background flex items-center justify-center transition-colors duration-300"
                animate={{
                  rotate: isHovered ? 45 : 0,
                  scale: isHovered ? 1.1 : 1,
                }}
                transition={{ duration: 0.4 }}
              >
                <ArrowUpRight 
                  className="w-10 h-10 md:w-12 md:h-12 text-accent group-hover:text-background transition-colors duration-300" 
                />
              </motion.div>
            </div>
          </div>

          {/* Corner decorations */}
          <div className="absolute top-6 left-6 w-8 h-8 border-l-2 border-t-2 border-accent/20 group-hover:border-background/30 transition-colors duration-300" />
          <div className="absolute top-6 right-6 w-8 h-8 border-r-2 border-t-2 border-accent/20 group-hover:border-background/30 transition-colors duration-300" />
          <div className="absolute bottom-6 left-6 w-8 h-8 border-l-2 border-b-2 border-accent/20 group-hover:border-background/30 transition-colors duration-300" />
          <div className="absolute bottom-6 right-6 w-8 h-8 border-r-2 border-b-2 border-accent/20 group-hover:border-background/30 transition-colors duration-300" />
        </div>
      </motion.a>

      {/* Footer Info */}
      <div className="border-t-2 border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            {/* Time */}
            <div className="flex items-center gap-4 px-4 py-2 border border-border">
              <Clock className="w-4 h-4 text-accent" />
              <div className="flex items-center gap-3">
                <span className="label-caps text-muted-foreground">
                  Jakarta
                </span>
                <span className="font-sans text-sm font-medium tabular-nums">
                  {time}
                </span>
                <span className="label-caps text-accent">
                  GMT+7
                </span>
              </div>
            </div>

            {/* Copyright */}
            <div className="label-caps text-muted-foreground">
              © {new Date().getFullYear()} Muhammad Fadlan — All rights reserved
            </div>

            {/* Signature */}
            <div className="label-caps text-accent">
              Forged with precision
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}