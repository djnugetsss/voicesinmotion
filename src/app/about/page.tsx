import type { Metadata } from "next";
import { AboutHero } from "@/components/sections/about/AboutHero";
import { MissionSection } from "@/components/sections/about/MissionSection";
import { RosterSection } from "@/components/sections/about/RosterSection";
import { StorySection } from "@/components/sections/about/StorySection";
import { about, siteMeta } from "@/content";

export const metadata: Metadata = {
  title: "About",
  description: about.hero.subhead,
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About: ${siteMeta.name}`,
    description: about.hero.subhead,
    url: `${siteMeta.url}/about`,
    type: "profile",
  },
  twitter: { card: "summary_large_image" },
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <StorySection />
      <MissionSection />
      <RosterSection />
    </>
  );
}
