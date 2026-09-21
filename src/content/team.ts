import type { TeamContent } from "./types";

/* ---------------------------------------------------------------------------
 * The real team. Bios are reproduced exactly as written by each person.
 *
 * Headshots live in `public/team/`. Two of them (Kahan, Ashrith) arrived as
 * circular crops matted onto solid black, so the founder cards clip them to a
 * circle rather than letting the black corners show. If un-matted originals
 * turn up, drop them in and switch `FounderCard` to a full-bleed 4:5 crop.
 *
 * `photoFocus` is a CSS object-position, and also the origin the founder
 * medallion zooms toward. It is what lines the faces up with each other, so
 * check both cards side by side after changing it.
 * ------------------------------------------------------------------------- */

export const team: TeamContent = {
  id: "coaches",
  eyebrow: "The team",
  foundersTitle: "Meet the Founders",
  foundersIntro:
    "Voices In Motion is run by two competitors who are still in the room every weekend.",
  staffTitle: "Teaching Assistants and Social Media Managers",
  members: [
    {
      slug: "kahan-kanuga",
      name: "Kahan Kanuga",
      role: "Co-Founder & Coach",
      tier: "founder",
      bio: [
        "Hi, I'm Kahan Kanuga, a senior at North Hollywood's Highly Gifted Magnet and a passionate speech and debate competitor with 7 years of experience. Throughout my career, I've placed in the Top 5 at both state and national-level finals in Congressional Debate, Impromptu Speaking, Extemporaneous Speaking, and Informative Speaking. I'm also a NIETOC Finalist and earned 3rd place at NOF. Along with that, I've qualified for both the National Speech & Debate Tournament and the National Individual Events Tournament of Champions.",
        "Outside of speech and debate, I love playing tennis, skiing, and participating in Model United Nations at my school. I've really enjoyed teaching over the past year, and I'm excited to continue helping Voices in Motion grow and impact more students!",
      ],
      highlights: [
        "Top 5 at state and national finals",
        "NIETOC Finalist",
        "3rd place at NOF",
        "NSDA Nationals and NIETOC qualifier",
      ],
      photo: "/team/kahan.png",
      photoFocus: "50% 50%",
      photoZoom: 1.05,
    },
    {
      slug: "ashrith-kasinadhuni",
      name: "Ashrith Kasinadhuni",
      role: "Co-Founder & Coach",
      tier: "founder",
      bio: [
        "Hi, I'm Ashrith Kasinadhuni, a senior at Granada Hills Charter High School and a passionate Speech & Debate competitor. Over the years, I've competed across multiple NSDA events and have earned recognition at both the regional and state level. Most recently, I was a 2026 California State Finalist (7th place), LA County Champion, a 2x Peninsula District Top 3 finisher in 2026, and a Top 3 finalist at La Costa as well.",
        "Beyond speech and debate, I love staying active through tennis and cricket, and I also enjoy skiing and gaming in my free time. I'm excited to share my experience and help students grow their confidence and communication skills through Voices in Motion!",
      ],
      highlights: [
        "2026 California State Finalist (7th)",
        "LA County Champion",
        "2x Peninsula District Top 3",
        "Top 3 finalist at La Costa",
      ],
      photo: "/team/ashrith.png",
      photoFocus: "50% 16%",
      photoZoom: 1.34,
    },
    {
      slug: "saurabh-kotturgowdra",
      name: "Saurabh Kotturgowdra",
      role: "Social Media Marketing Assistant",
      tier: "staff",
      bio: [
        "Saurabh Kotturgowdra is our new social media marketing assistant! He specializes in content design and has a passion for supporting youth-conscious brands. Saurabh is thankful for your engagement!",
      ],
      photo: "/team/saurabh.png",
      photoFocus: "50% 12%",
      photoZoom: 1.7,
    },
    {
      slug: "micah-ramos",
      name: "Micah Ramos",
      role: "Director of Finance and Marketing",
      tier: "staff",
      bio: [
        "Micah Ramos is our Director Of Finance and Marketing! He specializes in money content design and supporting the growth of youth. Micah warmly welcomes you!",
      ],
      photo: "/team/micah.png",
      photoFocus: "50% 42%",
      photoZoom: 1.05,
    },
  ],
};

export const founders = team.members.filter((m) => m.tier === "founder");
export const staff = team.members.filter((m) => m.tier === "staff");
