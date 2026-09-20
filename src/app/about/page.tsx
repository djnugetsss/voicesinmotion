import type { Metadata } from "next";
import { AboutHero } from "@/components/sections/about/AboutHero";
import { MissionSection } from "@/components/sections/about/MissionSection";
import { RosterSection } from "@/components/sections/about/RosterSection";
import { StorySection } from "@/components/sections/about/StorySection";
import { about } from "@/content";

export const metadata: Metadata = {
  title: "About",
  description: about.hero.subhead,
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
