# 💼 Portfolio – Nithin K R

<div align="center">

![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3+-38B2AC?logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7+-646CFF?logo=vite&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-0.181-000000?logo=three.js&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green.svg)

**A modern, animated portfolio website showcasing professional work, skills, and expertise in Full Stack Development and Cyber Security.**

[Live Demo](https://nithinkr.vercel.app) • [Documentation](#) • [Report Bug](#) • [Request Feature](#)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Customization](#-customization)
- [Deployment](#-deployment)
- [Performance](#-performance)
- [Contributing](#-contributing)
- [License](#-license)

## 🎯 Overview

A cutting-edge, fully responsive portfolio website built with modern web technologies. This project demonstrates expertise in frontend development, featuring smooth animations, a 3D interactive background, cyberpunk-inspired design, and an intuitive user experience. Perfect for showcasing professional achievements, technical skills, certifications, and personal projects.

### Key Highlights

- ⚡ **Lightning Fast** - Optimized performance with Vite 7+ and modern build tools
- 🎨 **Stunning Animations** - Smooth transitions powered by Framer Motion and Anime.js
- 🎮 **3D Interactive Background** - Immersive Three.js 3D torus knot animation
- 📱 **Fully Responsive** - Seamless experience across all devices and screen sizes
- 🛣️ **Learning Paths** - Interactive roadmaps for Web Development and Cyber Security
- 🔒 **Security Focus** - Built with security best practices in mind
- 🚀 **Production Ready** - Optimized builds for deployment on Vercel

## ✨ Features

### Core Functionality
- **Hero Section** - Eye-catching introduction with animated gradient text and 3D background
- **About Me** - Professional background and expertise overview with glassmorphism design
- **Skills Showcase** - Interactive display of technical competencies with categorized logos
- **Experience Timeline** - Chronological work history with detailed descriptions and technologies
- **Education** - Academic achievements and educational background
- **Projects Portfolio** - Featured projects with GitHub integration, live demos, and detailed modals
- **Certifications** - Showcase of certifications, competitions, and achievements with images
- **Contact Form** - Direct communication channel with social media integration
- **Resume Modal** - Interactive resume viewer with markdown support
- **Services Page** - Dedicated page showcasing offered services

### Design & UX
- **3D Background** - Interactive Three.js torus knot with mouse-responsive camera movement
- **Cyberpunk Aesthetic** - Futuristic navigation and loading animations
- **Loading Screen** - Animated loading experience with cookie-based token system
- **Smooth Scrolling** - Seamless section navigation with active section highlighting
- **Dark Theme** - Modern, eye-friendly color scheme with purple/pink gradients
- **Glassmorphism** - Modern glass-card effects throughout the UI
- **Icon System** - Scalable Lucide React icons throughout
- **Custom Favicon** - Premium SVG favicon with gradient design

### Technical Features
- **Type-Safe** - Full TypeScript implementation
- **Component-Based** - Modular React architecture with reusable components
- **React Router** - Client-side routing for multiple pages
- **GitHub Integration** - Dynamic project fetching from GitHub API
- **Markdown Support** - Resume and content rendering with react-markdown
- **Performance Optimized** - Code splitting and lazy loading
- **SEO Friendly** - Meta tags and semantic HTML
- **Accessible** - WCAG compliance considerations
- **Cookie Management** - Token-based loading screen state management

## 🛠️ Tech Stack

### Frontend Framework
- **[React 18+](https://react.dev/)** - Modern UI library with hooks and concurrent features
- **[TypeScript 5+](https://www.typescriptlang.org/)** - Type-safe JavaScript for better developer experience
- **[React Router DOM 7+](https://reactrouter.com/)** - Declarative routing for React applications

### Styling & Animation
- **[Tailwind CSS 3+](https://tailwindcss.com/)** - Utility-first CSS framework for rapid UI development
- **[Framer Motion 12+](https://www.framer.com/motion/)** - Production-ready motion library for React
- **[Anime.js 4+](https://animejs.com/)** - Lightweight JavaScript animation library

### 3D Graphics
- **[Three.js 0.181+](https://threejs.org/)** - 3D graphics library for WebGL

### Content & Icons
- **[Lucide React](https://lucide.dev/)** - Beautiful, customizable icon library
- **[React Icons](https://react-icons.github.io/react-icons/)** - Popular icons library
- **[React Markdown](https://github.com/remarkjs/react-markdown)** - Markdown component for React
- **[Rehype Raw](https://github.com/rehypejs/rehype-raw)** - HTML support in markdown
- **[Remark GFM](https://github.com/remarkjs/remark-gfm)** - GitHub Flavored Markdown support

### Build Tools
- **[Vite 7+](https://vitejs.dev/)** - Next-generation frontend build tool
- **[ESLint 9+](https://eslint.org/)** - Code quality and consistency
- **[TypeScript ESLint](https://typescript-eslint.io/)** - TypeScript-specific linting rules

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **npm** 9.x or higher (or **yarn** / **pnpm**)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/NITHINKR06/Profile.git
   cd Profile
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```
   The application will be available at `http://localhost:5173`

4. **Build for production**
   ```bash
   npm run build
   ```
   The optimized build will be in the `dist/` directory.

5. **Preview production build**
   ```bash
   npm run preview
   ```

6. **Lint code**
   ```bash
   npm run lint
   ```

## 📁 Project Structure

```
Profile/
├── public/                 # Static assets
│   ├── certificate/        # Certification images
│   ├── logos/              # Technology logos (SVG)
│   ├── favicon.svg         # Custom favicon
│   └── ...
├── src/
│   ├── components/         # React components
│   │   ├── AnimatedBackground.tsx
│   │   ├── Certification.tsx
│   │   ├── Contact.tsx
│   │   ├── Education.tsx
│   │   ├── Experience.tsx
│   │   ├── Hero.tsx
│   │   ├── LearningPathFloatingIcon.tsx
│   │   ├── LoadingScreen.tsx
│   │   ├── ProjectDetailModal.tsx
│   │   ├── Projects.tsx
│   │   ├── ResumeModal.tsx
│   │   ├── Services.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Skills.tsx
│   │   └── ThreeDBackground.tsx
│   ├── data/              # Portfolio data
│   │   └── portfolio.ts   # Main data configuration
│   ├── utils/             # Utility functions
│   │   └── github.ts      # GitHub API integration
│   ├── App.tsx            # Main application component
│   ├── index.css          # Global styles
│   └── main.tsx           # Application entry point
├── index.html             # HTML template
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── tsconfig.app.json      # App-specific TypeScript config
├── tsconfig.node.json     # Node-specific TypeScript config
├── tailwind.config.js     # Tailwind CSS configuration
├── vite.config.ts         # Vite configuration
├── vercel.json            # Vercel deployment configuration
└── eslint.config.js       # ESLint configuration
```

## 🎨 Customization

### Personal Information

Edit [`src/data/portfolio.ts`](src/data/portfolio.ts) to update:
- Personal profile and bio
- Skills and technologies (with logos and colors)
- Work experience
- Education history
- Project portfolio
- Certifications and achievements
- Contact information and social links
- GitHub repositories to display

### Styling

- **Global Styles**: Modify [`src/index.css`](src/index.css) for theme colors and base styles
- **Tailwind Config**: Customize design tokens in `tailwind.config.js`
- **Component Styles**: Update individual component styles as needed
- **Color Scheme**: The site uses a purple/pink gradient theme - customize in CSS variables

### Assets

- Replace images in the `public/` directory
- Update favicon: `public/favicon.svg`
- Add technology logos to `public/logos/`
- Add certification images to `public/certificate/`
- Update resume PDF: `public/Nithin K R.pdf`

### 3D Background

Customize the 3D background in [`src/components/ThreeDBackground.tsx`](src/components/ThreeDBackground.tsx):
- Change geometry (currently TorusKnot)
- Adjust colors and materials
- Modify camera movement and rotation speeds
- Customize lighting

## 🚀 Deployment

### Vercel (Recommended)

The project is configured for Vercel deployment with `vercel.json`:

1. Push your code to GitHub
2. Import the repository in Vercel
3. Vercel will automatically detect the configuration and deploy

### Manual Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `dist/` folder to your hosting provider:
   - **Netlify**: Drag and drop the `dist` folder
   - **GitHub Pages**: Use GitHub Actions or deploy manually
   - **Other**: Upload `dist/` contents to your server

## ⚡ Performance

- **Lighthouse Score**: 95+ across all metrics
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Bundle Size**: Optimized with tree-shaking and code splitting
- **3D Performance**: Optimized Three.js rendering with efficient geometry
- **Image Optimization**: SVG logos for scalability and performance

## 🤝 Contributing

Contributions are welcome! If you'd like to contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code follows the existing style and includes appropriate tests.

### Development Guidelines

- Follow TypeScript best practices
- Use ESLint for code quality
- Maintain component modularity
- Add comments for complex logic
- Test responsive design on multiple devices

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Designed & Developed with ❤️ by [Nithin K R](https://github.com/NITHINKR06)**

[![GitHub](https://img.shields.io/badge/GitHub-100000?logo=github&logoColor=white)](https://github.com/NITHINKR06)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?logo=linkedin&logoColor=white)](https://linkedin.com/in/nithinkr06)
[![Portfolio](https://img.shields.io/badge/Portfolio-000000?logo=About.me&logoColor=white)](#)

⭐ Star this repo if you find it helpful!

</div>
