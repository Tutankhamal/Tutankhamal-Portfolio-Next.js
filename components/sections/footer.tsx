"use client"

import React from "react"

import Link from "next/link"
import { Mail, Umbrella } from "lucide-react"
import {
  DiscordIcon,
  SteamIcon,
  SoundCloudIcon,
  GitHubIcon,
  LinkedInIcon,
  InstagramIcon,
  YouTubeIcon,
} from "@/components/ui/font-awesome-icons"
import { type Locale, getTranslations } from "@/lib/i18n"

interface FooterProps {
  locale?: Locale
}

export default function Footer({ locale = "pt" }: FooterProps) {
  const t = getTranslations(locale)

  // Dividindo em 2 linhas de 4 ícones cada (mais 1 na segunda linha)
  const socialLinksRow1 = [
    { icon: DiscordIcon, href: "https://discordapp.com/users/820522746622246963", label: "Discord" },
    { icon: GitHubIcon, href: "https://github.com/tutankhamal", label: "GitHub" },
    { icon: LinkedInIcon, href: "https://linkedin.com/in/tutankhamal", label: "LinkedIn" },
    { icon: InstagramIcon, href: "https://instagram.com/tutankhamal", label: "Instagram" },
  ]

  const socialLinksRow2 = [
    { icon: YouTubeIcon, href: "https://youtube.com/@tutankhamal", label: "YouTube" },
    { icon: SoundCloudIcon, href: "https://soundcloud.com/tutankhamal", label: "SoundCloud" },
    { icon: SteamIcon, href: "https://steamcommunity.com/id/Tutankhamal/", label: "Steam" },
    { icon: Mail, href: "mailto:contato@tutankhamal.com", label: "Email" },
    { icon: Umbrella, href: "https://chuvagames.com", label: "CHUVA Games" },
  ]

  const footerLinks = [
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
  }

  return (
    <footer className="bg-[#0a0a0a] border-t border-[#00ffff]/20 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start mb-8">
          {/* Logo */}
          <div className="flex items-center justify-center md:justify-start space-x-1">
            <span className="font-orbitron text-xl font-bold text-white">TUTANKHAMAL</span>
            <span className="font-orbitron text-xl font-bold text-gradient">DEV</span>
          </div>

          {/* Navigation Links */}
          <div className="flex justify-center space-x-6 flex-wrap">
            {footerLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-[#cccccc] hover:text-[#00ffff] transition-colors duration-300 text-sm font-medium bg-transparent border-none cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Social Links - 2 Rows with Square Icons */}
          <div className="flex flex-col items-center md:items-end space-y-3">
            {/* First Row - 4 icons */}
            <div className="flex justify-center space-x-2">
              {socialLinksRow1.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-[#00ffff]/10 border border-[#00ffff]/30 rounded-md text-[#00ffff] hover:bg-[#00ffff] hover:text-[#0a0a0a] transition-all duration-300 hover:-translate-y-1 flex items-center justify-center"
                  style={{ boxShadow: "0 0 10px rgba(0, 255, 255, 0.3)" }}
                  title={social.label}
                >
                  {React.createElement(social.icon, { size: 16 })}
                  <span className="sr-only">{social.label}</span>
                </Link>
              ))}
            </div>

            {/* Second Row - 5 icons */}
            <div className="flex justify-center space-x-2">
              {socialLinksRow2.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-[#00ffff]/10 border border-[#00ffff]/30 rounded-md text-[#00ffff] hover:bg-[#00ffff] hover:text-[#0a0a0a] transition-all duration-300 hover:-translate-y-1 flex items-center justify-center"
                  style={{ boxShadow: "0 0 10px rgba(0, 255, 255, 0.3)" }}
                  title={social.label}
                >
                  {React.createElement(social.icon, { size: 16 })}
                  <span className="sr-only">{social.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center pt-8 border-t border-white/10">
          <p className="text-[#888888] text-sm">{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
