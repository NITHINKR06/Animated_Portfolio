# Animated 3D Portfolio

<div align="center">

![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?logo=vite&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-0.181-000000?logo=three.js&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-0055FF?logo=framer&logoColor=white)
![Anime.js](https://img.shields.io/badge/Anime.js-4.2-FF6B6B)
![Lenis](https://img.shields.io/badge/Lenis-1.3-8B5CF6)
![License](https://img.shields.io/badge/License-MIT-green.svg)

**A modern, animated portfolio website built with React, Three.js, Framer Motion, and Anime.js featuring a VS Code–style project modal, orbital hero icons, bento about section, and premium scroll animations.**

[🌐 Live Demo](https://nithinkr.vercel.app) · [🐛 Report Bug](https://github.com/NITHINKR06/Animated_Portfolio/issues) · [💡 Request Feature](https://github.com/NITHINKR06/Animated_Portfolio/issues)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Customization](#-customization)
- [Performance](#-performance)
- [Deployment](#-deployment)
- [License](#-license)

---

## 🎯 Overview

A cutting-edge portfolio website for **Nithin K R** — Full Stack Developer & Cyber Security enthusiast. Built with a premium dark aesthetic (purple/pink gradients, glassmorphism, neon glow), the site features cinematic scroll animations, a fully interactive 3D hero section, and a VS Code–inspired project explorer modal.

### What makes it stand out

- 🌌 **Three.js 3D background** — Interactive WebGL mesh that reacts to scroll and mouse
- 🪐 **Orbital hero icons** — Tech icons orbit the profile photo and link directly to projects
- 🗂️ **VS Code project modal** — Projects open in a fake IDE with README / package.json / links.sh tabs
- ✨ **Clip-path & blur reveals** — Apple/Linear-style scroll animations via Anime.js
- 🧲 **Magnetic buttons** — CTAs subtly follow the cursor for a premium feel
- 🎯 **Bento about section** — Stats, location, stack, and focus in a modern grid layout
- 🔄 **Lenis smooth scroll** — Physics-based scrolling across all sections

---

## ✨ Features

### Sections
| Section | Description |
|---------|-------------|
| **Hero** | Animated name, 3D orbital ring system, availability badge, TryHackMe badge |
| **About** | Bento grid — bio, stats counters, location, currently working on, daily stack |
| **Skills** | Category tabs (Frontend / Backend / DevOps / CyberSecurity / Tools) with animated cards |
| **Experience** | Timeline of work experience with tech tags |
| **Education** | Academic history with institution images |
| **Projects** | Card grid with hover effects, quick GitHub/Live links, VS Code modal on click |
| **Certifications** | Gallery of certificates and competition achievements |
| **Contact** | Direct contact form with social links |
| **Services** | Dedicated `/services` page with pricing, marquee tech stack, scroll animations |

### Interactions
- **Orbit click** — Clicking a tech icon in the hero orbit scrolls to `#projects` and opens that project's modal
- **Project modal** — VS Code aesthetic with macOS traffic lights, 3 tabs, breadcrumb typing animation, syntax-highlighted JSON and bash
- **Stats count-up** — Numbers animate from 0 when scrolled into view
- **Scroll progress bar** — Spring-smoothed top bar (Framer Motion)
- **Back to top** — Magnetic floating button with spring animation
- **Escape to close** — Modal closes on `Escape` key

### Technical
- Lazy loading for `ThreeDBackground`, `ResumeModal`, `ProjectDetailModal`
- `manualChunks` in Vite for code splitting (three / framer / anime / react / markdown)
- `useReducedMotion()` throughout — all animations respect accessibility preferences
- `prefers-reduced-transparency` CSS fallback on glass cards
- `IntersectionObserver` pauses Three.js when canvas is off-screen
- `visibilitychange` pauses Three.js when tab is hidden
- Lenis disabled on mobile (`< 768px`) for performance
- `localStorage` token for loading screen (no cookies)
- WebP images throughout, `fetchpriority="high"` on hero photo

---

## 🛠️ Tech Stack

### Core
| Package | Version | Purpose |
|---------|---------|---------|
| React | 18.3 | UI framework |
| TypeScript | 5.5 | Type safety |
| Vite | 7.2 | Build tool |
| React Router DOM | 7.9 | Client-side routing |

### Animation
| Package | Version | Purpose |
|---------|---------|---------|
| Framer Motion | 12.x | Page animations, spring physics, scroll progress |
| Anime.js | 4.2 | Clip-path reveals, blur-in text, count-up, stagger grids |
| Lenis | 1.3 | Smooth scroll with physics easing |

### 3D & Graphics
| Package | Version | Purpose |
|---------|---------|---------|
| Three.js | 0.181 | WebGL 3D background |

### Styling
| Package | Version | Purpose |
|---------|---------|---------|
| Tailwind CSS | 3.4 | Utility-first styling |
| Lucide React | 0.344 | Icon system |
| React Icons | 5.5 | Additional icons |

### Content
| Package | Version | Purpose |
|---------|---------|---------|
| React Markdown | 9.1 | Markdown rendering in project modal |
| Remark GFM | 4.0 | GitHub Flavored Markdown |
| Rehype Raw | 7.0 | HTML in markdown |

### Testing
| Package | Version | Purpose |
|---------|---------|---------|
| Vitest | 2.1 | Unit testing |
| Testing Library | 16.3 | React component testing |
| jsdom | 26.0 | DOM environment for tests |

---

## 📁 Project Structure

```
Animated_Portfolio/
├── public/
│   ├── NITHINKR06.webp          # Profile photo (WebP, target <150KB)
│   ├── Nithin K R.pdf           # Resume PDF
│   ├── certificate/             # Certification images (WebP)
│   ├── images/                  # OG cover image (og-portfolio-cover.png)
│   ├── logos/                   # Tech SVG logos
│   │   ├── react-original.svg
│   │   ├── typescript-original.svg
│   │   └── ...                  # 20+ logos
│   ├── projects/                # Project screenshots
│   │   └── walrus/
│   │       └── walrus-thumbnail.webp
│   └── favicon.svg
│
├── scripts/
│   └── checkOgImage.ts          # Validates OG image exists
│
├── src/
│   ├── components/
│   │   ├── About.tsx            # Bento grid about section
│   │   ├── AnimatedBackground.tsx
│   │   ├── Certification.tsx
│   │   ├── Contact.tsx
│   │   ├── CustomCursor.tsx     # Miles Morales-style cursor
│   │   ├── Education.tsx
│   │   ├── Experience.tsx
│   │   ├── Hero.tsx             # Orbital rings, photo, badges
│   │   ├── LearningPathFloatingIcon.tsx
│   │   ├── LoadingScreen.tsx
│   │   ├── MobileNav.tsx        # Floating bubble nav (mobile)
│   │   ├── PageTransition.tsx
│   │   ├── ProjectDetailModal.tsx  # VS Code aesthetic modal
│   │   ├── Projects.tsx         # Card grid
│   │   ├── ResumeModal.tsx
│   │   ├── SectionReveal.tsx    # Scroll reveal wrapper
│   │   ├── Services.tsx         # Full services page
│   │   ├── Sidebar.tsx          # Desktop nav with scroll spy
│   │   ├── Skills.tsx           # Category tabs
│   │   └── ThreeDBackground.tsx # Three.js WebGL canvas
│   │
│   ├── components/__tests__/
│   │   ├── Contact.test.tsx
│   │   ├── Hero.test.tsx
│   │   ├── HeroAccessibility.test.tsx
│   │   ├── Projects.test.tsx
│   │   ├── Sidebar.test.tsx
│   │   └── Skills.test.tsx
│   │
│   ├── data/
│   │   └── portfolio.ts         # All content — edit this file to customize
│   │
│   ├── hooks/
│   │   ├── useLenis.ts          # Smooth scroll + sidebar event bridge
│   │   └── useScrollAnimations.ts  # clip-path, blur-in, magnetic, parallax, spring
│   │
│   ├── App.tsx                  # Routes, lifted modal state, layout
│   ├── index.css                # Global styles, marquee keyframes, glass-card
│   ├── main.tsx                 # Theme provider, entry point
│   └── setupTests.ts            # Vitest + Testing Library setup
│
├── index.html                   # OG/Twitter meta tags, canonical URL
├── package.json
├── tailwind.config.js           # Custom animations (marquee-left/right)
├── tsconfig.json
├── vite.config.ts               # manualChunks, test config
├── vercel.json                  # SPA fallback routing
└── eslint.config.js
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ 
- **yarn** (recommended) or npm

### Installation

```bash
# Clone
git clone https://github.com/NITHINKR06/Animated_Portfolio.git
cd Animated_Portfolio

# Install dependencies
yarn install

# Start dev server
yarn dev
# → http://localhost:5173
```

### Available Scripts

```bash
yarn dev          # Start development server
yarn build        # Production build → dist/
yarn preview      # Preview production build
yarn lint         # Run ESLint
yarn test         # Run Vitest tests
yarn test:watch   # Watch mode
yarn test:ui      # Vitest UI
yarn check:og     # Verify OG image exists in public/images/
```

---

## 🎨 Customization

### All content lives in one file

**`src/data/portfolio.ts`** — edit this to update everything:

```typescript
export const portfolioData = {
  personal: {
    name: 'Nithin K R',
    title: 'Full Stack Developer | Cyber Security',
    email: 'nithinpoojari717@gmail.com',
    github: 'https://github.com/NITHINKR06',
    linkedin: 'https://linkedin.com/in/nithinkr06',
    bio: '...',
  },
  skills: [...],      // categories with logos from /public/logos/
  experience: [...],
  education: [...],
  projects: [...],    // thumbnail, screenshots[], githubUrl, liveUrl, details (markdown)
  certifications: [...],
}
```

### Adding a project

```typescript
{
  id: 'my-project',           // used in orbit icon mapping
  title: 'My Project',
  description: 'Short description shown on card',
  details: `## Overview\n...`, // Full markdown — shown in VS Code modal README tab
  thumbnail: '/projects/my-project/thumb.webp',  // card image
  screenshots: ['/projects/my-project/screen1.webp'], // modal gallery
  technologies: ['React', 'Node.js', 'MongoDB'],
  githubUrl: 'https://github.com/...',
  liveUrl: 'https://...',
  status: 'completed',        // 'completed' | 'in-progress' | 'planned'
  priority: 'high',           // optional
}
```

### Orbit icon → project mapping

In `src/components/Hero.tsx`, update `iconProjectMap`:

```typescript
const iconProjectMap: Record<string, string | null> = {
  'React':      'animated-portfolio',
  'TypeScript': 'animated-portfolio',
  'Node.js':    'globlebites',
  'Python':     'driftguard',
  'Docker':     null,          // null = decorative, no click
  'Three.js':   'animated-portfolio',
  'MongoDB':    'walrus',
  'Kali':       'packet-defender',
  'Postgres':   'chc-secure',
};
```

### Styling

- **Theme colours** — purple/pink gradient throughout. Adjust in `src/index.css` and component inline styles
- **Glass cards** — `.glass-card` class in `index.css`
- **Marquee speed** — `tailwind.config.js` animation durations
- **3D background** — `src/components/ThreeDBackground.tsx` (geometry, colours, speed)

### Services page

Edit `src/components/Services.tsx` directly — all pricing, features, FAQs, and tech stack are hardcoded in the data arrays at the top of the file.

---

## ⚡ Performance

| Metric | Target | Implementation |
|--------|--------|----------------|
| Profile photo | < 150 KB | WebP, squoosh.app quality 75, 800×800 |
| JS chunks | Separate | three / framer / anime / react / markdown via `manualChunks` |
| Three.js | Paused off-screen | `IntersectionObserver` + `visibilitychange` |
| Lenis | Mobile disabled | `window.innerWidth < 768` check |
| Images | Lazy by default | `loading="lazy"` + `decoding="async"` |
| Hero photo | Priority loaded | `fetchpriority="high"` |
| Modals | Lazy imported | `React.lazy()` + `Suspense` |
| Reduced motion | Respected | `useReducedMotion()` on all animations |

### Bundle chunks (approximate)

```
dist/assets/
├── react-[hash].js      ~140 KB   React + Router + DOM
├── three-[hash].js      ~580 KB   Three.js (lazy)
├── framer-[hash].js     ~180 KB   Framer Motion
├── anime-[hash].js       ~18 KB   Anime.js
├── markdown-[hash].js    ~90 KB   react-markdown + plugins (lazy)
└── index-[hash].js       ~80 KB   App code
```

---

## 🚀 Deployment

### Vercel (recommended)

The project is pre-configured with `vercel.json` — SPA fallback routing is already set up:

```json
{
  "routes": [
    { "handle": "filesystem" },
    { "src": "/.*", "dest": "/index.html" }
  ]
}
```

1. Push to GitHub
2. Import in [vercel.com](https://vercel.com)
3. Done — auto-deploys on every push to `main`

### Manual build

```bash
yarn build
# Deploy dist/ to any static host (Netlify, Cloudflare Pages, S3)
```

---

## 🧪 Tests

6 test files covering core components:

```bash
yarn test

# Tests:
# ✓ Hero renders name and CTAs
# ✓ Hero accessibility (ARIA roles, keyboard nav)
# ✓ Projects renders all cards, modal-free (state lifted to App)
# ✓ Sidebar renders all nav items, active state
# ✓ Skills renders all categories and skill names
# ✓ Contact renders form fields and submit button
```

---

## 📄 License

MIT — see [LICENSE](LICENSE) for details.

---

<div align="center">

**Designed & built by [Nithin K R](https://github.com/NITHINKR06)**

[![GitHub](https://img.shields.io/badge/GitHub-NITHINKR06-181717?logo=github&logoColor=white)](https://github.com/NITHINKR06)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-nithinkr06-0077B5?logo=linkedin&logoColor=white)](https://linkedin.com/in/nithinkr06)
[![Portfolio](https://img.shields.io/badge/Portfolio-nithinkr.vercel.app-8B5CF6?logo=vercel&logoColor=white)](https://nithinkr.vercel.app)

⭐ Star this repo if you find it useful!

</div>
