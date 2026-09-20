import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import { SmoothScroll } from "@/components/motion";
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
  openGraph: {
    title: `${siteMeta.name} — ${siteMeta.tagline}`,
    description: siteMeta.description,
    url: siteMeta.url,
    siteName: siteMeta.name,
    type: "website",
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
        <SmoothScroll />
        <SiteHeader />
        <main id="main">{children}</main>
      </body>
    </html>
  );
}
