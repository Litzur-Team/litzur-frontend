# Litzur Frontend

Plataforma web para criação e gerenciamento de landing pages, desenvolvida com Next.js e TypeScript.

🌐 **Site em produção:** [https://litzur-frontend-one.vercel.app](https://litzur-frontend-one.vercel.app)

## 📋 Sobre o Projeto

Litzur é uma aplicação web moderna que permite aos usuários criar, editar e gerenciar landing pages de forma intuitiva através de um editor visual. O projeto oferece autenticação segura, dashboard personalizado e ferramentas de edição com componentes reutilizáveis.

## ✨ Funcionalidades

- **Autenticação de Usuários**: Sistema completo de login, cadastro e recuperação de senha
- **Dashboard Interativo**: Visualização e gerenciamento de páginas criadas
- **Editor Visual**: Interface drag-and-drop para criação de landing pages
- **Componentes Reutilizáveis**: Biblioteca de componentes prontos para uso
- **Acessibilidade**: Integração com VLibras para acessibilidade
- **Responsivo**: Design adaptável para todos os dispositivos

## 🚀 Tecnologias

- **Framework**: [Next.js 15](https://nextjs.org/) com App Router
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
- **Estilização**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Formulários**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Requisições HTTP**: [Axios](https://axios-http.com/)
- **UI Components**: 
  - [Headless UI](https://headlessui.com/)
  - [Radix UI](https://www.radix-ui.com/)
  - [Lucide React](https://lucide.dev/)
- **Notificações**: [React Hot Toast](https://react-hot-toast.com/)

## 📁 Estrutura do Projeto

```
src/
├── app/                    # Rotas e páginas (App Router)
│   ├── (auth)/            # Páginas de autenticação
│   ├── (editor)/          # Editor de landing pages
│   ├── (landingPage)/     # Landing page pública
│   └── (private)/         # Páginas privadas (dashboard)
├── components/            # Componentes reutilizáveis
│   ├── forms/            # Formulários
│   ├── ui/               # Componentes de interface
│   └── ...
├── contexts/             # Contextos React (AuthContext)
├── hooks/                # Custom hooks
├── services/             # Serviços de API
├── types/                # Definições TypeScript
└── utils/                # Utilitários
```

## 🛠️ Instalação e Configuração

### Pré-requisitos

- Node.js 20+ 
- npm, yarn, pnpm ou bun

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/Litzur-Team/litzur-frontend.git
cd litzur-frontend
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. Configure as variáveis de ambiente (crie um arquivo `.env.local`):
```env
NEXT_PUBLIC_API_URL=sua_url_da_api
```

4. Execute o servidor de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

5. Abra [http://localhost:3000](http://localhost:3000) no navegador.

## 📜 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria a build de produção
- `npm run start` - Inicia o servidor de produção
- `npm run lint` - Executa o linter ESLint

## 🔐 Rotas

- `/` - Landing page principal
- `/signin` - Login
- `/signup` - Cadastro
- `/forgotpassword` - Recuperação de senha
- `/emailcheck` - Verificação de email
- `/dashboard` - Dashboard do usuário (protegida)
- `/pageEditor` - Editor de páginas (protegida)

## 👥 Autores

- **Thiago Moreira**
- **Jean Tomaz**
- **Vinicius Ferreira**
- **Emerson Felipe**

## 📄 Licença

Este projeto é privado e desenvolvido para fins acadêmicos.

## 🔗 Links Úteis

- [Documentação do Next.js](https://nextjs.org/docs)
- [Documentação do Tailwind CSS](https://tailwindcss.com/docs)
- [Documentação do TypeScript](https://www.typescriptlang.org/docs)
