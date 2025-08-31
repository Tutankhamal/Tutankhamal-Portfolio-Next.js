import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import Analytics from '@/components/analytics'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://tutankhamal.vercel.app'),
  title: 'Tutankhamal Dev - Full Stack Developer',
  description: 'Desenvolvedor Web Full Stack especializado em React, Node.js, JavaScript. Criação de sites modernos e aplicações web inovadoras.',
  generator: 'Tutankhamal Dev',
  keywords: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Full Stack', 'Web Developer', 'Portfolio'],
  authors: [{ name: 'Tutankhamal Dev' }],
  creator: 'Tutankhamal Dev',
  publisher: 'Tutankhamal Dev',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    alternateLocale: 'en_US',
    url: 'https://tutankhamal.vercel.app',
    siteName: 'Tutankhamal Dev - Full Stack Developer',
    title: 'Tutankhamal Dev - Desenvolvedor Web Full Stack',
    description: 'Desenvolvedor Web Full Stack especializado em React, Node.js, JavaScript. Criação de sites modernos e aplicações web inovadoras.',
    images: [{
      url: 'https://i.imgur.com/jI9ww1C.png',
      width: 600,
      height: 240,
      alt: 'Tutankhamal Dev - Full Stack Developer Portfolio'
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tutankhamal Dev - Desenvolvedor Web Full Stack',
    description: 'Desenvolvedor Web Full Stack especializado em React, Node.js, JavaScript. Criação de sites modernos e aplicações web inovadoras.',
    images: ['https://i.imgur.com/jI9ww1C.png'],
    creator: '@tutankhamal',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  verification: {
    google: 'your-google-site-verification',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
