import Hero from "@/components/sections/hero"
import Skills from "@/components/sections/skills"
import Technologies from "@/components/sections/technologies"
import Portfolio from "@/components/sections/portfolio"
import Stats from "@/components/sections/stats"
import Contact from "@/components/sections/contact"
import Footer from "@/components/sections/footer"

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Skills />
      <Stats />
      <Portfolio />
      <Contact />
      <Technologies />
      <Footer />
    </main>
  )
}
