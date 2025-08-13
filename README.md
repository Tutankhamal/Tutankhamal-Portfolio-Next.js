# Portfólio Pessoal com Next.js

Este é um projeto de portfólio pessoal desenvolvido com Next.js, TypeScript e Tailwind CSS, apresentando uma arquitetura moderna e funcionalidades avançadas, incluindo internacionalização (i18n) e um formulário de contato funcional com envio de e-mail via SMTP.

---

### 🚀 [Preview](https://tutankhamal.com)

---

## ✨ Features

- **Design Moderno e Responsivo**: Interface elegante construída com Tailwind CSS e Shadcn/UI.
- **Internacionalização (i18n)**: Suporte para múltiplos idiomas (inglês e português) com roteamento baseado em locale.
- **Tema Escuro/Claro**: Funcionalidade de troca de tema para melhor experiência do usuário.
- **Formulário de Contato Funcional**: Envia e-mails diretamente para sua caixa de entrada usando Nodemailer e um servidor SMTP (configurado para Zoho Mail).
- **Componentização Estratégica**: Código organizado em seções, componentes de UI reutilizáveis e layout.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (com App Router)
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
- **Estilização**: [Tailwind CSS](https://tailwindcss.com/)
- **Componentes UI**: [Shadcn/UI](https://ui.shadcn.com/)
- **Envio de E-mail**: [Nodemailer](https://nodemailer.com/)
- **Internacionalização**: [next-intl](https://next-intl-docs.vercel.app/)
- **Ícones**: [Lucide React](https://lucide.dev/)

---

## 📂 Estrutura do Projeto

A estrutura de pastas segue as melhores práticas para projetos Next.js, garantindo escalabilidade e manutenibilidade.

```
/tutankhamal-portfolio
├── app/                    # Rotas principais da aplicação (App Router)
│   ├── [locale]/           # Rotas dinâmicas para internacionalização
│   │   ├── layout.tsx      # Layout principal para cada idioma
│   │   └── page.tsx        # Página principal renderizada para cada idioma
│   ├── api/                # Rotas de API
│   │   └── contact/        # Lógica do lado do servidor para o formulário de contato
│   │       └── route.ts
│   ├── globals.css         # Estilos globais
│   └── layout.tsx          # Layout raiz da aplicação
├── components/             # Componentes React
│   ├── layout/             # Componentes de layout (Header, Footer)
│   ├── sections/           # Seções principais da página (Hero, Skills, Portfolio, Contact)
│   ├── ui/                 # Componentes de UI reutilizáveis (Button, Card, etc. - Shadcn)
│   └── theme-provider.tsx  # Provedor para o tema (claro/escuro)
├── hooks/                  # Hooks customizados do React
├── lib/                    # Funções utilitárias (ex: `cn` do Shadcn)
├── public/                 # Arquivos estáticos (imagens, ícones)
├── styles/                 # Arquivos de estilo adicionais
├── middleware.ts           # Middleware para gerenciamento de requisições (usado para i18n)
├── next.config.mjs         # Configurações do Next.js
└── tailwind.config.ts      # Configurações do Tailwind CSS
```

---

## ⚙️ Funcionalidades Chave

### 1. Internacionalização (`middleware.ts` e `app/[locale]`)
O arquivo `middleware.ts` intercepta as requisições para determinar o idioma do usuário (com base no cabeçalho `Accept-Language` ou no path da URL). Ele então redireciona para a rota correta em `app/[locale]`, onde `[locale]` pode ser `en` ou `pt`. Isso permite que o Next.js renderize a página com o conteúdo no idioma apropriado.

### 2. Envio de E-mail (`app/api/contact/route.ts`)
A rota `POST /api/contact` é responsável por:
1.  Receber os dados do formulário (nome, e-mail, assunto, mensagem).
2.  Validar se todos os campos foram preenchidos.
3.  Criar um "transporter" do Nodemailer com as credenciais SMTP fornecidas via variáveis de ambiente.
4.  Montar o corpo do e-mail em HTML com os dados recebidos.
5.  Enviar o e-mail e retornar uma resposta de sucesso ou erro para o frontend.

### 3. Componentes de Seção (`components/sections`)
Cada arquivo nesta pasta representa uma seção principal da página de portfólio:
- `hero.tsx`: A primeira seção de boas-vindas.
- `skills.tsx`: Exibe as habilidades técnicas.
- `portfolio.tsx`: Mostra os projetos do portfólio.
- `stats.tsx`: Apresenta estatísticas ou números importantes.
- `contact.tsx`: Contém o formulário de contato do frontend.
- `footer.tsx`: O rodapé do site.

---

## ⚠️ Aviso de Direitos Autorais

Este projeto e seu código-fonte são de uso exclusivo de **Tutankhamal Dev**. É estritamente proibida a cópia, modificação, distribuição ou uso comercial sem permissão explícita do autor.

---

## 🚀 Rodando o Projeto Localmente

Siga os passos abaixo para configurar e rodar o projeto em seu ambiente de desenvolvimento.

### 1. Pré-requisitos
- [Node.js](https://nodejs.org/en/) (versão 18 ou superior)
- [pnpm](https://pnpm.io/installation) (ou npm/yarn)

### 2. Clonar o Repositório

```bash
git clone https://github.com/seu-usuario/tutankhamal-portfolio.git
cd tutankhamal-portfolio
```

### 3. Instalar Dependências

```bash
pnpm install
```

### 4. Configurar Variáveis de Ambiente

Crie um arquivo chamado `.env.local` na raiz do projeto e adicione as seguintes variáveis. Estas são essenciais para a funcionalidade de envio de e-mail.

```env
# Credenciais do seu servidor SMTP (ex: Zoho, Gmail, etc.)
SMTP_HOST=seu-smtp-host
SMTP_PORT=seu-smtp-port
SMTP_USER=seu-email@seudominio.com
SMTP_PASS=sua-senha-de-aplicativo # IMPORTANTE: Use senha de aplicativo se tiver 2FA
SMTP_FROM=seu-email@seudominio.com
```

**Nota:** Se você usa autenticação de dois fatores (2FA) em seu provedor de e-mail, você **precisa** gerar uma **Senha Específica de Aplicativo** e usá-la como `SMTP_PASS`.

### 5. Rodar o Servidor de Desenvolvimento

```bash
pnpm dev
```

Abra [http://localhost:3000](http://localhost:3000) em seu navegador para ver o resultado.
