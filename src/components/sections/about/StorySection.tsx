import { Parallax, RevealBlock } from "@/components/motion";
import { Section, SectionEyebrow } from "@/components/layout/Section";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { about } from "@/content";

export function StorySection() {
  return (
    <Section tone="mist" size="md" labelledBy="story-heading">
      <RevealBlock>
        <SectionEyebrow>{about.story.eyebrow}</SectionEyebrow>
      </RevealBlock>

      <RevealBlock delay={0.08}>
        <h2
          id="story-heading"
          className="font-display mt-6 max-w-[18ch] text-[length:var(--text-section)] text-ink"
        >
          {about.story.title}
        </h2>
      </RevealBlock>

      <div className="mt-16 flex flex-col gap-20 sm:mt-20 sm:gap-24 lg:gap-32">
        {about.story.blocks.map((block, i) => {
          // Alternate which side the picture sits on, and send it in from
          // whichever edge it is closest to.
          const imageRight = i % 2 === 0;

          return (
            <div
              key={block.id}
              className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
            >
              <div className={imageRight ? "lg:order-1" : "lg:order-2"}>
                <RevealBlock direction={imageRight ? "right" : "left"}>
                  <h3 className="font-display max-w-[16ch] text-[clamp(1.5rem,1.2rem+1.3vw,2.25rem)] leading-[1.08] text-ink">
                    {block.heading}
                  </h3>
                </RevealBlock>

                {block.body.map((paragraph, j) => (
                  <RevealBlock
                    key={j}
                    as="p"
                    delay={0.12 + j * 0.08}
                    className="mt-5 max-w-[46ch] text-[length:var(--text-lead)] leading-[1.65] text-ink/70"
                  >
                    {paragraph}
                  </RevealBlock>
                ))}
              </div>

              <div className={imageRight ? "lg:order-2" : "lg:order-1"}>
                <RevealBlock
                  direction={imageRight ? "left" : "right"}
                  distance={44}
                  duration={0.85}
                >
                  <Parallax rate={imageRight ? 0.07 : -0.07}>
                    <MediaFrame
                      src={block.image.src}
                      alt={block.image.alt}
                      aspect={block.image.aspect}
                      seed={i + 1}
                      sizes="(min-width: 1024px) 44vw, 92vw"
                      className="rounded-[1.5rem] border border-ink/10 shadow-[0_30px_70px_-40px_rgba(16,27,46,0.5)] sm:rounded-[2rem]"
                    />
                  </Parallax>
                </RevealBlock>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
