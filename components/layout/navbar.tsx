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
  const [currentPath, setCurrentPath] = useState('')
  const t = getTranslations(locale)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMobileMenuOpen])

  useEffect(() => {
    const updateCurrentPath = () => {
      setCurrentPath(window.location.pathname + window.location.hash)
    }

    updateCurrentPath()
    window.addEventListener('popstate', updateCurrentPath)
    window.addEventListener('hashchange', updateCurrentPath)

    return () => {
      window.removeEventListener('popstate', updateCurrentPath)
      window.removeEventListener('hashchange', updateCurrentPath)
    }
  }, [])

  const navLinks = [
    { href: "#home", label: t.nav.home, isExternal: false },
    { href: "#skills", label: t.nav.skills, isExternal: false },
    { href: "#portfolio", label: t.nav.portfolio, isExternal: false },
    { href: "#contact", label: t.nav.contact, isExternal: false },
    { href: `/${locale}/youtube`, label: t.nav.youtube, isExternal: true },
  ]

  const getCurrentPage = () => {
    if (typeof window === 'undefined') return '#home'
    
    if (currentPath.includes('/youtube')) {
      return '/youtube'
    }
    
    const hash = currentPath.split('#')[1]
    if (hash) {
      return `#${hash}`
    }
    
    return '#home'
  }

  const isActiveLink = (href: string) => {
    if (typeof window === 'undefined') return href === '#home'
    const currentPage = getCurrentPage()
    
    // Special handling for YouTube link
    if (href.includes('/youtube') && currentPage === '/youtube') {
      return true
    }
    
    return currentPage === href
  }

  const handleNavClick = (href: string, isExternal: boolean) => {
    if (isExternal) {
      window.location.href = href
    } else {
      // Check if we're on the home page
      const currentPath = window.location.pathname
      const isOnHomePage = currentPath === `/${locale}` || currentPath === `/${locale}/`
      
      if (isOnHomePage) {
        // If on home page, scroll to section
        const element = document.querySelector(href)
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
          // Manually update the URL hash and current path state
          window.history.replaceState(null, '', href)
          setCurrentPath(window.location.pathname + href)
        }
      } else {
        // If on other pages, navigate to home page with hash
        window.location.href = `/${locale}${href}`
      }
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
    <>
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
            <Link href={`/${locale}`} className="flex items-center space-x-1 z-50 relative">
              <span className="font-orbitron text-xl font-bold text-white glitch-matrix glitch-scanlines" data-text="TUTANKHAMAL">TUTANKHAMAL</span>
              <span className="font-orbitron text-xl font-bold text-gradient glitch-matrix glitch-scanlines" data-text="DEV">DEV</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => {
                const isActive = isActiveLink(link.href)
                return (
                  <button
                    key={link.href}
                    onClick={() => handleNavClick(link.href, link.isExternal)}
                    className={`relative transition-colors duration-300 font-medium tracking-wide group cursor-pointer bg-transparent border-none ${
                      isActive 
                        ? 'text-[#00ffff]' 
                        : 'text-[#cccccc] hover:text-[#00ffff]'
                    }`}
                  >
                    {link.label}
                    <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#00ffff] to-[#8b5cf6] transition-all duration-300 ${
                      isActive 
                        ? 'w-full' 
                        : 'w-0 group-hover:w-full'
                    }`}></span>
                  </button>
                )
              })}

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
              className="md:hidden z-[60] p-2 text-white hover:text-[#00ffff] transition-colors bg-transparent border-none cursor-pointer relative"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[55] bg-[#0a0a0a]/98 backdrop-blur-lg">
          <div className="flex flex-col items-center justify-center min-h-screen px-4 pt-16">
            <div className="flex flex-col items-center space-y-8 w-full max-w-sm">
              {navLinks.map((link) => {
                const isActive = isActiveLink(link.href)
                return (
                  <button
                    key={link.href}
                    onClick={() => handleNavClick(link.href, link.isExternal)}
                    className={`w-full text-center text-2xl font-medium transition-colors duration-300 cursor-pointer bg-transparent border-none py-3 ${
                      isActive 
                        ? 'text-[#00ffff]' 
                        : 'text-[#cccccc] hover:text-[#00ffff]'
                    }`}
                  >
                    {link.label}
                  </button>
                )
              })}

              {/* Mobile Language Toggle */}
              {locale && (
                <button
                  onClick={toggleLanguage}
                  className="flex items-center justify-center space-x-2 text-xl font-medium text-[#cccccc] hover:text-[#00ffff] transition-colors duration-300 bg-transparent border-none cursor-pointer py-3"
                >
                  <Globe size={20} />
                  <span>{locale.toUpperCase()}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
