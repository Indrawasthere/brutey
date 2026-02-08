"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Works", href: "#works" },
  { label: "Contact", href: "#contact" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      const sections = navLinks.map((link) => link.href.slice(1))
      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150) {
            setActiveSection(section)
            break
          }
        }
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    setIsMenuOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "bg-background/90 backdrop-blur-md border-b border-primary/20" : ""
        }`}
      >
        <nav className="flex items-center justify-center px-6 py-4 md:px-12 md:py-4 relative">
          {/* Logo - Left */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: "smooth" })
            }}
            className="absolute left-6 md:left-12 group flex items-center gap-3"
          >
            <div className="w-8 h-8 border border-primary/40 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-primary/10 scale-0 group-hover:scale-100 transition-transform duration-300" />
              <img src="/preview.webp" alt="Logo" className="relative w-full h-full object-cover" />
            </div>
            <span className="label-caps text-primary/70 group-hover:text-primary transition-colors hidden sm:block">
              FORTRESS
            </span>
          </a>

          {/* Desktop Navigation - Centered */}
          <ul className="hidden md:flex items-center gap-2">
            {navLinks.map((link, index) => (
              <li key={link.label}>
                <button
                  onClick={() => scrollToSection(link.href)}
                  className={`relative px-4 py-2 font-mono-label tracking-wider transition-all duration-300 ${
                    activeSection === link.href.slice(1)
                      ? "text-primary"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  <span className="text-primary/40 mr-1">0{index + 1}.</span>
                  {link.label.toUpperCase()}
                  {/* Brutalist underline */}
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-px bg-primary transition-all duration-300 ${
                      activeSection === link.href.slice(1) ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </button>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button - Right */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden absolute right-6 relative w-10 h-10 flex items-center justify-center border border-primary/30"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={isMenuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: -3 }}
              className="absolute w-5 h-px bg-primary origin-center"
            />
            <motion.span
              animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="absolute w-5 h-px bg-primary"
            />
            <motion.span
              animate={isMenuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 3 }}
              className="absolute w-5 h-px bg-primary origin-center"
            />
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-background/98 md:hidden"
          >
            <nav className="flex flex-col items-center justify-center h-full gap-6 px-6">
              {navLinks.map((link, index) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  onClick={() => scrollToSection(link.href)}
                  className={`text-4xl font-sans font-bold tracking-wider transition-all duration-300 ${
                    activeSection === link.href.slice(1) ? "text-primary" : "text-foreground hover:text-primary/70"
                  }`}
                >
                  <span className="font-mono-label text-sm mr-3 text-primary/40">0{index + 1}.</span>
                  {link.label}
                  <div className={`h-1 bg-primary/30 mt-2 transition-all duration-300 ${activeSection === link.href.slice(1) ? "w-full" : "w-0"}`} />
                </motion.button>
              ))}

              {/* Corner decorations */}
              <div className="absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 border-primary/20" />
              <div className="absolute bottom-8 right-8 w-12 h-12 border-r-2 border-b-2 border-primary/20" />
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

