/** Tiny class joiner — no runtime dependency, no UI kit. */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
