import { ClosingSection } from "@/components/sections/ClosingSection";
import { TeamSection } from "@/components/sections/TeamSection";
import { Hero } from "@/components/sections/Hero";
import { ProgramsSection } from "@/components/sections/ProgramsSection";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { UpcomingSection } from "@/components/sections/UpcomingSection";
import { WhySection } from "@/components/sections/WhySection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhySection />
      <ProgramsSection />
      <UpcomingSection />
      <ReviewsSection />
      <TeamSection />
      <ClosingSection />
    </>
  );
}
