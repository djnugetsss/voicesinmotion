import { Hero } from "@/components/sections/Hero";
import { ProgramsSection } from "@/components/sections/ProgramsSection";
import { SummerSection } from "@/components/sections/SummerSection";
import { WhySection } from "@/components/sections/WhySection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhySection />
      <ProgramsSection />
      <SummerSection />
    </>
  );
}
