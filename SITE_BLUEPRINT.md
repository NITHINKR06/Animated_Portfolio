# Animated Portfolio Site Blueprint

This document describes the current site as if you were walking through the codebase directly. It covers how the portfolio looks, how the black/cream/white/red theme is applied, how the routes and components are structured, where the content lives, and which files to edit when changing the site.

## 1. Visual Identity

The portfolio is an animated, 3D-heavy personal site for **Nithin K R**. The current visual direction is:

- **Primary mood:** dark cinematic portfolio with glass panels, red accents, cream highlights, and subtle 3D depth.
- **Allowed main colors:** black, white, red, cream/off-white.
- **Avoided colors:** purple, blue, cyan, green, orange, yellow, and other colorful UI accents are normalized through global CSS overrides.
- **Background style:** black/dark charcoal gradient with a fixed Three.js wireframe object behind the page.
- **UI surface style:** translucent glass cards, thin cream borders, red glow on hover/active states.
- **Text style:** mostly white and cream text, muted cream/gray supporting text, red for labels, active states, status dots, and emphasis.
- **Motion style:** smooth section reveals, hover/tap animation, rotating 3D background, orbiting hero icons, and interactive 3D project/skills views.

The site should feel futuristic and technical, but the theme is intentionally restrained. Red is the accent, cream is the premium highlight, black is the stage, and white is the main readable text.

## 2. Theme System

The central stylesheet is:

```txt
src/global.css
```

This file replaced the older `src/index.css`. The React entry now imports:

```ts
import './global.css';
```

### Core Theme Tokens

The main theme is controlled from `:root` in `src/global.css`:

```css
--theme-accent: #ff0000;
--theme-accent-light: #ff3b3b;
--theme-bg-gradient-start: #050405;
--theme-bg-gradient-end: #0d0c0c;
--theme-surface: rgba(10, 9, 9, 0.78);
--theme-surface-strong: rgba(17, 14, 14, 0.88);
--theme-surface-solid: #fff8f0;
--theme-border: rgba(246, 239, 230, 0.12);
--theme-border-strong: rgba(255, 0, 0, 0.22);
--theme-text-primary: #fcfbf8;
--theme-text-muted: #d9cfc5;
--theme-text-red: #ffb3b3;
--theme-text-cream: #f6efe6;
--color-cream: #f6efe6;
--color-ink: #050405;
```

### Global Utility Classes

Important reusable classes:

- `.glass-card`: translucent dark glass card with cream border.
- `.nkr06-glass`: lighter glass layer used for subtle panels.
- `.theme-shell`: full-page black/cream theme shell.
- `.theme-section`: themed section background with a soft cream radial glow.
- `.theme-panel`: dark glass panel with blur and cream border.
- `.theme-accent-panel`: red/cream accent panel.
- `.text-gradient`: red-to-cream gradient text.
- `.neon-gradient`: red gradient background.
- `.theme-muted`: muted cream text.
- `.theme-heading`: primary white/cream heading text.

### Color Locking

`src/global.css` includes broad override selectors that force old Tailwind color classes into the new palette. For example:

- `text-purple-*`, `text-blue-*`, `text-green-*`, etc. become red.
- `text-gray-*` and `text-slate-*` become muted cream.
- `bg-purple-*`, `bg-blue-*`, etc. become low-opacity cream panels.
- colored border and gradient classes are mapped back to red/cream.

This exists so older component classes do not leak purple/blue/green into the site. The long-term clean version would still be to replace old classes directly, but the global CSS keeps the theme consistent from one place.

### Typography

The body uses:

```css
font-family: 'Montenegrin Gothic One', serif;
```

The font is declared in `src/global.css` using local `/fonts/montenegrin-gothic-one.*` URLs. Tailwind also defines `font-heading` and `font-body` in `tailwind.config.js`.

## 3. Overall Site Layout

The main application file is:

```txt
src/App.tsx
```

The portfolio has three routes:

- `/`: main one-page portfolio.
- `/resume`: same portfolio page with the resume modal open.
- `/services`: separate freelance services landing page.

The home page is composed in this order:

1. `ThreeDBackground`
2. `Sidebar`
3. `MobileNav`
4. mobile Services floating button
5. `Hero`
6. `About`
7. `Skills`
8. `Experience`
9. `Education`
10. `Projects`
11. `Certification`
12. `Contact`
13. footer
14. `ResumeModal`
15. `ProjectDetailModal`

The 3D background is fixed at `z-index: 0`, and content sits above it using `relative z-10`.

## 4. Startup And Routing Behavior

`App.tsx` controls the loading screen and route rendering.

- On first visit, `LoadingScreen` displays.
- When loading completes, a `portfolioToken` is saved in `localStorage`.
- On future visits, if `portfolioToken` exists, the loading screen is skipped.
- `useLenis()` enables smooth scrolling.
- `document.documentElement.style.scrollBehavior` is set to `smooth` while the app is mounted.

Important lazy-loaded components:

- `ThreeDBackground`
- `ResumeModal`
- `ProjectDetailModal`

These are loaded with `React.lazy` and `Suspense` to reduce initial work.

## 5. Main 3D Background

File:

```txt
src/components/ThreeDBackground.tsx
```

This is the full-screen animated background behind the main portfolio.

Visual behavior:

- Renders a `TorusKnotGeometry`.
- Uses a cream wireframe material.
- Uses black scene background.
- Adds a subtle grid helper below the object.
- Responds to mouse position by gently moving the camera and rotating the object.
- Stops animation when the tab is hidden or the element is not visible.
- Cleans up Three.js geometry, material, renderer, listeners, and Anime.js animations on unmount.

Current palette in the Three.js scene:

- Scene background: `0x050405`
- Main object material: `0xf6efe6`
- Ambient and directional lights: cream
- Very subtle red accent light: `0xff0000`
- Grid: dark black/cream tones

This means the 3D model should look mostly black and cream, not heavily red.

## 6. Navigation

### Desktop Sidebar

File:

```txt
src/components/Sidebar.tsx
```

The sidebar is a fixed desktop navigation rail. It links to:

- Home
- About
- Skills
- Experience
- Education
- Projects
- Certification
- Services

It tracks active sections and uses red/cream/white hover and active states.

### Mobile Navigation

File:

```txt
src/components/MobileNav.tsx
```

The mobile nav is a bottom navigation bar with dark translucent styling. It gives quick access to the main page sections.

### Mobile Services Button

Defined in:

```txt
src/App.tsx
```

On mobile, a floating Services button appears in the top-right corner. It uses a red active state when on `/services`.

## 7. Hero Section

File:

```txt
src/components/Hero.tsx
```

The hero is the first full-screen section.

Layout:

- Left side: intro text, name, title, bio, CTA buttons, social icons.
- Right side desktop: circular profile image with three rotating orbit rings.
- Right side mobile: simpler circular profile image without desktop orbits.
- Bottom center: bouncing scroll-down button.

Content comes from:

```txt
src/data/portfolio.ts
```

The hero uses:

- `personal.name`
- `personal.title`
- `personal.bio`
- `personal.email`
- `personal.github`
- `personal.linkedin`

### Hero Orbit Icons

Desktop hero has rotating tech icons around the profile image:

- React
- TypeScript
- Node.js
- Python
- Docker
- Three.js
- MongoDB
- Kali
- Postgres

Some orbit icons are clickable. They map to project IDs through `iconProjectMap`. Clicking an icon scrolls to the Projects section and opens the related project modal.

## 8. About Section

File:

```txt
src/components/About.tsx
```

The About section is a bento-style grid with glass cards.

Cards include:

- Big bio card: “Builder · Hacker · Creator”
- Location and availability
- Stats counters
- Currently card
- Daily Stack logo grid

The section uses custom animation hooks:

- `useClipReveal`
- `useCounter`
- `useSpringGrid`

The card wrapper accepts tones:

- `accent`
- `cream`
- `neutral`
- `dark`

These tones only affect hover glow and border feeling; the overall palette remains black/red/cream.

## 9. Skills Section

File:

```txt
src/components/Skills.tsx
```

The Skills section has two render modes.

### Desktop With WebGL

Desktop users with WebGL see:

```txt
src/components/ThreeDSkillsTree.tsx
```

This renders a 3D tree using:

```txt
public/3d/Skeletal_Tree_FREE.obj
```

Skills are attached as fruit-like badges around hardcoded branch positions. The tree is lit with cream lights and uses black/cream/red UI panels around it.

### Mobile Or No WebGL

Mobile users, smaller screens, or browsers without WebGL see a responsive skill card grid instead.

### Skill Data

Skill categories and logos live in:

```txt
src/data/portfolio.ts
```

Current categories include:

- Frontend
- Backend
- DevOps
- CyberSecurity

The data still contains original technology colors, but the visible UI is normalized by the components and global theme.

## 10. Experience Section

File:

```txt
src/components/Experience.tsx
```

This section displays experience/history content in animated dark cards. It follows the main theme with red labels, muted cream text, and glass panels.

Data source:

```txt
src/data/portfolio.ts
```

## 11. Education Section

File:

```txt
src/components/Education.tsx
```

This section shows educational entries with themed cards, red accents, and cream text.

Data source:

```txt
src/data/portfolio.ts
```

## 12. Projects Section

File:

```txt
src/components/Projects.tsx
```

The Projects section is an interactive 3D card deck.

Interactions:

- Drag/swipe active card left or right.
- Use left/right arrow keys when the Projects section is visible.
- Click inactive side cards to bring them forward.
- Click the eye/detail button to open `ProjectDetailModal`.
- External/source buttons link to live/demo/code URLs when available.

Visual structure:

- Perspective container using CSS 3D transforms.
- Active project card in the center.
- Nearby projects rotated and pushed back in 3D space.
- Red grid/glow overlays.
- Project image/thumbnail behind dark gradients when available.

Project data comes from:

```txt
src/data/portfolio.ts
```

Important project fields include:

- `id`
- `title`
- `description`
- `technologies`
- `github`
- `live`
- `status`
- `details`
- optional image/thumbnail/screenshot fields

## 13. Project Detail Modal

Main file:

```txt
src/components/ProjectDetailModal.tsx
```

Subcomponents:

```txt
src/components/project-modal/
```

The project modal is styled like a compact VS Code/editor window.

Tabs:

- `README.md`: rendered markdown project details.
- `stack.json`: stack/technology view.
- `links.ts`: project links view.

Supporting files:

- `ModalTitleBar.tsx`
- `ModalActivityBar.tsx`
- `ModalTabBar.tsx`
- `ModalBreadcrumb.tsx`
- `ModalStatusBar.tsx`
- `ReadmeTab.tsx`
- `StackTab.tsx`
- `LinksTab.tsx`
- `LineNumbers.tsx`
- `constants.ts`

Behavior:

- Escape closes the modal.
- Clicking the backdrop closes it.
- Body and html scrolling are locked while open.
- Breadcrumb path types itself out like `~/projects/{project.id}/`.
- Markdown is rendered using `react-markdown` and `remark-gfm`.

Note: the modal intentionally keeps a VS Code-inspired dark editor look. Some syntax colors may appear in the modal constants because they mimic code highlighting.

## 14. Certifications Section

File:

```txt
src/components/Certification.tsx
```

This section displays certification/achievement cards.

Behavior:

- Certifications are sorted by date.
- Competition-related items are separated from other certifications.
- Clicking a card opens a modal with image/details/skills.

Assets live under:

```txt
public/certificate/
```

Data source:

```txt
src/data/portfolio.ts
```

## 15. Contact Section

File:

```txt
src/components/Contact.tsx
```

The Contact section uses theme panels for contact methods.

Cards include:

- Email
- GitHub
- Instagram
- Location

It also uses a red availability/status dot and red/cream hover states.

## 16. Resume Modal

File:

```txt
src/components/ResumeModal.tsx
```

The resume modal opens when:

- User clicks “View Resume” in the hero.
- User visits `/resume`.

It displays:

```txt
public/NithinKR.pdf
```

The modal includes buttons to download/open the resume.

## 17. Services Page

File:

```txt
src/components/Services.tsx
```

Route:

```txt
/services
```

This is a separate freelance services landing page, not just a section inside the portfolio.

Sections:

- Services hero
- Stats cards
- Service/pricing cards
- Tech stack filter section
- Process timeline
- Testimonials carousel
- FAQ accordion
- CTA section
- Back-to-top button
- Footer

Services currently listed:

- Frontend Development
- Full Stack Development
- Cyber Security Audit
- UI / UX Design
- Mobile App Development
- Performance & SEO

The page uses many animation helpers:

- `useBlurReveal`
- `useClipReveal`
- `useCounter`
- `useDrawLine`
- `useFadeSlide`
- `useLetterReveal`
- `useMagnetic`
- `useSpringGrid`
- `useTypewriter`

Visual style:

- Still black/cream/red.
- More landing-page-like than the main portfolio.
- Has floating mesh background shapes and animated gradient borders.
- Pricing is displayed in INR.

## 18. Loading Screen

File:

```txt
src/components/LoadingScreen.tsx
```

The loading screen is black/red themed with animated particles/rings. It appears only when the `portfolioToken` is missing from `localStorage`.

## 19. Page Transition And Reveal Helpers

Files:

```txt
src/components/PageTransition.tsx
src/components/SectionReveal.tsx
```

These provide reusable reveal and transition wrappers using Framer Motion.

Animation hooks live in:

```txt
src/hooks/animations/
```

Available hooks:

- `useBlurReveal`
- `useClipReveal`
- `useCounter`
- `useDrawLine`
- `useFadeSlide`
- `useLetterReveal`
- `useMagnetic`
- `useParallax`
- `useSpringGrid`

Other hooks:

- `src/hooks/useLenis.ts`: smooth scrolling.
- `src/hooks/useTypewriter.ts`: typewriter text cycling.

## 20. Data Layer

The main content file is:

```txt
src/data/portfolio.ts
```

This file controls most user-facing content:

- personal profile info
- skills
- projects
- experience
- education
- certifications

Type definitions live in:

```txt
src/data/types.ts
```

Metadata lives in:

```txt
src/data/meta.ts
```

Exports are collected in:

```txt
src/data/index.ts
```

If you want to change names, project descriptions, skills, certificate links, education entries, or social links, start with `src/data/portfolio.ts`.

## 21. Assets

Important public assets:

```txt
public/NITHINKR06.webp
public/NithinKR.pdf
public/favicon.svg
public/robots.txt
public/images/og-portfolio-cover.png
public/images/nmamit.webp
public/images/dip_ujire.webp
public/3d/Skeletal_Tree_FREE.obj
public/3d/Skeletal_Tree_FREE.fbx
public/logos/
public/certificate/
public/projects/
public/resume's/
```

Usage examples:

- Hero profile image uses `/NITHINKR06.webp`.
- Resume modal uses `/NithinKR.pdf`.
- 3D skills tree uses `/3d/Skeletal_Tree_FREE.obj`.
- Tech logos are mostly in `/logos/`.
- Certification cards use `/certificate/`.
- Project thumbnails/screenshots use `/projects/`.

## 22. Codebase Structure

High-level structure:

```txt
Animated_Portfolio/
├── public/
│   ├── 3d/
│   ├── certificate/
│   ├── images/
│   ├── logos/
│   ├── projects/
│   ├── resume's/
│   ├── NITHINKR06.webp
│   └── NithinKR.pdf
├── scripts/
│   └── checkOgImage.ts
├── src/
│   ├── components/
│   │   ├── project-modal/
│   │   ├── __tests__/
│   │   ├── About.tsx
│   │   ├── Certification.tsx
│   │   ├── Contact.tsx
│   │   ├── Education.tsx
│   │   ├── Experience.tsx
│   │   ├── Hero.tsx
│   │   ├── LoadingScreen.tsx
│   │   ├── MobileNav.tsx
│   │   ├── Projects.tsx
│   │   ├── ResumeModal.tsx
│   │   ├── Services.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Skills.tsx
│   │   ├── ThreeDBackground.tsx
│   │   ├── ThreeDSkillsTree.tsx
│   │   └── ThemeProvider.tsx
│   ├── data/
│   ├── hooks/
│   ├── lib/
│   ├── App.tsx
│   ├── global.css
│   └── main.tsx
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── theme-migration-plan.md
```

## 23. Main Dependencies

This is a Vite + React + TypeScript app.

Important runtime libraries:

- `react`
- `react-dom`
- `react-router-dom`
- `framer-motion`
- `three`
- `animejs`
- `lenis`
- `lucide-react`
- `react-markdown`
- `remark-gfm`
- `tailwind-merge`
- `clsx`

Important dev tools:

- `vite`
- `typescript`
- `tailwindcss`
- `eslint`
- `vitest`
- `@testing-library/react`

## 24. Scripts

From `package.json`:

```txt
npm run dev        # start Vite dev server
npm run build      # production build
npm run lint       # lint code
npm run preview    # preview built site
npm run test       # run Vitest tests
npm run test:watch # run tests in watch mode
npm run test:ui    # run Vitest UI
npm run check:og   # check Open Graph image script
```

## 25. How To Edit The Site Safely

### Change Theme Colors

Edit:

```txt
src/global.css
```

Start with the `:root` variables. Do not hunt through every component unless a specific hardcoded color is still visually wrong.

Best variables to tune:

- `--theme-accent`
- `--theme-accent-light`
- `--theme-bg-gradient-start`
- `--theme-bg-gradient-end`
- `--theme-surface`
- `--theme-border`
- `--theme-text-primary`
- `--theme-text-muted`
- `--theme-text-cream`

### Change Main Page Order

Edit:

```txt
src/App.tsx
```

The `PortfolioHome` component defines the order of the home page sections.

### Change Text/Projects/Skills/Certificates

Edit:

```txt
src/data/portfolio.ts
```

This is the central content file.

### Change Hero Look

Edit:

```txt
src/components/Hero.tsx
```

This controls:

- intro text layout
- CTA buttons
- social icons
- profile image
- orbit rings
- orbit icon to project mapping

### Change Background 3D Model Look

Edit:

```txt
src/components/ThreeDBackground.tsx
```

Tune:

- scene background
- lights
- material color
- material opacity
- geometry
- camera distance
- grid helper colors

### Change Skills 3D Tree

Edit:

```txt
src/components/ThreeDSkillsTree.tsx
```

Tune:

- OBJ asset path
- lighting
- branch positions
- skill badge geometry/materials
- fullscreen and zoom behavior

### Change Services Page

Edit:

```txt
src/components/Services.tsx
```

Services data, pricing, process steps, tech stack, testimonials, and FAQ are currently defined inside this component.

## 26. Known Build Notes

At the time this document was written, build and lint had been verified after the theme work.

Known build warning:

- Font assets referenced in `src/global.css` may be reported as unresolved during build and left for runtime resolution if the actual `/fonts/` files are not present.
- The Three.js bundle can produce a large chunk warning because 3D code is naturally heavy.

These warnings do not necessarily mean the build failed, but the font warning means the custom font should be added to `public/fonts/` if exact typography is required in production.

## 27. Current Theme Rule Of Thumb

If a section feels visually wrong, check it in this order:

1. `src/global.css` theme variables and override selectors.
2. The section component for hardcoded Tailwind colors like `bg-slate-*`, `text-purple-*`, or direct hex values.
3. Any Three.js material/light colors if the problem is inside a canvas.
4. Data-driven colors in `src/data/portfolio.ts` if a skill/project logo or badge is using its original tech color.

The preferred direction is always:

- black background
- cream/white readable text
- red for action/emphasis
- cream for premium highlights
- no purple/blue/green/orange UI accents

