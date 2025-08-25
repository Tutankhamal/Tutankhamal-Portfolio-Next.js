'use client'

import Analytics from '@/components/analytics'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Analytics />
    </>
  )
}
