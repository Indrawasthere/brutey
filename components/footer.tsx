"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock, Sword } from "lucide-react";

export function Footer() {
  const [time, setTime] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const jakartaTime = new Date(
        now.toLocaleString("en-US", { timeZone: "Asia/Jakarta" }),
      );
      const hours = jakartaTime.getHours().toString().padStart(2, "0");
      const minutes = jakartaTime.getMinutes().toString().padStart(2, "0");
      const seconds = jakartaTime.getSeconds().toString().padStart(2, "0");
      setTime(`${hours}:${minutes}:${seconds}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="relative bg-background border-t-4 border-border">
      <motion.a
        href="mailto:mhmdfdln14@gmail.com"
        className="relative block overflow-hidden group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          className="absolute inset-0 bg-primary"
          initial={{ y: "100%" }}
          animate={{ y: isHovered ? "0%" : "100%" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />

        <div className="relative py-32 md:py-40 px-6 md:px-12 lg:px-16">
          <motion.div
            className="max-w-7xl mx-auto relative"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="absolute -left-4 -top-10 md:-left-8 md:-top-16 font-serif text-[120px] md:text-[200px] font-bold text-primary/5 group-hover:text-background/10 leading-none pointer-events-none transition-colors duration-500">
              VII
            </div>

            <div className="relative">
              <div className="flex items-center gap-4 mb-8">
                <motion.div
                  className="w-20 h-px bg-linear-to-r from-primary to-stone-700 group-hover:from-background group-hover:to-background/50 transition-all duration-500"
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
                  CHAPTER VII — CONTACT
                </motion.span>
              </div>

              <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-12">
                <div className="flex-1">
                  <h2
                    className={`font-serif text-5xl md:text-7xl lg:text-9xl font-bold tracking-tight leading-[0.9] transition-colors duration-300 ${
                      isHovered ? "text-background" : "text-foreground"
                    }`}
                  >
                    LET'S BUILD
                    <br />
                    <span
                      className={`italic font-light transition-colors duration-300 ${
                        isHovered ? "text-background/80" : "text-primary"
                      }`}
                    >
                      TOGETHER
                    </span>
                  </h2>

                  <div className="mt-12 flex items-center gap-5 group/text">
                    <div className="relative flex items-center justify-center"></div>

                    <p
                      className={`text-lg md:text-2xl font-light leading-none transition-colors duration-300 ${
                        isHovered
                          ? "text-background/70"
                          : "text-muted-foreground"
                      }`}
                    ></p>
                  </div>
                </div>

                <div className="relative pt-12 md:pt-0">
                  <motion.div
                    className={`w-32 h-32 md:w-40 md:h-40 border-4 flex items-center justify-center transition-all duration-500 ${
                      isHovered
                        ? "border-background rotate-90 scale-110"
                        : "border-primary/30"
                    }`}
                  >
                    <ArrowUpRight
                      className={`w-16 h-16 md:w-20 md:h-20 transition-colors duration-300 ${
                        isHovered ? "text-background" : "text-primary"
                      }`}
                    />
                  </motion.div>

                  <div
                    className={`absolute -top-4 -left-4 w-8 h-8 border-l-4 border-t-4 transition-colors duration-300 ${
                      isHovered ? "border-background/40" : "border-primary/20"
                    }`}
                  />
                  <div
                    className={`absolute -bottom-4 -right-4 w-8 h-8 border-r-4 border-b-4 transition-colors duration-300 ${
                      isHovered ? "border-background/40" : "border-primary/20"
                    }`}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.a>

      <div className="border-t-4 border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-10 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="flex items-center gap-4 px-6 py-4 border-2 border-border bg-card/30">
              <Clock className="w-5 h-5 text-primary" />
              <div className="flex-1">
                <div className="font-sans text-[10px] text-stone-400 tracking-[0.3em] mb-1">
                  JAKARTA TIME
                </div>
                <div className="font-sans text-lg font-bold tabular-nums">
                  {time}
                </div>
              </div>
              <span className="font-sans text-stone-400 text-[10px]">
                GMT+7
              </span>
            </div>

            <div className="flex items-center justify-center px-6 py-4 border-2 border-border bg-card/30 text-center">
              <div>
                <div className="font-sans text-[10px] text-muted-foreground tracking-[0.3em] mb-1">
                  COPYRIGHT
                </div>
                <div className="font-sans text-sm font-bold uppercase tracking-wider">
                  © {new Date().getFullYear()} MUHAMMAD FADLAN
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center px-6 py-4 border-2 border-border bg-card/30 text-center">
              <div>
                <div className="font-sans text-[10px] text-primary/60 tracking-[0.3em] mb-1">
                  CRAFTED WITH
                </div>
                <div className="font-sans text-sm font-bold uppercase tracking-wider text-primary">
                  FIRE & TEARS
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-2 bg-primary" />
    </footer>
  );
}
