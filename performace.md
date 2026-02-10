# PERFORMANCE OPTIMIZATION - CRITICAL FIXES
**Current Score: 48 → Target: 85+**

## PHASE 1: IMMEDIATE WINS (Do in next 2 hours)

### 1. OPTIMIZE IMAGES (Est. +15 points)

**Problem:** 272 KiB image savings available, using native `<img>` tags

**Fix components/about.tsx:**
```tsx
// BEFORE (BAD):
<img
  src="/avatar.png"
  alt="Muhammad Fadlan"
  loading="lazy"
  className="w-full h-full object-cover opacity-80"
/>

// AFTER (GOOD):
import Image from 'next/image';

<Image
  src="/avatar.png"
  alt="Muhammad Fadlan"
  width={600}
  height={800}
  quality={75}
  priority={false}
  placeholder="blur"
  blurDataURL="data:image/svg+xml;base64,..." // Add blur placeholder
  className="w-full h-full object-cover opacity-80"
  sizes="(max-width: 768px) 100vw, 600px"
/>
```

**Generate blur placeholder:**
```bash
npm install plaiceholder sharp
```

```tsx
// scripts/generate-placeholders.ts
import { getPlaiceholder } from 'plaiceholder';
import fs from 'fs';

const getBase64 = async (imagePath: string) => {
  const file = fs.readFileSync(`./public${imagePath}`);
  const { base64 } = await getPlaiceholder(file);
  return base64;
};

getBase64('/avatar.png').then(console.log);
```

---

### 2. DISABLE HEAVY FEATURES ON MOBILE (Est. +20 points)

**Problem:** Lenis smooth scroll + Custom cursor killing mobile performance

**Fix components/smooth-scroll.tsx:**
```tsx
"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

export function SmoothScroll({ children }: { children: ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        window.innerWidth < 1024 || // Tablet & mobile
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0
      );
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Disable smooth scroll di mobile/tablet
  if (isMobile) {
    return <>{children}</>;
  }

  return (
    <ReactLenis 
      root 
      options={{ 
        lerp: 0.08, 
        duration: 1, 
        smoothWheel: true,
        smoothTouch: false, // CRITICAL: disable touch
        touchMultiplier: 0, // No smooth scroll on touch
      }}
    >
      {children}
    </ReactLenis>
  );
}
```

**Fix components/custom-cursor.tsx:**
```tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CustomCursor() {
  const [isMobile, setIsMobile] = useState(true);
  
  useEffect(() => {
    // Only show cursor on desktop with pointer device
    const hasPointer = window.matchMedia('(pointer: fine)').matches;
    const isDesktop = window.innerWidth >= 1024;
    setIsMobile(!(hasPointer && isDesktop));
  }, []);

  // Don't render di mobile/tablet
  if (isMobile) return null;

  // ... rest of cursor code
}
```

---

### 3. LAZY LOAD 3D MODEL (Est. +25 points)

**Problem:** Knight model blocking initial render, loading immediately

**Fix components/hero.tsx:**
```tsx
"use client";

import { useRef, Suspense, useState, useEffect, lazy } from "react";
import dynamic from 'next/dynamic';

// Lazy load 3D components
const Canvas = dynamic(() => import('@react-three/fiber').then(mod => ({ default: mod.Canvas })), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-background" />
});

const Knight3DLazy = dynamic(() => import('./Knight3DOptimized'), {
  ssr: false,
  loading: () => null
});

export function Hero() {
  const [load3D, setLoad3D] = useState(false);
  
  useEffect(() => {
    // Delay 3D load until after hero text renders
    const timer = setTimeout(() => {
      setLoad3D(true);
    }, 500); // Load after initial paint
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section ref={containerRef} className="...">
      {/* Typography renders immediately */}
      <motion.div>...</motion.div>
      
      {/* 3D loads later */}
      {load3D && (
        <motion.div style={{ y: yParallax }} className="absolute inset-0 z-10">
          <Canvas>
            <Knight3DLazy scrollProgress={smoothProgress} isMobile={isMobile} />
          </Canvas>
        </motion.div>
      )}
    </section>
  );
}
```

**Create components/Knight3DOptimized.tsx:**
```tsx
"use client";

import { useRef, Suspense } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment, Preload } from "@react-three/drei";
import { KnightKTP } from "./KnightKTP";

export default function Knight3DOptimized({ scrollProgress, isMobile }: any) {
  const modelRef = useRef<any>(null);
  const isVisible = useRef(true);

  // Pause animation when not visible
  useFrame((state) => {
    if (!modelRef.current || !isVisible.current) return;
    
    const t = state.clock.getElapsedTime();
    modelRef.current.position.y = positionY.get() + Math.sin(t * 0.5) * 0.05;
    modelRef.current.rotation.y = rotationY.get();
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[0, 5, 5]} intensity={isMobile ? 1.2 : 1.5} />
      <Suspense fallback={null}>
        <group ref={modelRef}>
          <KnightKTP 
            showFullBody={false} 
            animation="Idle" 
            scale={isMobile ? 2 : 2.5} 
          />
        </group>
      </Suspense>
      <Environment preset="studio" />
      <Preload all />
    </>
  );
}
```

---

### 4. CODE SPLITTING - LAZY LOAD SECTIONS (Est. +15 points)

**Problem:** Semua components load di initial bundle

**Fix app/page.tsx:**
```tsx
import dynamic from 'next/dynamic';
import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { LoadingScreen } from "@/components/loading-screen";
import { SmoothScroll } from "@/components/smooth-scroll";

// Lazy load non-critical sections
const About = dynamic(() => import('@/components/about').then(m => ({ default: m.About })), {
  loading: () => <div className="h-screen bg-background" />
});

const Experience = dynamic(() => import('@/components/experience').then(m => ({ default: m.Experience })), {
  loading: () => <div className="h-screen bg-background" />
});

const TechMarquee = dynamic(() => import('@/components/tech-marquee').then(m => ({ default: m.TechMarquee })));

const Works = dynamic(() => import('@/components/works').then(m => ({ default: m.Works })));

const Resume = dynamic(() => import('@/components/resume').then(m => ({ default: m.Resume })));

const Contact = dynamic(() => import('@/components/contact').then(m => ({ default: m.Contact })));

const Footer = dynamic(() => import('@/components/footer').then(m => ({ default: m.Footer })));

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <SmoothScroll>
        <Navbar />
        <main className="bg-black min-h-screen no-scrollbar">
          <Hero />
          <About />
          <Experience />
          <TechMarquee />
          <Works />
          <Resume />
          <Contact />
          <Footer />
        </main>
      </SmoothScroll>
    </>
  );
}
```

---

### 5. OPTIMIZE 3D MODEL FILE (Est. +10 points)

**Problem:** knight-opt.glb probably still large

**Run compression:**
```bash
# Install gltf-pipeline
npm install -g gltf-pipeline

# Compress model
gltf-pipeline -i public/models/knight-opt.glb -o public/models/knight-compressed.glb -d
```

**Use Draco compression:**
```tsx
// Install draco decoder
npm install three-stdlib

// Update components/KnightKTP.tsx
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

useGLTF.setDRACOLoader(
  new DRACOLoader().setDecoderPath('/draco/')
);
```

---

### 6. REDUCE UNUSED JAVASCRIPT (Est. +20 points)

**Problem:** 980 KiB unused JS

**Fix: Tree-shake Lucide icons**
```tsx
// BEFORE (BAD):
import { Github, Linkedin, Instagram, ArrowUpRight } from "lucide-react";

// AFTER (GOOD):
import Github from "lucide-react/dist/esm/icons/github";
import Linkedin from "lucide-react/dist/esm/icons/linkedin";
import Instagram from "lucide-react/dist/esm/icons/instagram";
import ArrowUpRight from "lucide-react/dist/esm/icons/arrow-up-right";
```

**Apply to ALL files:**
- components/contact.tsx
- components/experience.tsx
- components/footer.tsx
- components/resume.tsx
- components/works.tsx

---

### 7. MINIFY & COMPRESS

**Add to next.config.js:**
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
  },
  
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          three: {
            test: /[\\/]node_modules[\\/]three[\\/]/,
            name: 'three',
            priority: 10,
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: -10,
          },
        },
      };
    }
    return config;
  },
};

module.exports = nextConfig;
```

---

## PHASE 2: AFTER PHASE 1 (Next session)

### 8. Add Resource Hints
```tsx
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="preload" href="/models/knight-compressed.glb" as="fetch" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### 9. Implement Service Worker
```bash
npm install next-pwa
```

### 10. Add Loading Skeletons
Replace loading states dengan proper skeletons

---

## EXPECTED RESULTS:

**Before:**
- Performance: 48
- LCP: 5.0s
- TBT: 690ms
- Bundle: 90 MB

**After Phase 1:**
- Performance: **75-85**
- LCP: **1.5-2s**
- TBT: **200-300ms**
- Bundle: **~40 MB**

**After Phase 2:**
- Performance: **85-95**
- LCP: **<1.5s**
- TBT: **<200ms**
- Bundle: **~30 MB**

---

## PRIORITY ORDER:

1. ✅ Disable smooth scroll & cursor on mobile (5 mins)
2. ✅ Lazy load 3D model (15 mins)
3. ✅ Code split sections (10 mins)
4. ✅ Optimize images with Next/Image (20 mins)
5. ✅ Tree-shake Lucide icons (10 mins)
6. ✅ Compress 3D model (5 mins)
7. ✅ Add next.config optimizations (5 mins)

**Total time: ~70 minutes**

---

## VERIFICATION:

After each fix, run:
```bash
npm run build
npm run start
# Then check Lighthouse again
```

Target metrics:
- FCP: <1s ✅
- LCP: <2.5s ✅
- TBT: <300ms ✅
- CLS: 0 ✅ (already good)

Ship it bre! 🚀
