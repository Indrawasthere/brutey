import type React from "react";
import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { PageTransition } from "@/components/page-transition";
import { CustomCursor } from "@/components/custom-cursor";
import FocusMain from "@/components/focus-main";

// Medieval Serif - Display headings
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-serif",
  display: "swap",
  style: ["normal", "italic"],
});

// Clean Sans - Everything else
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Muhammad Fadlan — Software Engineer",
  description: "Ancient logic meets modern engineering. Building digital fortresses with code.",
  generator: "Next.js",
  metadataBase: new URL("https://mfadlans.xyz"),
  openGraph: {
    title: "Muhammad Fadlan — Software Engineer",
    description: "Ancient logic meets modern engineering",
    url: "https://mfadlans.xyz",
    siteName: "Muhammad Fadlan",
    images: ["/og-image.png"],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Fadlan — Software Engineer",
    description: "Ancient logic meets modern engineering",
    images: ["/og-image.png"],
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
    >
      <body className="font-sans antialiased overflow-x-hidden bg-background">
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
          <FocusMain />
          
          {/* Atmospheric overlays */}
          <div className="noise-overlay" />
          <div className="vignette-overlay" />
          
          {/* Custom cursor for enhanced interactivity */}
          <CustomCursor />
          
          <PageTransition>
            {children}
          </PageTransition>
          
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}