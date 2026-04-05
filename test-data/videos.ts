/**
 * Stable, well-known YouTube video IDs used across tests.
 * Using known video IDs keeps tests deterministic — we know what to expect.
 *
 * In TypeScript, `as const` freezes the object so its values are literal types,
 * not just `string`. This gives you autocomplete and prevents typos.
 */
export const VIDEOS = {
  ME_AT_THE_ZOO: 'jNQXAC9IVRw',
  RICK_ASTLEY: 'dQw4w9WgXcQ',
} as const;

export const SEARCH_QUERIES = {
  VALID: 'Playwright testing tutorial',
  EMPTY: '',
  SPECIAL_CHARS: '!@#$%^&*()',
  LONG_QUERY: 'a'.repeat(500),
} as const;

export const EXPECTED_TITLES = {
  HOME: 'YouTube',
} as const;
