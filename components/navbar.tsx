"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
        <nav className="px-5 py-4 md:px-12 h-20 md:h-24">
          <div className="flex items-center justify-between md:grid md:grid-cols-3 h-full">
            {/* LEFT: LOGO */}
            <div className="flex items-center justify-start">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="group flex items-center gap-3"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 relative">
                  <img
                    src="/dacode.png"
                    alt="Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="hidden lg:block font-sans text-xs tracking-[0.25em] text-stone-400 uppercase leading-tight">
                  Sir Fadlan <br />
                  <span className="text-primary font-bold">PORTFOLIO</span>
                </span>
              </a>
            </div>

            {/* CENTER: DESKTOP NAV ONLY */}
            <div className="hidden md:flex items-center justify-center">
              <ul className="flex items-center gap-8">
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

            {/* RIGHT: HAMBURGER (Mobile) or TIME (Desktop) */}
            <div className="flex items-center justify-end gap-4">
              {/* Time - hidden on mobile */}
              <div className="hidden md:block text-right">
                <p className="font-technical text-[9px] text-white/30 tracking-widest uppercase mb-0.5">
                  Jakarta/ID
                </p>
                <p className="font-technical text-sm text-primary font-bold tabular-nums">
                  {currentTime}
                </p>
              </div>

              {/* Hamburger Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden flex flex-col items-center justify-center gap-1.5 w-12 h-12 z-50 relative"
                aria-label="Toggle menu"
              >
                <motion.span
                  animate={
                    isMenuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }
                  }
                  className="w-7 h-[2px] bg-white rounded-full"
                />
                <motion.span
                  animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="w-7 h-[2px] bg-white rounded-full"
                />
                <motion.span
                  animate={
                    isMenuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }
                  }
                  className="w-7 h-[2px] bg-white rounded-full"
                />
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background/98 backdrop-blur-3xl md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full px-6">
              {/* Menu Items */}
              <div className="flex flex-col gap-6 w-full max-w-sm">
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
                    className={`group flex items-center gap-4 py-3 px-5 rounded-xl transition-all duration-300 ${
                      activeSection === link.href.slice(1)
                        ? "bg-primary/10 border border-primary/20"
                        : "hover:bg-white/5"
                    }`}
                  >
                    <span className="font-serif italic text-base text-primary/60 min-w-[28px]">
                      {toRoman(index)}.
                    </span>
                    <span
                      className={`text-2xl font-sans font-bold tracking-tight uppercase transition-colors ${
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

              {/* Time Display in Menu */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-12 text-center"
              >
                <p className="font-technical text-xs text-white/40 tracking-widest uppercase mb-1">
                  Jakarta/ID
                </p>
                <p className="font-technical text-2xl text-primary font-bold tabular-nums">
                  {currentTime}
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
