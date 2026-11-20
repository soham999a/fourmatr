import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, IBM_Plex_Mono, Inter } from "next/font/google";
import "./globals.css";
import { RevealObserver } from "@/components/layout/RevealObserver";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { SITE } from "@/content/site";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-cormorant",
  display: "block",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
  display: "block",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "block",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.origin),
  title: {
    default: `${SITE.name} — Applied intelligence for enterprise`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: "Matrka" }],
  creator: "Matrka",
  keywords: [
    "applied intelligence",
    "supply chain intelligence",
    "adaptive intelligence",
    "decision intelligence",
    "analytics intelligence",
    "operational intelligence",
    "Matrka",
  ],
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: `${SITE.name} — Applied intelligence for enterprise`,
    description: SITE.description,
    url: SITE.origin,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — Applied intelligence for enterprise`,
    description: SITE.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#070502",
  width: "device-width",
  initialScale: 1,
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  url: SITE.origin,
  description: SITE.description,
  email: SITE.contact.email,
  telephone: SITE.contact.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kolkata",
    addressCountry: "IN",
  },
  sameAs: [SITE.parent.href],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.name,
  url: SITE.origin,
  inLanguage: "en-IN",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationJsonLd, websiteJsonLd]),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(window.WebGLRenderingContext&&!navigator.webdriver&&(navigator.hardwareConcurrency||8)>4&&(navigator.deviceMemory||8)>4&&window.matchMedia('(min-width: 768px)').matches&&window.matchMedia('(pointer: fine)').matches&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('webgl-capable')}}catch(e){}",
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <RevealObserver />
        <ScrollProgress />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-gold focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <MobileBottomNav />
      </body>
    </html>
  );
}
