import type { Metadata } from "next";
import { RosterSection } from "@/components/sections/about/RosterSection";
import { about, siteMeta } from "@/content";

export const metadata: Metadata = {
  title: "About",
  description: about.metaDescription,
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About: ${siteMeta.name}`,
    description: about.metaDescription,
    url: `${siteMeta.url}/about`,
    type: "profile",
  },
  twitter: { card: "summary_large_image" },
};

export default function AboutPage() {
  return <RosterSection />;
}
