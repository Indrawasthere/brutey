import type React from "react";
import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { PageTransition } from "@/components/page-transition";
import { CustomCursor } from "@/components/custom-cursor";
import FocusMain from "@/components/focus-main";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://mfadlans.xyz"),

  title: {
    default: "Muhammad Fadlan — Software Engineer",
    template: "%s | Muhammad Fadlan Hafiz",
  },

  description:
    "Software Engineer focused on web systems, architecture, and modern engineering. A guy who's addicted to code.",

  applicationName: "Muhammad Fadlan Portfolio",
  generator: "Next.js",

  keywords: [
    "Muhammad Fadlan",
    "Muhammad Fadlan Hafiz",
    "Software Engineer",
    "Web Developer",
    "Next.js",
    "React",
    "System Architecture",
    "Fullstack Engineer",
    "Portfolio",
  ],

  authors: [{ name: "Muhammad Fadlan Hafiz" }],
  creator: "Muhammad Fadlan Hafiz",
  publisher: "Muhammad Fadlan Hafiz",

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/dacodefix.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",

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

  openGraph: {
    title: "Muhammad Fadlan — Software Engineer",
    description: "A guy who's addicted to code",
    url: "https://mfadlans.xyz",
    siteName: "Muhammad Fadlan Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Muhammad Fadlan Portfolio",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Muhammad Fadlan — Software Engineer",
    description: "A guy who's addicted to code",
    images: ["/og-image.webp"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

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
      <body
        className="font-sans antialiased overflow-x-hidden bg-background text-foreground selection:bg-accent/30"
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          forcedTheme="dark"
        >
          <FocusMain />
          <CustomCursor />

          <div className="noise-overlay fixed inset-0 z-9999 pointer-events-none opacity-[0.05]" />
          <div className="vignette-overlay fixed inset-0 z-9998 pointer-events-none" />

          <PageTransition>
            <main id="main-content" className="relative overflow-x-hidden">
              {children}
            </main>
          </PageTransition>

          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
