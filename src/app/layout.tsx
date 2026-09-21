import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import { SmoothScroll } from "@/components/motion";
import { PageTransition } from "@/components/layout/PageTransition";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { StructuredData } from "@/components/layout/StructuredData";
import { SiteHeader } from "@/components/nav/SiteHeader";
import { siteMeta } from "@/content";
import "./globals.css";

const displaySerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-display-serif",
});

const bodySans = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteMeta.url),
  title: {
    default: `${siteMeta.name} — ${siteMeta.tagline}`,
    template: `%s — ${siteMeta.name}`,
  },
  description: siteMeta.description,
  alternates: { canonical: "/" },
  applicationName: siteMeta.name,
  keywords: [
    "speech and debate",
    "public speaking coaching",
    "debate coach",
    "student speech workshops",
    "summer speech camp",
  ],
  openGraph: {
    title: `${siteMeta.name} — ${siteMeta.tagline}`,
    description: siteMeta.description,
    url: siteMeta.url,
    siteName: siteMeta.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteMeta.name} — ${siteMeta.tagline}`,
    description: siteMeta.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#FBFCFE",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${displaySerif.variable} ${bodySans.variable}`}>
      <body className="antialiased">
        <StructuredData />
        <SmoothScroll />
        <SiteHeader />
        <main id="main">
          <PageTransition>{children}</PageTransition>
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
