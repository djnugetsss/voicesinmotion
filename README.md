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

**Every string, link and date on the site is in `src/content/`.** You
should not need to open a component to change copy.

| File | What it controls |
|---|---|
| `site.ts` | Site name, tagline, meta description, nav links, Instagram URL, the nav "Book a free lesson" button |
| `hero.ts` | Home hero: eyebrow, headline, subhead, both buttons |
| `why.ts` | Emerson quote, the two supporting paragraphs, **the stat numbers** |
| `programs.ts` | Free Group Workshops and Private Lessons cards, including every CTA link |
| `workshops.ts` | **The upcoming sessions, their dates, and their sign-up links** |
| `reviews.ts` | Testimonials |
| `team.ts` | The team: founders and staff, with roles, bios, highlights, headshots |
| `closing.ts` | The dark closing band: headline, subhead, both buttons |
| `footer.ts` | Footer blurb, footer links, contact email, copyright |
| `about.ts` | The `/about` page heading and intro (the page is just the roster) |
| `media.ts` | Everything on `/media`: gallery items and filter labels (the route is off, see `flags.ts`) |
| `flags.ts` | Feature switches. Currently just `showMedia`, which turns the `/media` route on and off |
| `types.ts` | The shape of all of the above. Worth a look before adding fields. |

### Placeholders

Anything still invented is marked `placeholder: true` in content and renders
`data-placeholder` in the DOM, so you can find them in devtools with:

```
document.querySelectorAll('[data-placeholder]')
```

Currently placeholder: every gallery item. Both stat numbers are real.

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

### Add a team member

In `src/content/team.ts`, append to `members`:

```ts
{
  slug: "first-last",
  name: "First Last",
  role: "Coach",
  tier: "staff",                 // "founder" | "staff"
  bio: ["One string per paragraph, verbatim as they wrote it."],
  highlights: ["Optional, founders only"],
  photo: "/team/first.png",
  photoFocus: "50% 38%",         // object-position for the face
}
```

`tier` is the only thing that decides where someone appears. Founders get the
large cards at the top of the home section and the expandable bios on
`/about`; staff get the compact cards underneath both. The lists are derived
(`founders` and `staff` are exported from the same file), so nothing else
needs changing.

**`photoFocus`** is what lines the faces up with each other. Headshots are
cropped differently, so after adding one, put the new card next to an existing
one and nudge the second value until the eyes sit at the same height. It is a
plain CSS `object-position`.

Headshots go in `public/team/`. Founder photos render as a circle inside a 4:5
card; staff photos render as a small square. Two of the current founder
headshots are circular crops on a black background, which is why the founder
card clips to a circle. A normal rectangular headshot works fine too.

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

### Change an upcoming workshop, or open its sign-up

`src/content/workshops.ts`. One entry per session:

```ts
{
  id: "community-workshop",
  marker: "01",
  name: "Community Workshop",
  dates: "October 24–25, 2026",
  description: "Optional. One line under the dates.",
  signupUrl: null,
}
```

**`signupUrl` is the whole sign-up mechanism.** While it is `null` the card
shows a muted "Sign-up opens soon" chip. Paste the form link in:

```ts
signupUrl: "https://docs.google.com/forms/d/e/…/viewform",
```

and the same card renders a live "Sign up" button instead. That is the only
edit. Both button labels live on `signupLabel` and `signupPendingLabel` in the
same file.

Sessions are not labelled free or paid and no price is shown, because none of
that is confirmed. Adding or removing a session just works: the timeline
measures the track and lengthens the scroll accordingly, and the cards divide
the scroll between however many there are.

### Turn the media page back on

`src/content/flags.ts`:

```ts
export const showMedia: boolean = false;
```

Set it to `true`. That one value restores the Media link in the nav, the
mobile menu and the footer, stops `/media` redirecting to the home page, and
puts the route back in `sitemap.ts`. The route, the gallery, the lightbox and
`media.ts` were never removed.

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
| `--color-gold` `#D9A441` | Sparingly: the hero eyebrow dot, the nav and closing CTAs |

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
