# MUHAMMAD FADLAN — Portfolio

A brutalist-inspired portfolio website showcasing professional experience, projects, and technical capabilities. Built with modern web technologies and featuring 3D interactive elements, smooth animations, and a distinctive dark aesthetic.

🌐 **Live Site**: [mfadlans.xyz](https://mfadlans.xyz)

## 🎯 Project Overview

This portfolio is designed as a single-page application with a brutalist design philosophy—bold typography, stark contrasts, and geometric precision. It features an interactive 3D knight model, smooth scroll animations powered by Lenis, custom cursor interactions, and comprehensive SEO optimization.

### Key Features

- **3D Interactive Hero** — Three.js knight model with scroll-based animations
- **Smooth Scroll** — Lenis-powered smooth scrolling experience
- **Custom Cursor** — Desktop-optimized interactive cursor
- **Loading Screen** — Animated entry experience
- **Page Transitions** — Framer Motion-powered transitions
- **Accessibility** — Focus management and keyboard navigation support
- **SEO Optimized** — Comprehensive metadata, Open Graph, and Twitter Card support
- **Analytics** — Vercel Analytics integration
- **Dark Theme** — Forced dark mode with noise and vignette overlays

## 🏗️ Tech Stack

### Core Framework
- **Next.js 16.1.6** — React framework with App Router
- **React 19.2.4** — UI library
- **TypeScript 5.9.3** — Type-safe development

### Styling
- **Tailwind CSS 4.1.18** — Utility-first CSS framework
- **Tailwind Animate** — Animation utilities
- **PostCSS** — CSS processing

### UI Components
- **Radix UI** — Headless accessible components (Accordion, Dialog, Dropdown, etc.)
- **Lucide React** — Icon library
- **Framer Motion 12.23.24** — Animation library
- **Embla Carousel** — Carousel/slider functionality

### 3D Graphics
- **Three.js 0.182.0** — 3D rendering
- **@react-three/fiber** — React renderer for Three.js
- **@react-three/drei** — Three.js helpers and abstractions
- **three-stdlib** — Three.js utilities

### Forms & Validation
- **React Hook Form 7.71.1** — Form state management
- **Zod 3.25.76** — Schema validation
- **@hookform/resolvers** — Form validation resolvers

### Utilities
- **Lenis 1.3.15** — Smooth scroll library
- **date-fns 4.1.0** — Date manipulation
- **clsx & tailwind-merge** — Class name utilities
- **class-variance-authority** — Component variant management

### Analytics & Deployment
- **@vercel/analytics** — Vercel Analytics
- **Vercel** — Deployment platform

## 📁 Project Structure

```
brutal-portfo/
├── app/
│   ├── layout.tsx          # Root layout with fonts, metadata, providers
│   ├── page.tsx             # Home page composition
│   └── globals.css          # Global styles & CSS variables
├── components/
│   ├── about.tsx            # About section with bio & image
│   ├── contact.tsx          # Contact section with social links
│   ├── custom-cursor.tsx    # Custom desktop cursor
│   ├── experience.tsx       # Work experience timeline
│   ├── focus-main.tsx       # Accessibility focus management
│   ├── footer.tsx           # Footer component
│   ├── hero.tsx             # 3D hero section with knight model
│   ├── KnightKTP.tsx        # 3D Knight model component
│   ├── loading-screen.tsx   # Entry animation screen
│   ├── navbar.tsx           # Navigation with time display
│   ├── page-transition.tsx  # Page transition wrapper
│   ├── resume.tsx           # Resume/CV download section
│   ├── section-blend.tsx    # Section transition effects
│   ├── smooth-scroll.tsx    # Lenis scroll wrapper
│   ├── tech-marquee.tsx     # Animated tech stack marquee
│   ├── theme-provider.tsx   # Dark theme provider
│   ├── theme-toggle.tsx     # Theme toggle (forced dark)
│   ├── works.tsx            # Featured projects showcase
│   └── ui/                  # Radix UI components (placeholder)
├── public/
│   ├── avatar.png           # Profile image
│   ├── dacode.png           # Logo/favicon
│   ├── fadlan_resume.pdf    # Resume file
│   └── models/              # 3D model assets
├── .env.local               # Environment variables
├── .gitignore               # Git ignore rules
├── components.json          # shadcn/ui config
├── next.config.mjs          # Next.js configuration
├── package.json             # Dependencies
├── postcss.config.mjs       # PostCSS configuration
├── pnpm-lock.yaml           # pnpm lock file
├── pnpm-workspace.yaml      # pnpm workspace config
└── tsconfig.json            # TypeScript configuration
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **pnpm** (recommended) or npm/yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Indrawasthere/brutal-portfo.git
cd brutal-portfo
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
```

3. Create environment file:
```bash
cp .env.local.example .env.local
```

4. Run development server:
```bash
pnpm dev
# or
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

```bash
pnpm dev      # Start development server
pnpm build    # Build for production
pnpm start    # Start production server
pnpm lint     # Run ESLint
```

## 🎨 Design System

### Color Palette
- **Primary**: Custom accent color (configurable via CSS variables)
- **Background**: `#0a0a0a` (near black)
- **Foreground**: White with various opacity levels
- **Border**: Subtle white overlays

### Typography
- **Serif**: Playfair Display (hero, headings)
- **Sans**: Inter (body, UI)
- **Technical**: Monospace fallback

### Layout Principles
- Grid-based backgrounds for texture
- Bold, uppercase typography
- Geometric separators and accents
- High contrast and negative space
- Noise and vignette overlays for atmosphere

## 📱 Sections Overview

### 1. Hero
- 3D interactive knight model with scroll-based rotation
- Bold typographic treatment
- Glass-morphism info card
- Animated scroll indicator

### 2. About
- Personal biography
- Professional journey timeline
- Current tech stack display
- Grayscale hover effect on image

### 3. Experience
- Timeline-based work history
- Three major positions showcased
- Technologies, achievements, and locations
- Interactive timeline nodes

### 4. Tech Marquee
- Animated horizontal scrolling text
- Technologies and concepts
- Hover fill effects
- Dual-direction marquee rows

### 5. Works
- Four featured projects with expandable details
- GitHub integration
- Impact metrics
- Brutalist card design

### 6. Resume
- PDF download section
- Call-to-action

### 7. Contact
- Social media links (GitHub, LinkedIn, Instagram)
- Contact information
- Availability status
- Interactive hover states

### 8. Footer
- Copyright and attribution
- Additional links

## 🔧 Configuration

### Customizing Content

**Personal Information**: Edit `app/layout.tsx` for metadata and SEO
```typescript
export const metadata: Metadata = {
  title: "Your Name — Portfolio",
  description: "Your description",
  // ... other metadata
}
```

**Experience**: Edit `components/experience.tsx`
```typescript
const experiences: Experience[] = [
  // Add your work experience
]
```

**Projects**: Edit `components/works.tsx`
```typescript
const projects: Project[] = [
  // Add your projects
]
```

**Social Links**: Edit `components/contact.tsx`
```typescript
const socialLinks = [
  // Update your social media links
]
```

### Environment Variables

Create `.env.local` in the root directory:
```env
# Add any environment-specific variables here
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## 🎭 3D Model Setup

The 3D knight model is loaded from `public/models/`. To use your own model:

1. Place your `.glb` or `.gltf` file in `public/models/`
2. Update the path in `components/KnightKTP.tsx`
3. Adjust scale, position, and animation parameters as needed

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project to Vercel
3. Configure environment variables
4. Deploy

The site will automatically deploy on every push to the main branch.

### Other Platforms

Build the static export:
```bash
pnpm build
```

The `out/` or `.next/` directory can be deployed to any static hosting service.

## 📊 Performance Optimizations

- Image optimization with Next.js Image component
- Font optimization with `next/font`
- Code splitting and lazy loading
- Preloading critical 3D assets
- CSS-in-JS with zero runtime overhead (Tailwind)
- Vercel Analytics for performance monitoring

## ♿ Accessibility

- Semantic HTML structure
- Focus management with `focus-main.tsx`
- Keyboard navigation support
- ARIA labels where appropriate
- Skip-to-content functionality
- Proper heading hierarchy

## 🔒 SEO Features

- Comprehensive metadata configuration
- Open Graph tags for social sharing
- Twitter Card support
- Structured data ready
- Sitemap generation (Next.js default)
- Robots.txt configuration

## 📄 License

This project is private and proprietary. All rights reserved © 2025 Muhammad Fadlan Hafiz.

## 🤝 Contributing

This is a personal portfolio project. However, if you find bugs or have suggestions, feel free to open an issue.

## 📬 Contact

- **Email**: Contact via website form
- **LinkedIn**: [muhammadfadlanh](https://linkedin.com/in/muhammadfadlanh)
- **GitHub**: [@Indrawasthere](https://github.com/Indrawasthere)
- **Instagram**: [@mhmdfdlaan](https://instagram.com/mhmdfdlaan)

---

**Built with precision. Designed to last.**

*"A guy who's addicted to code."*
