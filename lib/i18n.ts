export const defaultLocale = "pt"
export const locales = ["pt", "en"] as const
export type Locale = (typeof locales)[number]

export const translations = {
  pt: {
    // Navigation
    nav: {
      home: "Home",
      skills: "Skills",
      portfolio: "Portfolio",
      contact: "Contato",
    },
    // Hero Section
    hero: {
      title: "TUTANKHAMAL",
      subtitle: "DEV",
      role: "Desenvolvedor Web Full Stack",
      description: "Criando experiências digitais inovadoras com tecnologias de ponta",
      viewProjects: "VER PROJETOS",
      contact: "CONTATO",
      scroll: "SCROLL",
    },
    // Skills Section
    skills: {
      title: "HABILIDADES",
      items: {
        frontend: {
          title: "Frontend Development",
          description: "React, Next.js, TypeScript, Tailwind CSS",
        },
        backend: {
          title: "Backend Development",
          description: "Node.js, Python, APIs RESTful",
        },
        database: {
          title: "Database",
          description: "PostgreSQL, MongoDB, Redis",
        },
        web: {
          title: "Web Technologies",
          description: "HTML5, CSS3, JavaScript ES6+",
        },
        mobile: {
          title: "Mobile Development",
          description: "React Native, Flutter",
        },
        design: {
          title: "UI/UX Design",
          description: "Figma, Adobe XD, Design Systems",
        },
      },
    },
    // Stats Section
    stats: {
      projects: "Projetos Concluídos",
      experience: "Anos de Experiência",
      clients: "Clientes Satisfeitos",
      success: "Taxa de Sucesso",
    },
    // Portfolio Section
    portfolio: {
      title: "PORTFÓLIO",
      categories: {
        all: "Todos",
        web: "Web Apps",
        "3d": "3D/WebGL",
        game: "Games",
      },
      viewProject: "Ver Projeto",
      code: "Código",
      projects: {
        chuva: {
          title: "CHUVA Games",
          description: "Estúdio brasileiro de jogos neurodivergente com design moderno e interativo.",
        },
        spocky: {
          title: "Spocky Games",
          description: "Plataforma de jogos retrô com design nostálgico e experiência imersiva.",
        },
        space: {
          title: "Space Explorer",
          description: "Aplicação interativa de exploração espacial com visualizações 3D.",
        },
        cyber: {
          title: "Cyber Maze",
          description: "Jogo de labirinto cyberpunk com elementos interativos e animações fluidas.",
        },
      },
    },
    // Contact Section
    contact: {
      title: "CONTATO",
      subtitle: "Vamos Conversar",
      description:
        "Estou sempre aberto a discutir novos projetos, oportunidades criativas ou parcerias. Entre em contato e vamos criar algo incrível juntos!",
      methods: {
        discord: "Discord",
        email: "Email",
        location: "Localização",
      },
      socialTitle: "Redes Sociais",
      form: {
        name: "Nome",
        namePlaceholder: "Seu nome",
        email: "Email",
        emailPlaceholder: "seu@email.com",
        subject: "Assunto",
        subjectPlaceholder: "Assunto da mensagem",
        message: "Mensagem",
        messagePlaceholder: "Sua mensagem...",
        send: "ENVIAR MENSAGEM",
        sending: "ENVIANDO...",
      },
      toast: {
        success: "Copiado!",
        successDescription: "A informação foi copiada para área de transferência.",
        error: "Erro",
        errorDescription: "Ocorreu um erro ao processar sua solicitação. Tente novamente.",
      },
    },
    // Footer
    footer: {
      copyright: "© 2009 - 2025 Tutankhamal Dev. Todos os direitos reservados.",
    },
    // Loading
    loading: "CARREGANDO...",
  },
  en: {
    // Navigation
    nav: {
      home: "Home",
      skills: "Skills",
      portfolio: "Portfolio",
      contact: "Contact",
    },
    // Hero Section
    hero: {
      title: "TUTANKHAMAL",
      subtitle: "DEV",
      role: "Full Stack Web Developer",
      description: "Creating innovative digital experiences with cutting-edge technologies",
      viewProjects: "VIEW PROJECTS",
      contact: "CONTACT",
      scroll: "SCROLL",
    },
    // Skills Section
    skills: {
      title: "SKILLS",
      items: {
        frontend: {
          title: "Frontend Development",
          description: "React, Next.js, TypeScript, Tailwind CSS",
        },
        backend: {
          title: "Backend Development",
          description: "Node.js, Python, RESTful APIs",
        },
        database: {
          title: "Database",
          description: "PostgreSQL, MongoDB, Redis",
        },
        web: {
          title: "Web Technologies",
          description: "HTML5, CSS3, JavaScript ES6+",
        },
        mobile: {
          title: "Mobile Development",
          description: "React Native, Flutter",
        },
        design: {
          title: "UI/UX Design",
          description: "Figma, Adobe XD, Design Systems",
        },
      },
    },
    // Stats Section
    stats: {
      projects: "Completed Projects",
      experience: "Years of Experience",
      clients: "Satisfied Clients",
      success: "Success Rate",
    },
    // Portfolio Section
    portfolio: {
      title: "PORTFOLIO",
      categories: {
        all: "All",
        web: "Web Apps",
        "3d": "3D/WebGL",
        game: "Games",
      },
      viewProject: "View Project",
      code: "Code",
      projects: {
        chuva: {
          title: "CHUVA Games",
          description: "Brazilian neurodivergent game studio with modern and interactive design.",
        },
        spocky: {
          title: "Spocky Games",
          description: "Retro gaming platform with nostalgic design and immersive experience.",
        },
        space: {
          title: "Space Explorer",
          description: "Interactive space exploration application with 3D visualizations.",
        },
        cyber: {
          title: "Cyber Maze",
          description: "Cyberpunk maze game with interactive elements and fluid animations.",
        },
      },
    },
    // Contact Section
    contact: {
      title: "CONTACT",
      subtitle: "Let's Talk",
      description:
        "I'm always open to discussing new projects, creative opportunities, or partnerships. Get in touch and let's create something amazing together!",
      methods: {
        discord: "Discord",
        email: "Email",
        location: "Location",
      },
      socialTitle: "Social Media",
      form: {
        name: "Name",
        namePlaceholder: "Your name",
        email: "Email",
        emailPlaceholder: "your@email.com",
        subject: "Subject",
        subjectPlaceholder: "Message subject",
        message: "Message",
        messagePlaceholder: "Your message...",
        send: "SEND MESSAGE",
        sending: "SENDING...",
      },
      toast: {
        success: "Copied!",
        successDescription: "Information has been copied to clipboard.",
        error: "Error",
        errorDescription: "An error occurred while processing your request. Please try again.",
      },
    },
    // Footer
    footer: {
      copyright: "© 2009 - 2025 Tutankhamal Dev. All rights reserved.",
    },
    // Loading
    loading: "LOADING...",
  },
} as const

export function getTranslations(locale: Locale) {
  return translations[locale] || translations.pt
}
