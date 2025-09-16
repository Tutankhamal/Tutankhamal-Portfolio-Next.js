// Configuração global da biblioteca Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  // Ícones sólidos
  faDatabase,
  faCode,
  faServer,
  faMobile,
  faDesktop,
  faCloud,
  faCogs,
  faTools,
  faRocket,
  faLaptopCode
} from '@fortawesome/free-solid-svg-icons'

import {
  // Ícones de marcas/brands
  faHtml5,
  faCss3Alt,
  faJs,
  faReact,
  faNodeJs,
  faGitAlt,
  faPython,
  faPhp,
  faDocker,
  faLinux,
  faGithub,
  faLinkedin,
  faDiscord,
  faInstagram,
  faYoutube,
  faSteam,
  faSoundcloud,
  faTwitter,
  faFacebook
} from '@fortawesome/free-brands-svg-icons'

// Adicionar todos os ícones à biblioteca global
library.add(
  // Ícones sólidos
  faHtml5,
  faCss3Alt,
  faJs,
  faReact,
  faNodeJs,
  faGitAlt,
  faPython,
  faPhp,
  faDocker,
  faLinux,
  faDatabase,
  faCode,
  faServer,
  faMobile,
  faDesktop,
  faCloud,
  faCogs,
  faTools,
  faRocket,
  faLaptopCode,
  // Ícones de marcas
  faGithub,
  faLinkedin,
  faDiscord,
  faInstagram,
  faYoutube,
  faSteam,
  faSoundcloud,
  faTwitter,
  faFacebook
)

// Exportar para uso em outros componentes
export { FontAwesomeIcon } from '@fortawesome/react-fontawesome'