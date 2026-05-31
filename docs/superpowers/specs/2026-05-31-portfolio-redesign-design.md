# Portfolio Redesign: React + Material Glass

## Overview
Migrate the existing static HTML/CSS/JS portfolio to a React application with enhanced animations, lighter design, and modern architecture. Deployed via GitHub Pages.

## Tech Stack
- **Framework**: React 18 + TypeScript
- **Build**: Vite
- **Animations**: Framer Motion
- **Styling**: CSS Modules + CSS custom properties
- **Contact Backend**: EmailJS (no dedicated server)

## Design Direction: "Material Glass"
A modern fusion of Material Design principles and glass morphism aesthetics — clean, lightweight, with subtle depth and refined interactions.

### Color Palette
- Primary: `#5B5BD6` (refined indigo)
- Secondary: `#8B8BF0` (light indigo)
- Accent: `#FF6B9D` (vibrant pink)
- Surface: `rgba(255, 255, 255, 0.05)`
- Text: `#e8e8f0`
- Muted: `#8888a0`
- Background: `#0a0a1a`

### Typography
- **Headings**: `"Bricolage Grotesque"` — variable font, distinctive geometric character
- **Body**: `"DM Sans"` — clean, professional, highly readable
- **Monospace**: `"JetBrains Mono"` — developer identity

## Sections

### Hero
- Full viewport with parallax gradient background
- Typing animation for roles (Computer Engineering Student, Backend Developer, Problem Solver)
- Profile photo placeholder (initials avatar fallback)
- Social buttons (GitHub, CV, LinkedIn, Instagram) with hover effects
- Glass navbar with scroll-aware transparency

### About
- Bio text (same content, refined presentation)
- Skill badges with staggered entrance animations
- 3D rotation effect on hover for skill cards
- Glass panel container

### Projects
- Cards loaded from `projects.json` (4 current projects)
- Staggered scroll-triggered reveal
- Hover: lift + glow + shine sweep effect
- GitHub link per project

### Contact
- Full form: name, email, message
- EmailJS integration for serverless backend
- Glass card container
- Toast notification on success
- Inline validation feedback

### Footer
- Social links (GitHub, LinkedIn, Instagram)
- Copyright with dynamic year
- Scroll-to-top button with smooth scroll

## Architecture

```
portfolio/
├── public/
│   └── placeholder.jpg
├── src/
│   ├── App.tsx
│   ├── App.module.css
│   ├── main.tsx
│   ├── index.css              # Global styles + CSS variables + fonts
│   ├── data/
│   │   └── projects.json
│   └── components/
│       ├── Navbar/
│       ├── Hero/
│       ├── About/
│       ├── Projects/
│       ├── Contact/
│       ├── Footer/
│       └── ScrollToTop/
```

## Animation Strategy
- **Hero**: Fade-in staggered entrance, typing text, floating gradient
- **About**: Scroll-triggered slide-up with staggered delays per skill
- **Projects**: Scroll reveal + card hover lift + border glow
- **Contact**: Fade-in on scroll, input focus animations, success confetti (simple CSS)
- **Navbar**: Backdrop blur changes on scroll, smooth link hover

No external animation library beyond Framer Motion. CSS-only solutions preferred for micro-interactions.

## Performance Targets
- Lighthouse: 90+ Performance, 90+ Accessibility
- Bundle: < 200KB gzipped
- No render-blocking external resources
