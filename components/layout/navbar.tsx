"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Globe } from "lucide-react"
import { type Locale, getTranslations } from "@/lib/i18n"

interface NavbarProps {
  locale?: Locale
}

export default function Navbar({ locale = "pt" }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const t = getTranslations(locale)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "#home", label: t.nav.home },
    { href: "#skills", label: t.nav.skills },
    { href: "#portfolio", label: t.nav.portfolio },
    { href: "#contact", label: t.nav.contact },
  ]

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMobileMenuOpen(false)
  }

  const toggleLanguage = () => {
    if (!locale) return

    const newLocale = locale === "pt" ? "en" : "pt"
    const currentPath = window.location.pathname

    // Remove current locale from path
    const pathWithoutLocale = currentPath.replace(`/${locale}`, "") || "/"

    // Navigate to new locale
    window.location.href = `/${newLocale}${pathWithoutLocale === "/" ? "" : pathWithoutLocale}`
  }

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0a0a0a]/95 backdrop-blur-lg border-b border-[#00ffff]/20"
          : "bg-[#0a0a0a]/95 backdrop-blur-lg border-b border-[#00ffff]/20"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center space-x-1 z-50">
            <span className="font-orbitron text-xl font-bold text-white">TUTANKHAMAL</span>
            <span className="font-orbitron text-xl font-bold text-gradient">DEV</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="relative text-[#cccccc] hover:text-[#00ffff] transition-colors duration-300 font-medium tracking-wide group cursor-pointer bg-transparent border-none"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#00ffff] to-[#ff00ff] transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}

            {/* Language Toggle */}
            {locale && (
              <button
                onClick={toggleLanguage}
                className="flex items-center space-x-1 text-[#cccccc] hover:text-[#00ffff] transition-colors duration-300 font-medium tracking-wide bg-transparent border-none cursor-pointer"
              >
                <Globe size={16} />
                <span>{locale.toUpperCase()}</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden z-50 p-2 text-white hover:text-[#00ffff] transition-colors bg-transparent border-none cursor-pointer"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden fixed inset-0 top-16 bg-[#0a0a0a]/98 backdrop-blur-lg transition-all duration-300 ${
            isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-2xl font-medium text-[#cccccc] hover:text-[#00ffff] transition-colors duration-300 cursor-pointer bg-transparent border-none"
              >
                {link.label}
              </button>
            ))}

            {/* Mobile Language Toggle */}
            {locale && (
              <button
                onClick={toggleLanguage}
                className="flex items-center space-x-2 text-xl font-medium text-[#cccccc] hover:text-[#00ffff] transition-colors duration-300 bg-transparent border-none cursor-pointer"
              >
                <Globe size={20} />
                <span>{locale.toUpperCase()}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
