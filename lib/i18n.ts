export const defaultLocale = "pt"
export const locales = ["pt", "en"] as const
export type Locale = (typeof locales)[number]

export const translations = {
  pt: {
    // Navigation
    nav: {
      home: "Início",
      skills: "Habilidades",
      technologies: "Tecnologias",
      portfolio: "Portfólio",
      contact: "Contato",
      youtube: "YouTube",
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
          title: "Desenvolvimento Front-end",
          description: "HTML, CSS, JavaScript, React, Next.js",
        },
        backend: {
          title: "Desenvolvimento Back-end",
          description: "Node.js, PHP, Python, TypeScript, APIs",
        },
        discord: {
          title: "Desenvolvimento de Discord Bot",
          description: "Discord API, Node.js e JavaScript",
        },
        devops: {
          title: "DevOps & Cloud",
          description: "AWS, Docker, Linux e automação",
        },
        ecommerce: {
          title: "Ecommerce & CMS",
          description: "Sistemas de gerenciamento e vendas",
        },
        design: {
          title: "UI/UX",
          description: "Design de interfaces e experiência do usuário",
        },
      },
    },
    // Technologies Section
    technologies: {
      title: "TECNOLOGIAS",
      subtitle: "Ferramentas e linguagens que domino",
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
        "2d": "2D/WebGL",
        game: "Games",
      },
      viewProject: "Ver Projeto",
      code: "Código",
      projects: {
        chuva: {
          title: "CHUVA Games Studio",
          description: "Estúdio brasileiro de jogos neurodivergente com design moderno e interativo.",
        },
        spocky: {
          title: "Spocky Games Website",
          description: "Plataforma de jogos retrô com design nostálgico e experiência imersiva.",
        },
        space: {
          title: "Universe Dynamic Background",
          description: "Background interativo de exploração espacial com visualizações 2D.",
        },
        cyber: {
          title: "Pac-Man Dynamic Background",
          description: "Background em homenagem ao jogo Pac-Man com elementos interativos e animações fluidas.",
        },
        egypt: {
          title: "Night on Egypt",
          description: "Background dinâmico inspirado no antigo Egito com efeitos de luz LED e animações pixel art.",
        },
        crt: {
          title: "CRT TV Interference",
          description: "Efeito de interferência de TV CRT retrô com animações dinâmicas e interativas usando Canvas.",
        },
        anacruse: {
          title: "Website da Banda Anacruse", 
          description: "Site oficial de uma banda de rock com estética cyberpunk, suporte multilíngue e design responsivo moderno.",
        },
        alanjoga: {
          title: "Alan Joga+ - Canal de Jogos Retrô",
          description: "Website oficial do canal Alan Joga+ especializado em jogos retrô e nostalgia gaming com design cyberpunk futurístico.",
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
    // YouTube Section
    youtube: {
      title: "TUTANKHAMAL ON YOUTUBE",
      subtitle: "Jogos, Tecnologia e Desenvolvimento",
      description: "No canal temos gameplays, tutoriais e projetos diversos",
      stats: {
        subscribers: "Inscritos",
        views: "Visualizações",
        videos: "Vídeos",
        comments: "Comentários",
        likes: "Curtidas",
        watchTime: "Horas Assistidas",
      },
      buttons: {
        subscribe: "INSCREVER-SE",
        visitChannel: "VISITAR CANAL",
      },
      loading: "Carregando estatísticas...",
      error: "Erro ao carregar dados do canal",
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
      technologies: "Technologies",
      portfolio: "Portfolio",
      contact: "Contact",
      youtube: "YouTube",
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
          title: "Front-end Development",
          description: "HTML, CSS, JavaScript, React, Next.js",
        },
        backend: {
          title: "Back-end Development",
          description: "Node.js, PHP, Python, TypeScript, APIs",
        },
        discord: {
          title: "Discord Bot Development",
          description: "Discord API, Node.js and JavaScript",
        },
        devops: {
          title: "DevOps & Cloud",
          description: "AWS, Docker, Linux and automation",
        },
        ecommerce: {
          title: "Ecommerce & CMS",
          description: "Management and sales systems",
        },
        design: {
          title: "UI/UX",
          description: "Interface design and user experience",
        },
      },
    },
    // Technologies Section
    technologies: {
      title: "TECHNOLOGIES",
      subtitle: "Tools and languages I master",
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
        "2d": "2D/WebGL",
        game: "Games",
      },
      viewProject: "View Project",
      code: "Code",
      projects: {
        chuva: {
          title: "CHUVA Games Studio",
          description: "Brazilian neurodivergent game studio with modern and interactive design.",
        },
        spocky: {
          title: "Spocky Games Website",
          description: "Retro gaming platform with nostalgic design and immersive experience.",
        },
        space: {
          title: "Universe Dynamic Background",
          description: "Interactive space exploration application with 2D visualizations.",
        },
        cyber: {
          title: "Pac-Man Dynamic Background",
          description: "Pac-Man inspired background with interactive elements and fluid animations.",
        },
        egypt: {
          title: "Night on Egypt",
          description: "Dynamic background inspired by ancient Egypt with LED light effects and pixel art animations.",
        },
        crt: {
          title: "CRT TV Interference",
          description: "Retro CRT TV interference effect with dynamic and interactive animations using Canvas.",
        },
        anacruse: {
          title: "Anacruse Band Website",
          description: "Official website for a rock band with cyberpunk aesthetics, multilingual support, and a modern responsive design.",
        },
        alanjoga: {
          title: "Alan Joga+ - Retro Gaming Channel",
          description: "Official website for Alan Joga+ channel specialized in retro games and gaming nostalgia with futuristic cyberpunk design.",
        },
      },
    },
    // Contact Section
    contact: {
      title: "CONTACT",
      subtitle: "Let's work together",
      description: "Ready to turn your idea into reality? Get in touch!",
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
        sending: "Sending...",
        success: "Message sent successfully!",
        error: "Error sending message. Please try again.",
      },
      toast: {
        success: "Copied!",
        successDescription: "Information has been copied to clipboard.",
        error: "Error",
        errorDescription: "An error occurred while processing your request. Please try again.",
      },
    },
    // YouTube Section
    youtube: {
      title: "TUTANKHAMAL ON YOUTUBE",
      subtitle: "Games, Technology and Development",
      description: "Our channel features gameplays, tutorials and diverse projects",
      stats: {
        subscribers: "Subscribers",
        views: "Views",
        videos: "Videos",
        comments: "Comments",
        likes: "Likes",
        watchTime: "Watch Time Hours",
      },
      buttons: {
        subscribe: "SUBSCRIBE",
        visitChannel: "VISIT CHANNEL",
      },
      loading: "Loading statistics...",
      error: "Error loading channel data",
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
