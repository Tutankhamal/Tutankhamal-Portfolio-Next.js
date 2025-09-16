import Hero from "@/components/sections/hero"
import Skills from "@/components/sections/skills"
import Portfolio from "@/components/sections/portfolio"
import Stats from "@/components/sections/stats"
import Technologies from "@/components/sections/technologies"
import Contact from "@/components/sections/contact"
import Footer from "@/components/sections/footer"
import type { Locale } from "@/lib/i18n"

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params

  return (
    <main>
      <Hero locale={locale} />
      <Skills locale={locale} />
      <Stats locale={locale} />
      <Portfolio locale={locale} />
      <Contact locale={locale} />
      <Technologies locale={locale} />
      <Footer locale={locale} />
    </main>
  )
}
