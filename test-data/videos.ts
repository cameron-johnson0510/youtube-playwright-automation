/**
 * Stable, well-known YouTube video IDs used across tests.
 * Using known video IDs keeps tests deterministic — we know what to expect.
 *
 * In TypeScript, `as const` freezes the object so its values are literal types,
 * not just `string`. This gives you autocomplete and prevents typos.
 */
export const VIDEOS = {
  // "Me at the zoo" — the first ever YouTube video (Apr 2005), maintained by the platform indefinitely
  ME_AT_THE_ZOO: 'jNQXAC9IVRw',
  // Rick Astley "Never Gonna Give You Up" — one of the most stable videos on YouTube
  RICK_ASTLEY: 'dQw4w9WgXcQ',
} as const;

export const SEARCH_QUERIES = {
  VALID: 'Playwright testing tutorial',
  GIBBERISH: 'xkqzmwvpqbrtyuio123456',
  EMPTY: '',
  SPECIAL_CHARS: '!@#$%^&*()',
  LONG_QUERY: 'a'.repeat(500),
} as const;

export const EXPECTED_TITLES = {
  HOME: 'YouTube',
} as const;
