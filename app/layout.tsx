import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  title: 'Tutankhamal Portfolio',
  description: 'Created by Tutankhamal',
  generator: 'Tutankhamal Dev',
  openGraph: {
    title: 'Tutankhamal Portfolio',
    description: 'Creating innovative digital experiences with cutting-edge technologies',
    url: 'https://tutankhamal.vercel.app',
    siteName: 'Tutankhamal Portfolio',
    images: [
      {
        url: 'https://qyucubbl29wl9pia.public.blob.vercel-storage.com/og-image.webp',
        width: 600,
        height: 240,
        alt: 'Tutankhamal Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tutankhamal Portfolio',
    description: 'Creating innovative digital experiences with cutting-edge technologies',
    images: ['https://qyucubbl29wl9pia.public.blob.vercel-storage.com/og-image.webp'],
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
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  )
}
