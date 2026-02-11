"use client";

import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  LazyMotion,
  domAnimation,
} from "framer-motion";
import Image from "next/image";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Works", href: "#works" },
  { label: "Resume", href: "#resume" },
  { label: "Contact", href: "#contact" },
];

const useJakartaTime = () => {
  const [time, setTime] = useState("");
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Jakarta",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setTime(new Intl.DateTimeFormat("en-GB", options).format(now));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);
  return time;
};

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const currentTime = useJakartaTime();

  const toRoman = (num: number) => {
    const map = ["I", "II", "III", "IV", "V"];
    return map[num] || num + 1;
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = navLinks.map((link) => link.href.slice(1));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setIsMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <LazyMotion features={domAnimation}>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-white/5"
            : ""
        }`}
      >
        <nav className="px-4 sm:px-5 py-4 md:px-12 h-20 md:h-24 max-w-full">
          <div className="flex items-center justify-between md:grid md:grid-cols-3 h-full">
            <div className="flex items-center justify-start">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="group flex items-center gap-2 sm:gap-3"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 relative shrink-0">
                  <Image
                    src="/dacodefix.png"
                    alt="Logo"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                    quality={75}
                    className="object-contain"
                  />
                </div>
                <span className="hidden lg:block font-sans text-xs tracking-[0.25em] text-stone-400 uppercase leading-tight">
                  Sir Fadlan <br />
                  <span className="text-primary font-bold">PORTFOLIO</span>
                </span>
              </a>
            </div>

            <div className="hidden md:flex items-center justify-center">
              <ul className="flex items-center gap-6 lg:gap-8">
                {navLinks.map((link, index) => (
                  <li key={link.label}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className={`group flex items-center font-sans text-xs tracking-[0.15em] transition-all duration-300 ${
                        activeSection === link.href.slice(1)
                          ? "text-primary"
                          : "text-white/50 hover:text-white"
                      }`}
                    >
                      <span className="font-serif italic text-[10px] mr-1.5 opacity-50">
                        {toRoman(index)}.
                      </span>
                      {link.label.toUpperCase()}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-end gap-2 sm:gap-4">
              <div className="hidden md:block text-right">
                <span className="hidden lg:block font-sans text-xs tracking-[0.25em] text-stone-400 uppercase leading-tight">
                  Jakarta/ID <br />
                  <span className="text-primary font-bold tabular-nums">
                    {currentTime}
                  </span>
                </span>
              </div>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden flex flex-col items-center justify-center gap-1.5 w-10 h-10 sm:w-12 sm:h-12 z-50 relative flex-shrink-0"
                aria-label="Toggle menu"
              >
                <motion.span
                  animate={
                    isMenuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }
                  }
                  className="w-6 sm:w-7 h-0.5 bg-white rounded-full"
                />
                <motion.span
                  animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="w-6 sm:w-7 h-0.5 bg-white rounded-full"
                />
                <motion.span
                  animate={
                    isMenuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }
                  }
                  className="w-6 sm:w-7 h-0.5 bg-white rounded-full"
                />
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background/98 backdrop-blur-3xl md:hidden overflow-y-auto"
          >
            <div className="flex flex-col items-center justify-center min-h-screen px-6 py-24">
              <div className="flex flex-col gap-4 sm:gap-6 w-full max-w-sm">
                {navLinks.map((link, index) => (
                  <motion.button
                    key={link.label}
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                      delay: index * 0.08,
                      type: "spring",
                      stiffness: 100,
                    }}
                    onClick={() => scrollToSection(link.href)}
                    className={`group flex items-center gap-3 sm:gap-4 py-3 px-4 sm:px-5 rounded-xl transition-all duration-300 ${
                      activeSection === link.href.slice(1)
                        ? "bg-primary/10 border border-primary/20"
                        : "hover:bg-white/5"
                    }`}
                  >
                    <span className="font-serif italic text-sm sm:text-base text-primary/60 min-w-6 sm:min-w-7">
                      {toRoman(index)}.
                    </span>
                    <span
                      className={`text-xl sm:text-2xl font-sans font-bold tracking-tight uppercase transition-colors ${
                        activeSection === link.href.slice(1)
                          ? "text-primary"
                          : "text-white group-hover:text-primary"
                      }`}
                    >
                      {link.label}
                    </span>
                  </motion.button>
                ))}
              </div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-12 text-center"
              >
                <p className="font-sans text-xs text-white/40 tracking-widest uppercase mb-1">
                  Jakarta/ID
                </p>
                <p className="font-sans text-xl sm:text-2xl text-primary font-bold tabular-nums">
                  {currentTime}
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
}
