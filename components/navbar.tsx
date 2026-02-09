"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Works", href: "#works" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Fungsi buat ngerubah angka ke Romawi
  const toRoman = (num: number) => {
    const map = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];
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
            ? "bg-background/90 backdrop-blur-md border-b border-primary/20"
            : ""
        }`}
      >
        <nav className="flex items-center justify-center px-6 py-4 md:px-12 md:py-4 relative">
          {/* Logo - Left */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="absolute left-6 md:left-12 group flex items-center gap-5"
          >
            <div
              className="
                w-16 h-16 md:w-20 md:h-20
                flex items-center justify-center
                relative
                transition-all duration-500 ease-out
                group-hover:scale-110
              "
            >
              {/* Brutalist box effect */}
              <div className="absolute inset-0 border border-primary/20 group-hover:border-primary transition-colors duration-300" />
              <div className="absolute inset-0 bg-primary/5 scale-0 group-hover:scale-100 transition-transform duration-500" />

              <img
                src="/dacode.png"
                alt="Logo"
                className="relative w-[80%] h-[80%] object-contain"
              />
            </div>

            <span
              className="
                font-sans font-semibold tracking-tighter text-l
                text-stone-500
                transition-all duration-300
                group-hover:text-primary
                group-hover:translate-x-1
                hidden sm:block
              "
            >
              FORTRESS
            </span>
          </a>

          {/* Desktop Navigation - Centered */}
          <ul className="hidden md:flex items-center gap-4">
            {navLinks.map((link, index) => (
              <li key={link.label}>
                <button
                  onClick={() => scrollToSection(link.href)}
                  className={`relative px-4 py-2 font-sans font-medium tracking-widest transition-all duration-300 ${
                    activeSection === link.href.slice(1)
                      ? "text-primary"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {/* Nomor pake Font Serif & Romawi */}
                  <span className="font-serif italic text-sm mr-2 opacity-50">
                    {toRoman(index)}.
                  </span>

                  {link.label.toUpperCase()}

                  {/* Brutalist underline */}
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-[2px] bg-primary transition-all duration-500 ${
                      activeSection === link.href.slice(1)
                        ? "opacity-100 scale-x-100"
                        : "opacity-0 scale-x-0"
                    }`}
                  />
                </button>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button - Right */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden absolute right-6 relative w-12 h-12 flex items-center justify-center border border-primary/30 active:bg-primary/10 transition-colors"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={isMenuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: -3 }}
              className="absolute w-6 h-[2px] bg-primary origin-center"
            />
            <motion.span
              animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="absolute w-6 h-[2px] bg-primary"
            />
            <motion.span
              animate={
                isMenuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 3 }
              }
              className="absolute w-6 h-[2px] bg-primary origin-center"
            />
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-background/98 md:hidden"
          >
            <nav className="flex flex-col items-center justify-center h-full gap-8 px-6">
              {navLinks.map((link, index) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => scrollToSection(link.href)}
                  className={`text-5xl font-sans font-black tracking-tighter transition-all duration-300 ${
                    activeSection === link.href.slice(1)
                      ? "text-primary"
                      : "text-foreground hover:text-primary/70"
                  }`}
                >
                  <span className="font-serif italic text-lg block mb-2 text-primary/40">
                    {toRoman(index)}.
                  </span>
                  {link.label}
                </motion.button>
              ))}

              {/* Minimalist corner footer for mobile menu */}
              <div className="absolute bottom-12 font-serif italic text-primary/20"></div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
