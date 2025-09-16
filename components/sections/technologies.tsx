"use client"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faReact, 
  faJs, 
  faHtml5, 
  faCss3Alt, 
  faNodeJs, 
  faGitAlt, 
  faDocker, 
  faPython, 
  faPhp,
  faLinux,
  faWindows,
  faDiscord
} from '@fortawesome/free-brands-svg-icons'
import type { Locale } from '@/lib/i18n'

// Array base de tecnologias (12 itens únicos)
const baseTechnologies = [
  { name: 'React', icon: faReact },
  { name: 'JavaScript', icon: faJs },
  { name: 'HTML5', icon: faHtml5 },
  { name: 'CSS3', icon: faCss3Alt },
  { name: 'Node.js', icon: faNodeJs },
  { name: 'Git', icon: faGitAlt },
  { name: 'Docker', icon: faDocker },
  { name: 'Python', icon: faPython },
  { name: 'PHP', icon: faPhp },
  { name: 'Linux', icon: faLinux },
  { name: 'Windows', icon: faWindows },
  { name: 'Discord', icon: faDiscord }
]

/**
 * Componente de slider horizontal de tecnologias com loop seamless
 * Implementa movimento linear contínuo sem quebras ou saltos usando CSS Grid
 */
export default function Technologies({ locale }: { locale?: Locale }) {
  // Criar array duplicado para loop seamless perfeito
  const duplicatedTechs = [...baseTechnologies, ...baseTechnologies]
  
  // Largura fixa de cada item (120px + 32px gap = 152px total por item)
  const itemWidth = 152
  const totalItems = baseTechnologies.length
  const containerWidth = itemWidth * totalItems

  return (
    <section className="py-8 relative">
      {/* Container com overflow hidden e fade por opacidade */}
      <div className="relative overflow-hidden">
        {/* Gradientes de fade com opacidade nas extremidades */}
        <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent z-10 pointer-events-none" />
        
        {/* Track do slider com animação seamless */}
        <div 
          className="flex gap-8 animate-seamless-slide hover:pause will-change-transform"
          style={{
            width: `${containerWidth * 2}px`,
            transform: 'translate3d(0, 0, 0)'
          }}
        >
          {duplicatedTechs.map((tech, index) => (
            <div
              key={`${tech.name}-${index}`}
              className="flex-shrink-0 flex items-center justify-center p-4 group"
              style={{ width: '120px', minWidth: '120px' }}
            >
              {/* Ícone da tecnologia */}
              <FontAwesomeIcon 
                icon={tech.icon} 
                className="text-5xl text-white/75 group-hover:scale-110 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Estilos CSS para animação seamless */}
      <style jsx>{`
        @keyframes seamless-slide {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-${containerWidth}px, 0, 0);
          }
        }
        
        .animate-seamless-slide {
          animation: seamless-slide 20s linear infinite;
          backface-visibility: hidden;
        }
        
        .hover\:pause:hover {
          animation-play-state: paused;
        }
        
        .will-change-transform {
          will-change: transform;
        }
      `}</style>
    </section>
  )
}