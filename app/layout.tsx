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
  variable: "--font-serif",
  display: "swap",
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Muhammad Fadlan — Software Engineer",
  description:
    "Ancient logic meets modern engineering. Building digital fortresses with code.",
  generator: "Next.js",
  metadataBase: new URL("https://mfadlans.xyz"),
  openGraph: {
    title: "Muhammad Fadlan — Software Engineer",
    description: "Ancient logic meets modern engineering",
    url: "https://mfadlans.xyz",
    siteName: "Muhammad Fadlan",
    images: ["/dacode.png"],
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
      suppressHydrationWarning
    >
      <body className="font-sans antialiased overflow-x-hidden bg-background text-foreground selection:bg-accent/30">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          forcedTheme="dark"
        >
          {/* Main accessibility helper */}
          <FocusMain />

          {/* Atmospheric Overlays:

          */}
          <div className="noise-overlay fixed inset-0 z-[9999] pointer-events-none opacity-[0.05]" />
          <div className="vignette-overlay fixed inset-0 z-[9998] pointer-events-none" />

          {/* Custom cursor stays on top */}
          <CustomCursor />

          <PageTransition>
            <main className="relative">{children}</main>
          </PageTransition>

          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
