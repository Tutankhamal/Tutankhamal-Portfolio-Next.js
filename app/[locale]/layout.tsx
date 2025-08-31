import type React from "react"
import type { Metadata } from "next"
import { Orbitron, Rajdhani } from "next/font/google"
import "../globals.css"
import Navbar from "@/components/layout/navbar"
import LoadingScreen from "@/components/ui/loading-screen"
import ParticleSystem from "@/components/ui/particle-system"
import { Toaster } from "@/components/ui/toaster"
import { locales, type Locale } from "@/lib/i18n"

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
})

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-rajdhani",
  display: "swap",
})

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params

  const titles = {
    pt: "Tutankhamal Dev - Desenvolvedor Full Stack",
    en: "Tutankhamal Dev - Full Stack Developer",
  }

  const descriptions = {
    pt: "Desenvolvedor Web Full Stack especializado em tecnologias modernas.",
    en: "Full Stack Web Developer specialized in modern technologies.",
  }

  return {
    title: titles[locale],
    description: descriptions[locale],
    icons: {
      icon: '/favicon.ico',
    },
    other: {
      'font-awesome': 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params

  return (
    <div className={`${orbitron.variable} ${rajdhani.variable} bg-[#0a0a0a] text-white font-rajdhani overflow-x-hidden min-h-screen`}>
      <LoadingScreen />
      <ParticleSystem />
      <Navbar locale={locale} />
      {children}
      <Toaster />
    </div>
  )
}
