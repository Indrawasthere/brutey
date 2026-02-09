"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Works", href: "#works" },
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
    const map = ["I", "II", "III", "IV"];
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
    window.addEventListener("scroll", handleScroll);
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
    <>
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
        <nav className="grid grid-cols-3 items-center px-6 py-4 md:px-12 h-20 md:h-24">
          {/* LEFT: LOGO */}
          <div className="flex items-center justify-start">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="group flex items-center gap-5"
            >
              {/* Box Logo */}
              <div className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center relative transition-transform duration-500 group-hover:scale-105">
                {/* Subtle glow*/}
                <div className="absolute inset-0 bg-primary/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <img
                  src="/dacode.png"
                  alt="Logo"
                  className="relative w-full h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                />
              </div>

              {/* Text Fortress*/}
              <span className="hidden lg:block font-sans text-[12px] leading-tight tracking-[0.4em] text-stone-400 uppercase group-hover:text-white transition-colors">
                Sir Fadlan <br />
                <span className="text-primary font-bold opacity-80 group-hover:opacity-100">
                  PORTFOLIO
                </span>
              </span>
            </a>
          </div>

          {/* CENTER:*/}
          <ul className="hidden md:flex items-center justify-center gap-8">
            {navLinks.map((link, index) => (
              <li key={link.label}>
                <button
                  onClick={() => scrollToSection(link.href)}
                  className={`group relative flex items-center font-sans text-[12px] tracking-[0.2em] transition-all duration-300 ${
                    activeSection === link.href.slice(1)
                      ? "text-primary"
                      : "text-white/40 hover:text-white"
                  }`}
                >
                  <span className="font-serif italic text-[12px] mr-1.5 opacity-30 group-hover:opacity-100">
                    {toRoman(index)}.
                  </span>
                  {link.label.toUpperCase()}
                  {/* Underline*/}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-primary transition-all duration-500 ${
                      activeSection === link.href.slice(1) ? "w-full" : "w-0"
                    }`}
                  />
                </button>
              </li>
            ))}
          </ul>

          {/* RIGHT: REALTIME CLOCK & MOBILE TRIGGER */}
          <div className="flex items-center justify-end gap-6">
            {/* Clock Container */}
            <div className="hidden md:flex flex-col items-end justify-center h-14 md:h-16 min-w-30">
              <span className="font-technical text-[10px] text-white/30 tracking-[0.3em] uppercase mb-1">
                Local Time
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-technical text-sm md:text-base text-primary tabular-nums font-bold tracking-wider">
                  {currentTime}
                </span>
                <span className="text-[10px] text-white/40 font-bold">
                  GMT+7
                </span>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden w-14 h-14 flex flex-col items-center justify-center gap-1.5 transition-colors active:bg-white/5"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={
                  isMenuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }
                }
                className="w-6 h-[1.5px] bg-white"
              />
              <motion.span
                animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-6 h-[1.5px] bg-white"
              />
              <motion.span
                animate={
                  isMenuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }
                }
                className="w-6 h-[1.5px] bg-white"
              />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-background flex flex-col p-12"
          >
            <div className="mt-20 flex flex-col gap-8">
              {navLinks.map((link, index) => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  className="flex items-baseline gap-4 text-left"
                >
                  <span className="font-serif italic text-xl text-primary/40">
                    {toRoman(index)}
                  </span>
                  <span className="text-5xl font-sans font-bold tracking-tighter hover:italic hover:text-primary transition-all">
                    {link.label.toUpperCase()}
                  </span>
                </button>
              ))}
            </div>
            {/* Mobile Clock */}
            <div className="mt-auto border-t border-white/5 pt-8">
              <span className="block text-[10px] tracking-widest text-white/20 uppercase mb-2">
                Current Coordinates
              </span>
              <span className="text-2xl font-technical text-white">
                {currentTime} JKT
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
