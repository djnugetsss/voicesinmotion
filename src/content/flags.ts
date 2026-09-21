/* ---------------------------------------------------------------------------
 * Feature switches
 *
 * `showMedia` is the single switch for the /media route. While it is false the
 * Media link is dropped from the nav, the mobile menu and the footer, /media
 * redirects to the home page, and the route is left out of the sitemap. All of
 * the gallery code and content is still here, untouched: set this to true to
 * bring the page back.
 *
 * Typed as `boolean` rather than inferred, so flipping the value never leaves
 * the compiler treating one branch as unreachable.
 * ------------------------------------------------------------------------- */

export const showMedia: boolean = false;
