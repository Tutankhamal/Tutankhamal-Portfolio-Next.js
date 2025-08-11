import Hero from "@/components/sections/hero"
import Skills from "@/components/sections/skills"
import Portfolio from "@/components/sections/portfolio"
import Stats from "@/components/sections/stats"
import Contact from "@/components/sections/contact"

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Skills />
      <Stats />
      <Portfolio />
      <Contact />
    </main>
  )
}
