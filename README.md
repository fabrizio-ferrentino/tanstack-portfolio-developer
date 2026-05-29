# Personal Portfolio

My personal portfolio website, built with **TanStack Start**, **React 19**, and **Tailwind CSS v4**.
Showcases my experience, projects, and contact information with full internationalization (English / Italian) and multiple theme support.

> ⚠️ This repository contains the source code only. Personal data (job descriptions, project content, contact details, etc.) has been removed or genericized — feel free to fork and adapt it to your own profile — just replace the personal data in `src/lib/site.ts`, `src/lib/works.ts`, and `src/lib/i18n.tsx`.

---

## ✨ Features

- ⚡ **Static SPA build** powered by TanStack Start v1 + Vite 7 (SSR-capable, deployed as static on Vercel)
- 🎨 **Multiple themes** with a custom theme picker (light / dark variants)
- 🌍 **i18n** — English and Italian, with a language toggle
- 🧭 **File-based routing** with type-safe navigation (TanStack Router)
- 🎯 **Animated active-link indicator** in the navigation bar
- 📱 **Fully responsive** design, mobile-first
- ♿ **Accessible** components built on Radix UI primitives (shadcn/ui)
- 🔍 **SEO-friendly** with static Open Graph / Twitter meta tags in `index.html` for crawler compatibility
- 🎭 Smooth page transitions and micro-interactions

---

## 🛠️ Tech Stack

| Category        | Technology                                              |
| --------------- | ------------------------------------------------------- |
| Framework       | [TanStack Start](https://tanstack.com/start) (v1)       |
| UI Library      | [React 19](https://react.dev)                           |
| Build Tool      | [Vite 7](https://vitejs.dev)                            |
| Routing         | [TanStack Router](https://tanstack.com/router)          |
| Styling         | [Tailwind CSS v4](https://tailwindcss.com)              |
| Components      | [shadcn/ui](https://ui.shadcn.com) + Radix UI           |
| Icons           | [Lucide React](https://lucide.dev)                      |
| Forms & Schema  | React Hook Form + Zod                                   |
| Language        | TypeScript (strict mode)                                |
| Deploy Target   | [Vercel](https://vercel.com) (static SPA)               |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20+ (or **Bun** 1.x)
- A package manager: `bun`, `npm`, `pnpm`, or `yarn`

### Installation

```bash
# Clone the repository
git clone https://github.com/fabrizio-ferrentino/tanstack-portfolio-developer.git
cd tanstack-portfolio-developer

# Install dependencies
npm install
# or: bun install
```

### Development

```bash
npm run dev
# or: bun run dev
```

The site will be available at the URL printed in the terminal (Vite default: [http://localhost:5173](http://localhost:5173)).

### Production Build

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
src/
├── components/         # Reusable React components
│   ├── ui/             # shadcn/ui primitives
│   ├── SiteLayout.tsx  # Main layout (nav + footer)
│   ├── ThemePicker.tsx
│   └── LanguageToggle.tsx
├── hooks/              # Custom React hooks
├── lib/                # Utilities, configs, and data
│   ├── i18n.tsx        # Internationalization context & dictionaries
│   ├── themes.ts       # Theme definitions
│   ├── site.ts         # Site metadata & job history
│   └── works.ts        # Projects data
├── routes/             # File-based routes (TanStack Router)
│   ├── __root.tsx      # Root layout
│   ├── index.tsx       # Home (/)
│   ├── about.tsx       # About (/about)
│   ├── experience.tsx  # Experience (/experience)
│   ├── works.index.tsx # Works listing (/works)
│   ├── works.$slug.tsx # Single work (/works/:slug)
│   └── contact.tsx     # Contact (/contact)
├── styles.css          # Tailwind v4 + design tokens
└── router.tsx          # Router configuration

index.html              # Static SEO + Open Graph meta tags
vercel.json             # Vercel SPA rewrites
```

---

## 🎨 Customization

### Personal Information

Edit `src/lib/site.ts` to update:

- Name, role, location
- Social links (GitHub, GitLab, LinkedIn, etc.)
- Job history (with English / Italian translations)

### Projects

Edit `src/lib/works.ts` to add or modify portfolio items.

### Theme & Colors

Design tokens (colors, spacing, shadows) are defined as CSS variables in `src/styles.css` using the `oklch` color space. Add or tweak themes in `src/lib/themes.ts`.

### Translations

i18n strings live in `src/lib/i18n.tsx`. Add new keys to both `en` and `it` dictionaries.

### SEO & Open Graph

Static meta tags (title, description, Open Graph, Twitter Card) are defined in `index.html` so that crawlers and social platforms (LinkedIn, X/Twitter, Facebook, WhatsApp) can read them without executing JavaScript. Update them there when changing site-wide metadata, and remember to provide a real `/og.png` (1200×630) in `public/`.

---

## 📜 Scripts

| Command            | Description                          |
| ------------------ | ------------------------------------ |
| `npm run dev`      | Start the dev server with HMR        |
| `npm run build`    | Production build                     |
| `npm run preview`  | Preview the production build locally |
| `npm run lint`     | Run ESLint                           |
| `npm run format`   | Format the codebase with Prettier    |

---

## 📄 License

Released under the [MIT License](./LICENSE). Free to use as a starting point for your own portfolio — attribution is appreciated but not required.

## 💖 Support
If you like this repository please give it a star! ⭐