import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteMeta } from "@/content";

export const alt = `${siteMeta.name} — ${siteMeta.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const display = await readFile(
    join(process.cwd(), "src/app/_og/InstrumentSerif-Regular.ttf"),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "84px 88px",
          backgroundColor: "#FBFCFE",
          backgroundImage:
            "linear-gradient(145deg, #FBFCFE 0%, #EDF2FA 45%, #A8C0E0 100%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 999,
              backgroundColor: "#D9A441",
            }}
          />
          <div
            style={{
              fontSize: 26,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#101B2E",
              opacity: 0.65,
            }}
          >
            {siteMeta.tagline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontFamily: "Instrument Serif",
            fontSize: 132,
            lineHeight: 1,
            letterSpacing: -3,
            color: "#101B2E",
          }}
        >
          {siteMeta.name}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 30,
              lineHeight: 1.4,
              color: "#101B2E",
              opacity: 0.7,
              maxWidth: 720,
            }}
          >
            Free workshops and private coaching for Elementary, Middle, and
            High School students.
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#456797" }}>
            voicesinmotion.net
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Instrument Serif",
          data: Uint8Array.from(display).buffer as ArrayBuffer,
          style: "normal",
          weight: 400,
        },
      ],
    },
  );
}
