import { RevealBlock, RevealWords } from "@/components/motion";
import { ProgramCard } from "@/components/ui/ProgramCard";
import { programs } from "@/content";

export function ProgramsSection() {
  return (
    <section
      aria-labelledby="programs-heading"
      className="relative isolate overflow-hidden py-24 sm:py-28 lg:py-36"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(180deg, color-mix(in oklab, var(--mist) 60%, var(--paper)) 0%, var(--paper) 40%, var(--paper) 100%)",
          }}
        />
        <div
          className="drift-a absolute -top-[10%] right-[-15%] h-[60vh] w-[60vw] rounded-full blur-[90px]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--sky) 34%, transparent) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="shell">
        <RevealBlock>
          <p className="flex items-center gap-2.5 text-[length:var(--text-eyebrow)] font-medium tracking-[0.2em] text-ink/55 uppercase">
            <span
              aria-hidden="true"
              className="inline-block h-px w-6 shrink-0 bg-ink/25"
            />
            {programs.eyebrow}
          </p>
        </RevealBlock>

        <RevealWords
          as="h2"
          id="programs-heading"
          text={programs.title}
          className="font-display mt-6 text-[length:var(--text-section)] text-ink"
          stagger={0.05}
          distance={22}
        />

        <RevealBlock delay={0.24}>
          <p className="mt-5 max-w-[46ch] text-[length:var(--text-lead)] leading-[1.6] text-ink/70">
            {programs.intro}
          </p>
        </RevealBlock>

        <div className="mt-12 grid gap-5 sm:mt-16 lg:grid-cols-2 lg:gap-7">
          {programs.programs.map((program, i) => (
            <RevealBlock key={program.id} delay={i * 0.12} distance={30}>
              <ProgramCard program={program} />
            </RevealBlock>
          ))}
        </div>
      </div>
    </section>
  );
}
