"use client"

import { useState } from "react"
import Image from "next/image"
import { ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { type Locale, getTranslations } from "@/lib/i18n"

interface PortfolioProps {
  locale?: Locale
}

export default function Portfolio({ locale = "pt" }: PortfolioProps) {
  const [activeCategory, setActiveCategory] = useState("all")
  const t = getTranslations(locale)

  const projects = [
    {
      id: 1,
      title: t.portfolio.projects.chuva.title,
      description: t.portfolio.projects.chuva.description,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/portfolio1-jWcJZppspJaeN3hRUAcA83jwrT4mkC.webp",
      technologies: ["HTML5", "CSS3", "Framer Motion"],
      category: "web",
      liveUrl: "https://chuvagames.com",
      githubUrl: "https://github.com/CHUVAGAMES/Website-Project",
    },
    {
      id: 2,
      title: t.portfolio.projects.spocky.title,
      description: t.portfolio.projects.spocky.description,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/portfolio2-icSmdxJtQbAvUWEqSAj2eP8KvZeiGo.webp",
      technologies: ["HTML5", "CSS3", "JavaScript", "PHP", "WordPress"],
      category: "web",
      liveUrl: "https://v4-spocky-games.vercel.app/",
      githubUrl: "https://github.com/Tutankhamal/Spocky-Games-Website",
    },
    {
      id: 3,
      title: t.portfolio.projects.space.title,
      description: t.portfolio.projects.space.description,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/portfolio4-dzkMjgdanynJ9ZIS7s1fMgFoggNJcr.webp",
      technologies: ["Three.js", "React", "WebGL", "GSAP"],
      category: "2d",
      liveUrl: "https://the-universe-bg.vercel.app/",
      githubUrl: "https://github.com/Tutankhamal/the_universe_bg",
    },
    {
      id: 4,
      title: t.portfolio.projects.cyber.title,
      description: t.portfolio.projects.cyber.description,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/portfolio3-FC96GTLLRGCXslQBes7cD35k2iSJv4.webp",
      technologies: ["JavaScript", "Canvas API", "Web Audio API"],
      category: "game",
      liveUrl: "https://pac-man-dynamic-background.vercel.app/",
      githubUrl: "https://github.com/Tutankhamal/Pac-Man_Dynamic_Background",
    },
    {
      id: 5,
      title: t.portfolio.projects.egypt.title,
      description: t.portfolio.projects.egypt.description,
      image: "/portfolio5.webp",
      technologies: ["TypeScript", "React", "Canvas API", "LED Matrix Animation"],
      category: "2d",
      liveUrl: "https://pixel-animated-background.vercel.app/",
      githubUrl: "https://github.com/Tutankhamal/Pixel-Animated-Background",
    },
  ]

  const categories = [
    { id: "all", label: t.portfolio.categories.all },
    { id: "web", label: t.portfolio.categories.web },
    { id: "2d", label: t.portfolio.categories["2d"] },
    { id: "game", label: t.portfolio.categories.game },
  ]

  const filteredProjects =
    activeCategory === "all" ? projects : projects.filter((project) => project.category === activeCategory)

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
  }

  return (
    <section id="portfolio" className="py-20 bg-[#0a0a0a] relative overflow-hidden">
      <div className="cyber-grid opacity-20"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-orbitron text-4xl lg:text-5xl font-bold text-white mb-6 glow-text">
            {t.portfolio.title}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#00ffff] to-[#ff00ff] mx-auto mb-8"></div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                variant="outline"
                className={`px-6 py-2 rounded-full border-2 transition-all duration-300 ${
                  activeCategory === category.id
                    ? "bg-[#00ffff] text-[#0a0a0a] border-[#00ffff]"
                    : "border-[#00ffff]/30 text-[#cccccc] hover:border-[#00ffff] hover:text-[#00ffff] bg-transparent"
                }`}
                style={activeCategory === category.id ? { boxShadow: "0 0 20px rgba(0, 255, 255, 0.5)" } : {}}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="cyber-card rounded-2xl overflow-hidden hover:-translate-y-2 transition-all duration-500 group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Project Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Overlay - Completely hidden by default, only visible on group hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/90 via-[#0a0a0a]/50 to-transparent opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 flex items-center justify-center">
                  <div className="flex space-x-4 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                    <Button
                      size="sm"
                      className="bg-[#00ffff] text-[#0a0a0a] hover:bg-[#00ffff]/90 font-medium shadow-lg border-0"
                      onClick={(e) => {
                        e.stopPropagation()
                        window.open(project.liveUrl, "_blank")
                      }}
                    >
                      <ExternalLink size={16} className="mr-2" />
                      {t.portfolio.viewProject}
                    </Button>
                    <Button
                      size="sm"
                      className="bg-transparent border-2 border-[#00ffff] text-[#00ffff] hover:bg-[#00ffff] hover:text-[#0a0a0a] font-medium shadow-lg backdrop-blur-sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        window.open(project.githubUrl, "_blank")
                      }}
                    >
                      <Github size={16} className="mr-2" />
                      {t.portfolio.code}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#00ffff] transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-[#cccccc] mb-4 leading-relaxed">{project.description}</p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-[#00ffff]/10 text-[#00ffff] text-xs font-medium rounded-full border border-[#00ffff]/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
