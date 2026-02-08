import type React from "react";
import type { Metadata, Viewport } from "next";
import { Playfair_Display, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { PageTransition } from "@/components/page-transition";
import FocusMain from "@/components/focus-main";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Muhammad Fadlan | Portfolio",
  description: "A guy who's addicted to code",
  generator: "v0.app",
  metadataBase: new URL("https://mfadlans.xyz"),
  openGraph: {
    title: "Muhammad Fadlan | Portfolio",
    description: "A guy who's addicted to code",
    url: "https://mfadlans.xyz",
    siteName: "Muhammad Fadlan",
    images: ["/og-image.svg"],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Fadlan | Portfolio",
    description: "A guy who's addicted to code",
    images: ["/og-image.svg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#1a1a1a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased overflow-x-hidden">
        <ThemeProvider attribute="class" defaultTheme="system">
          <FocusMain />
          <div className="noise-overlay" />
          <PageTransition>
            {children}
          </PageTransition>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
