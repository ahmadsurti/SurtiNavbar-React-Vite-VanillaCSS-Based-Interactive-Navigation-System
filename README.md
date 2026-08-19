# SurtiNavbar-React-Vite-VanillaCSS-Based-Interactive-Navigation-System

![React](https://img.shields.io/badge/React-19.2.7-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8.1.3-646CFF?logo=vite&logoColor=white)
![Vanilla_CSS](https://img.shields.io/badge/Styling-Vanilla_CSS_3-1572B6?logo=css3&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-10.6.0-4B32C3?logo=eslint&logoColor=white)
![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)

A modular, prop-driven React floating navigation system featuring scroll-aware transitions, glassmorphism presets, interactive live configuration playground, and an accompanying high-aesthetic dark landing page. Built with zero runtime CSS frameworks or animation library overhead using pure React 19, Vite, and hardware-accelerated CSS.

---

## Overview

Created by **Ahmad Surti**, this repository packages custom signature navbar designs, micro-interactions, and visual architectures into a reusable system. It couples a customizable `Navbar` component with an embedded `NavbarPlayground` drawer that enables developers to configure navigation links, logos, CTAs, glass treatments, border radii, hover styles, and noise textures in real-time—exporting production-ready React code in one click.

The project also provides a companion dark-themed landing page showcasing advanced frontend UI techniques:
- Asymmetric 12-column Bento grids with mouse-tracking conic gradient glow borders (`GlowingEffect`).
- Viewport-aware scroll-focus quote animations gated by `IntersectionObserver` (`Testimonials`).
- Dynamic SVG path-curved handwritten notes (`Footer`).
- Morphing hamburger-to-cross navigation toggles with pure SVG stroke-dash interpolation (`MenuToggleIcon`).

---

## Features

| Module | What it does |
|--------|--------------|
| **`Navbar`** | Prop-driven floating header supporting 3 scroll behaviors (`pill-on-scroll`, `always-pill`, `static`), 3 glass filters (`subtle`, `strong`, `solid`), 3 border radii (`pill`, `rounded`, `sharp`), 3 link hover animations (`underline-grow`, `color-only`, `bg-pill`), and negative text blending (`mix-blend-mode: difference`). |
| **`NavbarPlayground`** | Fixed glassmorphism drawer allowing live customization of navigation items, reordering, CTA controls, visual presets, noise intensity sliders, and code export in three formats (`Component`, `Config`, `JSX`). |
| **`MenuToggleIcon`** | Morphing mobile navigation button using a single SVG with custom bézier paths and `stroke-dasharray` / `stroke-dashoffset` interpolation—eliminating icon asset bloat. |
| **`Hero`** | Full-viewport dark hero section with responsive typography (`Lora` serif + `Instrument Sans`), multi-stop linear vignette overlays via CSS pseudo-elements, and directional CTA hover animations. |
| **`Features`** | Asymmetric 12-column responsive Bento grid wrapping cards in a custom `GlowingEffect` border. |
| **`GlowingEffect`** | Zero-dependency, hardware-accelerated border highlight that tracks pointer coordinates via `requestAnimationFrame`, calculates trigonometric radial angles, and masks conic/radial gradients. |
| **`Testimonials`** | Interactive quote list with `IntersectionObserver` gating, quadratic distance easing on scroll, and CSS pseudo-element crosshairs around initials. |
| **`Footer`** | Brand navigation footer with responsive columns, an interactive right-aligned upward-curved handwritten SVG note (`Indie Flower` font via `<textPath>`), and an outline wordmark with a 30% viewport clipping bleed. |

---

## Prerequisites

- **Node.js**: `v18.0.0` or higher (Recommended: `v20.x` or `v22.x`)
- **npm**: `v9.0.0` or higher

Verify versions before installing:
```bash
node -v
npm -v
```

---

## Setup from scratch

### 1. Clone the repository

```bash
git clone https://github.com/ahmadsurti/SurtiNavbar-React-Vite-VanillaCSS-Based-Interactive-Navigation-System.git
cd SurtiNavbar-React-Vite-VanillaCSS-Based-Interactive-Navigation-System
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run development server

```bash
npm run dev
```
Open `http://localhost:5173` (or the terminal-assigned port) in your browser.

### 4. Code quality & linting

```bash
npm run lint
```

### 5. Build for production

```bash
npm run build
```
Production assets will compile to the `dist/` directory.

### 6. Preview production build locally

```bash
npm run preview
```

---

## How to use

### 1. Interactive Customization via the Playground

1. Start the dev server and click the **"Settings"** link located on the right side of the navigation bar.
2. In the **Navbar settings** panel:
   - **Links**: Add, edit labels/hrefs, reorder with up/down controls, or delete items.
   - **Logo**: Update logo image URL, brand text, or toggle text visibility.
   - **CTAs**: Modify secondary ("Sign in") and primary ("Deploy agent") labels, links, and visibility.
   - **Style**: Select scroll behaviors (`pill-on-scroll`, `always-pill`, `static`), glass densities, corner radii, hover effects, and fractal noise intensity.
3. Switch between **Component**, **Config**, or **JSX** export tabs in the **Export Code** section.
4. Click **Copy** to copy the generated code to your clipboard.

### 2. Direct Component Integration

Import the component into any React project:

```jsx
import Navbar from './components/Navbar';

const customNavConfig = {
  links: [
    { label: 'Products', href: '#products' },
    { label: 'Docs', href: '#docs' },
    { label: 'Pricing', href: '#pricing' }
  ],
  logo: {
    img: '/logo.png',
    text: 'MyBrand',
    showText: true
  },
  cta: {
    signin: { label: 'Log In', href: '/login', show: true },
    primary: { label: 'Get Started', href: '/signup', show: true }
  },
  scrollBehavior: 'pill-on-scroll', // 'pill-on-scroll' | 'always-pill' | 'static'
  glass: 'strong',                  // 'subtle' | 'strong' | 'solid'
  borderRadius: 'pill',             // 'pill' | 'rounded' | 'sharp'
  linkHover: 'underline-grow',      // 'underline-grow' | 'color-only' | 'bg-pill'
  negativeText: false,
  noise: 7
};

export default function App() {
  return (
    <>
      <Navbar {...customNavConfig} />
      <main>
        {/* Page Content */}
      </main>
    </>
  );
}
```

---

## Configuration reference

### `Navbar` Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `links` | `Array<{ label: string, href: string, onClick?: Function }>` | `DEFAULT_PROPS.links` | Navigation link items. `onClick` intercepts default navigation. |
| `logo` | `{ img?: string, text?: string, showText?: boolean }` | `{ img: '/logo.png', text: 'credence', showText: true }` | Logo branding options. |
| `cta` | `{ signin: { label, href, show }, primary: { label, href, show } }` | See defaults | Action buttons in header. |
| `scrollBehavior` | `'pill-on-scroll' \| 'always-pill' \| 'static'` | `'pill-on-scroll'` | Transitions between full-width and floating island on scroll. |
| `glass` | `'subtle' \| 'strong' \| 'solid'` | `'strong'` | Backdrop blur and background alpha density. |
| `borderRadius` | `'pill' \| 'rounded' \| 'sharp'` | `'pill'` | Container and button corner curvature. |
| `linkHover` | `'underline-grow' \| 'color-only' \| 'bg-pill'` | `'underline-grow'` | Hover micro-interaction variant for links. |
| `negativeText` | `boolean` | `false` | Applies `mix-blend-mode: difference` for high-contrast inverted blending over light/dark content. |
| `noise` | `number` (0–30) | `7` | Opacity percentage of the embedded fractal noise SVG overlay. |

---

## Project structure

```
.
├── public/                     # Static assets served at root
│   ├── hero-bg.webp            # Background visual for Hero
│   └── logo.png                # Brand logo graphic
├── src/
│   ├── components/
│   │   ├── Features.css        # 12-column bento grid & glow mask styles
│   │   ├── Features.jsx        # Feature cards container
│   │   ├── Footer.css          # Footer layout, wordmark bleed & easter egg styles
│   │   ├── Footer.jsx          # Footer component with curved SVG easter egg
│   │   ├── GlowingEffect.jsx   # Hardware-accelerated mouse-following glow border
│   │   ├── Hero.css            # Layout, fluid typography & vignette styles
│   │   ├── Hero.jsx            # Hero component with CTA button
│   │   ├── MenuToggleIcon.jsx  # SVG stroke-dash morphing hamburger icon
│   │   ├── Navbar.css          # Floating pill navbar tokens & responsive styles
│   │   ├── Navbar.jsx          # Configurable Navbar component
│   │   ├── NavbarPlayground.css# Settings drawer styles & code export UI
│   │   ├── NavbarPlayground.jsx# Interactive live playground & code generator
│   │   ├── Testimonials.css    # Testimonials layout & crosshair lines
│   │   └── Testimonials.jsx    # Scroll-distance eased quote spotlight
│   ├── App.jsx                 # Main application layout assembly
│   ├── index.css               # OKLCH design tokens, reset & custom scrollbars
│   └── main.jsx                # Application root entry point
├── eslint.config.js            # ESLint flat configuration
├── index.html                  # HTML template with unified Google Fonts query
├── package.json                # Project dependencies and npm scripts
└── vite.config.js              # Vite bundler configuration
```

---

## Deployment

The application is a pure Client-Side SPA (Single Page Application) requiring no Node.js backend runtime in production. It can be deployed to any static host.

### Vercel / Netlify / Cloudflare Pages

1. **Build Command**: `npm run build`
2. **Output Directory**: `dist`
3. **Node Version**: `18.x` or `20.x`

---

## Troubleshooting

| Problem | Root Cause | Fix |
|---------|------------|-----|
| Mobile menu toggle is covered when menu opens | CSS Stacking Context trap caused by parent `backdrop-filter` or lower z-index | Ensure `#main-nav` has `z-index: 70` and `#mobile-menu-btn` has `z-index: 85`, exceeding `.mobile-menu` (`z-index: 60`). |
| Custom logo or CTA object drops default fields | Shallow object merge in component props | Use safe destructuring with deep object fallbacks (`{ ...DEFAULT_PROPS.logo, ...props.logo }`). |
| `GlowingEffect` border does not update coordinates on mobile | Event handlers expecting non-standard `e.x` instead of `e.clientX` | Use standard `e.clientX` and `e.clientY` with fallback to cached position coordinates. |
| Testimonials animation causing lag on page scroll | Unthrottled `getBoundingClientRect` calls executing while section is off-screen | Wrap scroll listener updates in an `IntersectionObserver` checking section visibility. |

---

## What I learned from building this

1. **CSS Stacking Contexts and Stacking Isolation**: Combining `backdrop-filter`, `transform`, and `position: fixed` creates local stacking contexts and containing blocks. Building a full-screen mobile menu overlay within a floating header requires explicitly unsetting `backdrop-filter` and overflow clipping on `#main-nav` while the menu is open, ensuring fixed children map to the viewport correctly across Safari and Chromium engines.
2. **Zero-Dependency Mouse-Following Borders**: Rather than bundling heavy animation libraries (e.g. Framer Motion or GSAP) for simple pointer-following gradients, CSS custom properties (`--start`, `--active`) combined with a single `requestAnimationFrame` lerp loop and CSS `-webkit-mask-composite: destination-in` / `intersect` achieve 60fps performance with under 100 lines of JavaScript.
3. **Single-SVG Morphing Primitives**: Path morphing between standard 3-line hamburgers and 'X' close icons can be executed in pure SVG/CSS using `stroke-dasharray` and `stroke-dashoffset` along a continuous path (`M27 10 ... L7 22`) and a `-45deg` rotation, avoiding duplicate DOM icon elements and layout shifts.
4. **Scroll Performance Optimization**: Continuously computing layout bounds via `getBoundingClientRect()` on window scroll degrades main-thread responsiveness. Gating window scroll handlers with an `IntersectionObserver` ensures heavy viewport mathematics only execute when components are actually visible to the user.
5. **Asset Network Consolidation**: Combining multiple Google Font requests (`Instrument Sans`, `JetBrains Mono`, `Lora`, `Indie Flower`) into a single query string eliminates redundant TLS handshakes and font-swap delays.

---

## License

This project is licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file for details.
