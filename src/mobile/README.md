# Mobile Experience Architecture & Design Guide

## 1. Overview & Purpose
This directory (`src/mobile/`) contains the dedicated mobile-optimized experience for Nithin K R's portfolio. 

The desktop site features an ambitious, cinematic 3D experiential pipeline powered by Three.js and WebGL—notably:
- **Scene 03 (`SystemScene.tsx`)**: An interactive 3D masonry stone wall demolition and C4 blasting sequence.
- **Scene 06 (`ProjectsScene.tsx`)**: "The Project Express", a procedural 3D Vande Bharat trainset with pinned horizontal scroll stops.
- **Continuous Background (`DigitalWorldCanvas.tsx`)**: A continuous Three.js particle and geometric corridor.

### Why a Dedicated Mobile View?
On mobile devices (smartphones and small touchscreens with width <= 768px):
1. **Aspect Ratio Constraints**: Narrow portrait viewports (e.g., 360px–430px) clip horizontal 3D models and make spatial raycasting/clicking cumbersome.
2. **Gesture & Scroll Conflicts**: Pinned horizontal scroll animations hijack native touch momentum and swipe navigation.
3. **Hardware & Thermal Load**: Continuous WebGL rendering, instanced mesh physics, and large model assets cause high battery drain, frame drops, and memory pressure on mobile GPUs.

To preserve an ultra-fast, elegant, and native mobile experience, the portfolio adopts an **Inline View Switch**:
- Mobile devices automatically render this minimal, high-performance 2D mobile architecture.
- Desktop and tablet screens continue to render the full 3D cinematic pipeline.
- The existing desktop codebase remains 100% untouched.

---

## 2. Architectural Design: Inline View Switch

Rather than routing mobile visitors to a separate URL (like `/mobile`), which leads to URL fragmentation, link-sharing mismatches, and redirect flashes, the site implements an **inline view switch** at the root (`App.tsx`):

```tsx
// App.tsx
const isMobile = useIsMobile(768);

return (
  <>
    {isMobile ? (
      <MobilePortfolio onResumeClick={openResume} onProjectClick={openProject} />
    ) : (
      <PortfolioHome />
    )}
  </>
);
```

### Key Technical Advantages
- **Single URL Integrity**: A single URL (`nithinkr.dev` or equivalent) works everywhere. Recruiters opening the link from a phone get the lightning-fast mobile UI; opening it on a desktop renders the full 3D cinematic experience.
- **Zero WebGL Overhead on Mobile**: Because `<PortfolioHome />` is conditionally unmounted on mobile devices, Three.js canvases, shaders, and geometry are never allocated in mobile GPU memory.
- **Instant Response**: Responsive media-query listening (`window.matchMedia`) ensures seamless adaptation to orientation changes without page reloads.

---

## 3. Directory & Component Structure

```
src/mobile/
├── README.md               # This architectural guide for future developers/AIs
├── MobilePortfolio.tsx     # Mobile master orchestrator (assembles all mobile scenes)
├── MobileSkills.tsx        # Responsive 2D skill matrices (replaces 3D Wall Blast)
├── MobileProjects.tsx      # Touch-optimized project cards & carousel (replaces 3D Train)
├── MobileHero.tsx          # Lightweight touch-friendly hero section
├── useIsMobile.ts          # Resilient screen width & media query hook (breakpoint: 768px)
├── mobile.css              # Mobile-specific layout rules, touch targets, and safe-area styles
└── index.ts                # Clean barrel exports
```

---

## 4. Component Responsibilities

### `MobilePortfolio.tsx`
- Orchestrates the mobile page layout in a single smooth vertical scroll flow.
- Mounts `MobileNav` for touch-friendly drawer/hamburger navigation.
- Passes project and resume modal triggers up to shared dialogs (`ResumeModal`, `ProjectDetailModal`).

### `MobileSkills.tsx` (Replaces `SystemScene.tsx`)
- Instead of requiring users to strike or detonate a 3D wall to discover skills, categories (Frontend, Backend, Cloud/DevOps, Tools) are directly organized into modern frosted glass cards with clear icon tags.
- Direct external links to technology documentations and live proficiency highlights.

### `MobileProjects.tsx` (Replaces `ProjectsScene.tsx`)
- Eliminates horizontal scroll hijacking and heavy trainset WebGL models.
- Provides vertical card decks or smooth swipeable carousel cards with project preview images, tech tags, GitHub repository links, and interactive detail modal triggers.

### `mobile.css`
- Applies `touch-action: pan-y`, `-webkit-overflow-scrolling: touch`, and safe-area insets (`env(safe-area-inset-*)`).
- Enforces minimum 44px tap targets for mobile usability.

---

## 5. Guidelines for Future AI Assistants & Developers
1. **Never alter existing desktop cinematic files**: Do not add mobile conditionals inside `src/components/cinematic/*` or `DigitalWorldCanvas.tsx`.
2. **Keep mobile lightweight**: Do not introduce heavy Three.js or WebGL renderers inside `src/mobile/`. Use standard HTML5, Tailwind CSS, Lucide icons, and light Framer Motion animations.
3. **Shared Data Source**: Always import data from `src/data/portfolio.ts` to ensure desktop and mobile content stay synchronized.
