"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Umbrella } from "lucide-react"
import {
  DiscordIcon,
  SteamIcon,
  SoundCloudIcon,
  GitHubIcon,
  LinkedInIcon,
  InstagramIcon,
  YouTubeIcon,
} from "@/components/ui/font-awesome-icons"
import { useToast } from "@/hooks/use-toast"
import { type Locale, getTranslations } from "@/lib/i18n"

interface ContactProps {
  locale?: Locale
}

export default function Contact({ locale = "pt" }: ContactProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const t = getTranslations(locale)

  const contactMethods = [
    {
      icon: DiscordIcon,
      title: t.contact.methods.discord,
      value: "@Tutankhamal",
      href: "https://discordapp.com/users/820522746622246963",
      copyValue: "@Tutankhamal",
    },
    {
      icon: Mail,
      title: t.contact.methods.email,
      value: "contato@tutankhamal.com",
      href: "mailto:contato@tutankhamal.com",
      copyValue: "contato@tutankhamal.com",
    },
    {
      icon: MapPin,
      title: t.contact.methods.location,
      value: "Brasília, Distrito Federal, Brazil",
      href: "#",
      copyValue: null,
    },
  ]

  const socialLinks = [
    { icon: DiscordIcon, href: "https://discordapp.com/users/820522746622246963", label: "Discord" },
    { icon: GitHubIcon, href: "https://github.com/tutankhamal", label: "GitHub" },
    { icon: LinkedInIcon, href: "https://linkedin.com/in/tutankhamal", label: "LinkedIn" },
    { icon: InstagramIcon, href: "https://instagram.com/tutankhamal", label: "Instagram" },
    { icon: YouTubeIcon, href: "https://youtube.com/@tutankhamal", label: "YouTube" },
    { icon: SoundCloudIcon, href: "https://soundcloud.com/tutankhamal", label: "SoundCloud" },
    { icon: SteamIcon, href: "https://steamcommunity.com/id/Tutankhamal/", label: "Steam" },
    { icon: Umbrella, href: "https://chuvagames.com", label: "CHUVA Games" },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("A resposta da rede não foi boa")
      }

      toast({
        title: t.contact.toast.success,
        description: t.contact.toast.successDescription,
      })

      // Reset form
      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch (error) {
      console.error("Falha ao enviar o formulário:", error)
      toast({
        title: t.contact.toast.error,
        description: t.contact.toast.errorDescription,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleContactClick = (method: any) => {
    if (method.href === "#") return

    if (method.copyValue) {
      navigator.clipboard.writeText(method.copyValue)
      toast({
        title: t.contact.toast.success,
        description: t.contact.toast.successDescription,
      })
    }

    if (method.href.startsWith("mailto:") || method.href.includes("discord")) {
      // For email and discord, just copy - don't open
      return
    }

    window.open(method.href, "_blank")
  }

  return (
    <section id="contact" className="py-20 bg-[#0a0a0a] relative overflow-hidden">
      <div className="cyber-grid opacity-20"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-orbitron text-4xl lg:text-5xl font-bold text-white mb-6 glow-text">{t.contact.title}</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#00ffff] to-[#ff00ff] mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="font-orbitron text-2xl font-bold text-white mb-6">{t.contact.subtitle}</h3>
              <p className="text-[#cccccc] leading-relaxed mb-8">{t.contact.description}</p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-6">
              {contactMethods.map((method, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-4 cyber-card rounded-xl hover:shadow-[0_0_20px_rgba(0,255,255,0.5)] transition-all duration-300 cursor-pointer"
                  onClick={() => handleContactClick(method)}
                >
                  <div className="w-12 h-12 bg-[#00ffff]/10 border-2 border-[#00ffff] rounded-full flex items-center justify-center">
                    <method.icon size={20} className="text-[#00ffff]" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">{method.title}</h4>
                    <span className="text-[#cccccc] hover:text-[#00ffff] transition-colors duration-300">
                      {method.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div id="social-links">
              <h4 className="font-orbitron text-xl font-semibold text-white mb-6 text-center">
                {t.contact.socialTitle}
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center p-4 cyber-card rounded-xl hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(0,255,255,0.5)] hover:bg-[#00ffff]/5 transition-all duration-300 group"
                  >
                    <social.icon
                      size={24}
                      className="text-[#00ffff] mb-2 group-hover:scale-110 transition-transform duration-300"
                    />
                    <span className="text-[#cccccc] text-xs font-medium group-hover:text-[#00ffff] transition-colors duration-300 text-center">
                      {social.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="cyber-card rounded-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-[#cccccc] text-sm font-medium mb-2 tracking-wide">
                    {t.contact.form.name}
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="bg-black/30 border-2 border-[#00ffff]/30 text-white focus:border-[#00ffff] transition-all duration-300"
                    style={{ boxShadow: "0 0 10px rgba(0, 255, 255, 0.1)" }}
                    placeholder={t.contact.form.namePlaceholder}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-[#cccccc] text-sm font-medium mb-2 tracking-wide">
                    {t.contact.form.email}
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-black/30 border-2 border-[#00ffff]/30 text-white focus:border-[#00ffff] transition-all duration-300"
                    style={{ boxShadow: "0 0 10px rgba(0, 255, 255, 0.1)" }}
                    placeholder={t.contact.form.emailPlaceholder}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-[#cccccc] text-sm font-medium mb-2 tracking-wide">
                  {t.contact.form.subject}
                </label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="bg-black/30 border-2 border-[#00ffff]/30 text-white focus:border-[#00ffff] transition-all duration-300"
                  style={{ boxShadow: "0 0 10px rgba(0, 255, 255, 0.1)" }}
                  placeholder={t.contact.form.subjectPlaceholder}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-[#cccccc] text-sm font-medium mb-2 tracking-wide">
                  {t.contact.form.message}
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="bg-black/30 border-2 border-[#00ffff]/30 text-white focus:border-[#00ffff] transition-all duration-300 resize-none"
                  style={{ boxShadow: "0 0 10px rgba(0, 255, 255, 0.1)" }}
                  placeholder={t.contact.form.messagePlaceholder}
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-transparent border-2 border-[#00ffff] text-[#00ffff] hover:bg-[#00ffff] hover:text-[#0a0a0a] transition-all duration-300 hover:-translate-y-1 font-semibold tracking-wide disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                style={{ boxShadow: "0 0 10px rgba(0, 255, 255, 0.3)" }}
              >
                {isSubmitting ? t.contact.form.sending : t.contact.form.send}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
