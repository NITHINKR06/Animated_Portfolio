# Theme Migration Plan: Black, Cream, White, Red

## Overview
Migrate the Animated 3D Portfolio from the purple/pink cyberpunk theme to a black-cream-white-red theme.

## Color Mapping

### Old Theme (Purple/Pink):
- Primary: Purple-400, Pink-400, Purple-600
- Background: #0a0118, dark backgrounds
- Surface: bg-white/5, border-purple-500/30
- Text: gray-300, white, purple-

### New Theme (Black/Cream/White/Red):
- Primary: --theme-accent (#ff0000), --theme-accent-light (#ff3333), --theme-accent-glow
- Background: var(--gradient-dark), var(--theme-bg-primary)
- Surface: var(--theme-surface), var(--theme-border)
- Text: var(--theme-text-primary), var(--theme-text-red), var(--color-cream)

## Component Migration Tasks

### 1. Typography System
- Montenegrin Gothic One font (already done)
- Update text color classes throughout components

### 2. Backgrounds & Surfaces
- Update body background to gradient
- Update glass cards to use cream/red theme
- Update modal backgrounds

### 3. Text Colors
- Update headings, descriptions, labels
- Update button text colors
- Update icon colors

### 4. Borders & Overlays
- Update borders to use red theme
- Update scanlines to use white theme
- Update gradients

## Specific Components to Update

### /src/components/Hero.tsx
- Name text gradient (currently purple, change to red/cream)
- Title color (currently purple-300, change to red)
- Description color (currently gray-300, change to red-muted)
- CTA button icons (currently purple-400/pink-400/blue-400, change to cream/red)
- Social icon colors (currently white, keep white or change to cream)

### /src/components/Services.tsx  
- Purple/pink gradients in service cards, tech stack filters, nav
- Replace with red/cream gradients
- Update text colors accordingly

### /src/components/Sidebar.tsx
- Purple-500 active state
- Change to red theme

### /src/components/About.tsx
- Purple/pink gradient backgrounds
- Replace with red theme

### /src/components/Skills.tsx
- Category tabs with purple/pink colors
- Change to red/cream theme

### src/components/ThreeDBackground.tsx
- Update Three.js colors to red theme
- Adjust geometry colors

## Additional Updates

### Global Variables (/src/index.css)
- Update :root variables
- Add theme design tokens
- Create new color system

### Visual Effects
- Update shadow colors to match new theme
- Update gradients in component styles
- Update scanlines to use white instead of black

## Migration Strategy

1. Update global theme system first
2. Update component styles in src/index.css
3. Migrate individual components starting with Hero (most visible)
4. Continue with Services, Sidebar, About, Skills
5. Update modals and overlays
6. Finalize with three.js and effects

## Testing
- Visual review after each major component migration
- Verify color contrast and accessibility
- Test hover/active states
- Check responsive design compliance