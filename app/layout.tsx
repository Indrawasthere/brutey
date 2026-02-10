import type React from "react";
import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { PageTransition } from "@/components/page-transition";
import { CustomCursor } from "@/components/custom-cursor";
import FocusMain from "@/components/focus-main";

/* ======================
   Fonts
====================== */

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

/* ======================
   Metadata (SEO Core)
====================== */

export const metadata: Metadata = {
  metadataBase: new URL("https://mfadlans.xyz"),

  title: {
    default: "Muhammad Fadlan — Portfolio",
    template: "%s | Muhammad Fadlan Hafiz",
  },

  description:
    "Software Engineer focused on web systems, architecture, and modern engineering. A guy who's addicted to code.",

  applicationName: "Muhammad Fadlan Portfolio",
  generator: "Next.js",

  keywords: [
    "Muhammad Fadlan",
    "Muhammad Fadlan Hafiz",
    "Muhammad Fadlan H",
    "Software Engineer",
    "Web Developer",
    "Next.js",
    "React",
    "System Architecture",
    "Software Engineer",
    "Frontend Developer",
    "Backend Developer",
    "Fullstack Developer",
    "Fullstack Engineer",
    "Portfolio",
  ],

  authors: [{ name: "Muhammad Fadlan Hafiz" }],
  creator: "Muhammad Fadlan Hafiz",
  publisher: "Muhammad Fadlan Hafiz",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: "/dacode.png",
    shortcut: "/dacode.png",
    apple: "/dacode.png",
  },

  openGraph: {
    title: "Muhammad Fadlan — Software Engineer",
    description: "A guy who's addicted to code",
    url: "https://mfadlans.xyz",
    siteName: "Muhammad Fadlan Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/dacode.png",
        width: 1500,
        height: 700,
        alt: "Muhammad Fadlan Portfolio",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Muhammad Fadlan — Software Engineer",
    description: "A guy who's addicted to code",
    images: ["/dacode.png"],
  },
};

/* ======================
   Viewport
====================== */

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

/* ======================
   Root Layout
====================== */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Resource Hints for Performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="preload" href="/models/knight-opt.glb" as="fetch" crossOrigin="anonymous" />
      </head>
      <body className="font-sans antialiased overflow-x-hidden bg-background text-foreground selection:bg-accent/30">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          forcedTheme="dark"
        >
          {/* Accessibility */}
          <FocusMain />

          {/* Atmosphere */}
          <div className="noise-overlay fixed inset-0 z-9999 pointer-events-none opacity-[0.05]" />
          <div className="vignette-overlay fixed inset-0 z-9998 pointer-events-none" />

          {/* Cursor */}
          <CustomCursor />

          {/* Content */}
          <PageTransition>
            <main id="main-content" className="relative">
              {children}
            </main>
          </PageTransition>

          {/* Analytics */}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
