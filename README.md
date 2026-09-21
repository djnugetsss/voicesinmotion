# Voices In Motion

Marketing site for Voices In Motion: speech & debate coaching for Elementary,
Middle, and High School students.

Next.js (App Router) · TypeScript · Tailwind CSS v4 · Motion (Framer Motion) · Lenis

---

## Running it

```bash
npm install
npm run dev          # http://localhost:3000
```

```bash
npm run build        # production build
npm start            # serve the production build
npm run lint         # eslint
npx tsc --noEmit     # typecheck
```

Node 20 or newer.

---

## Where the content lives

**Every string, link, date and price on the site is in `src/content/`.** You
should not need to open a component to change copy.

| File | What it controls |
|---|---|
| `site.ts` | Site name, tagline, meta description, nav links, Instagram URL, the nav "Book a free lesson" button |
| `hero.ts` | Home hero: eyebrow, headline, subhead, both buttons |
| `why.ts` | Emerson quote, the two supporting paragraphs, **the three stat numbers** |
| `programs.ts` | Free Group Workshops and Private Lessons cards, including every CTA link |
| `summer.ts` | **The three summer sessions, their dates, and the price badge** |
| `reviews.ts` | Testimonials |
| `coaches.ts` | The coach roster: names, roles, events, achievements, bios, photos |
| `closing.ts` | The dark closing band: headline, subhead, both buttons |
| `footer.ts` | Footer blurb, footer links, contact email, copyright |
| `about.ts` | Everything on `/about`: hero, story blocks, mission pillars |
| `media.ts` | Everything on `/media`: gallery items and filter labels |
| `types.ts` | The shape of all of the above. Worth a look before adding fields. |

### Placeholders

Anything still invented is marked `placeholder: true` in content and renders
`data-placeholder` in the DOM, so you can find them in devtools with:

```
document.querySelectorAll('[data-placeholder]')
```

Currently placeholder: the three stat numbers, the summer price, all six
coaches, every gallery item, and the `/about` story prose.

---

## How to…

### Add a review

In `src/content/reviews.ts`, append to `reviews`:

```ts
{
  id: "jamie-l",              // unique, kebab-case
  quote: "…",                 // no surrounding quote marks, the card draws them
  name: "Jamie L",
  role: "Parent",             // or "Student"
  session: "Summer Session",
},
```

Nothing else to change. The marquee measures itself and repeats the list as
many times as it takes to fill the screen, so it works with two reviews or
twenty. Only add reviews people actually wrote.

### Add a coach

In `src/content/coaches.ts`, append to `coaches`:

```ts
{
  id: "coach-7",
  name: "Real Name",
  role: "Coach, Debate",
  events: "Lincoln–Douglas · Public Forum",
  achievements: ["State Finalist", "2× National Qualifier"],
  bio: "Shown when the card is expanded on /about.",
  photo: { src: "/coaches/real-name.jpg", alt: "Real Name" },
  placeholder: false,
}
```

For the photo: drop the file in `public/coaches/` and set `photo`. Leave
`photo: null` and you get a palette gradient in the same 4:5 box, so swapping
one in shifts nothing on the page.

The home page shows the **first four**; `/about` shows the whole roster. To
change how many the home page features, edit the `.slice(0, 4)` in
`src/components/sections/CoachesSection.tsx`.

### Add a media item

In `src/content/media.ts`, append to `items`:

```ts
{
  id: "media-13",
  type: "image",              // or "video" (mp4/webm)
  src: "/media/awards.jpg",   // null renders a gradient placeholder
  alt: "Students on stage at the awards ceremony",
  caption: "Awards ceremony",
  aspect: 1.5,                // width ÷ height, see below
  category: "competitions",   // workshops | competitions | team
  placeholder: false,
}
```

**`aspect` must match the real file** (width ÷ height): `1` square, `0.8` for
4:5 portrait, `1.5` for 3:2 landscape, `0.5625` for 9:16 vertical video. It is
what reserves the box before the file loads. The masonry has zero layout
shift because of it, and a wrong number gives you a wrong-shaped crop.

Files go in `public/media/`. The masonry rebalances itself and the filters pick
up the new `category` automatically.

### Change the summer dates or price

`src/content/summer.ts`. Dates:

```ts
{ id: "speech", marker: "01", name: "Speech Workshop", dates: "June 24–28", kind: "free" }
```

Price badge:

```ts
price: { label: "Price", value: "TBA", placeholder: true }
```

Set `value: "$150"` and `placeholder: false`. The badge is styled from this one
object. No component changes. `kind: "paid"` is what gives a session the gold
treatment and shows the price badge.

Adding a fourth session just works: the timeline measures the track and
lengthens the scroll accordingly.

---

## Design tokens

`src/app/globals.css`, in the `@theme` block.

| Token | Use |
|---|---|
| `--color-paper` `#FBFCFE` | Base |
| `--color-mist` `#EDF2FA` | Section washes |
| `--color-sky` `#A8C0E0` | Decoration, gradients |
| `--color-azure` `#5C87C4` | Fills, strokes, borders, the waveform |
| `--color-azure-ink` `#456797` | **Azure for text.** Plain azure is only 3.57:1 on paper, too low for small text. Use this for any azure-coloured words. |
| `--color-ink` `#101B2E` | Body text |
| `--color-gold` `#D9A441` | Sparingly: the closing CTA, the price badge |

Ink below 65% opacity drops under 4.5:1 on light backgrounds. `text-ink/65` is
the floor for small text.

---

## How the motion is organised

`src/components/motion/` holds the primitives everything else is built from:

- `RevealWords`: word-by-word headline reveal. Three modes: on-scroll trigger,
  scroll-scrubbed (`progress`), and `eager` (CSS-driven, for above-the-fold
  headings so they paint without waiting on hydration).
- `RevealBlock`: fade + rise. Also takes `eager`.
- `Parallax`, `Spotlight`, `Tilt`: scroll and pointer effects.
- `Waveform` (in `ui/`): the signature sine. Reused as the hero element, the
  timeline connector, the closing-band backdrop and the footer divider.
- `use-media-preference.ts`: the reduced-motion and pointer guards.

**Every primitive degrades to a static, complete state under
`prefers-reduced-motion`,** and the pinned sections un-pin entirely (they use
`motion-safe:` variants, so the CSS respects the preference too, not just the
JS).

---

## Deployment

See `DEPLOY.md` for Vercel setup and moving the `voicesinmotion.net` domain off
Squarespace.
