import { test, expect } from '@playwright/test';

/**
 * YouTube Data API v3 tests.
 *
 * PREREQUISITES:
 *   1. Create a Google Cloud project at https://console.cloud.google.com
 *   2. Enable the "YouTube Data API v3"
 *   3. Create an API Key credential
 *   4. Add it to your .env file:  YOUTUBE_API_KEY=your_key_here
 *
 * Playwright's `request` fixture gives you a built-in HTTP client —
 * no need for `fetch` or `axios`. It automatically handles base URLs,
 * headers, and response parsing.
 */

const API_BASE = 'https://www.googleapis.com/youtube/v3';

// `test.describe` groups related tests together in reports
test.describe('YouTube Data API v3', () => {
  // Skip all tests in this block if no API key is configured
  test.skip(!process.env.YOUTUBE_API_KEY, 'YOUTUBE_API_KEY not set in .env — skipping API tests');

  test('search endpoint returns video results', async ({ request }) => {
    const response = await request.get(`${API_BASE}/search`, {
      params: {
        part: 'snippet',
        q: 'Playwright testing',
        type: 'video',
        maxResults: 5,
        key: process.env.YOUTUBE_API_KEY!,
      },
    });

    expect(response.status()).toBe(200);

    // `await response.json()` parses the body — TypeScript infers it as `any`
    // We cast it with `as` to tell TypeScript the shape we expect
    const body = await response.json() as { items: unknown[] };
    expect(body.items.length).toBeGreaterThan(0);
  });

  test('videos endpoint returns video details', async ({ request }) => {
    const response = await request.get(`${API_BASE}/videos`, {
      params: {
        part: 'snippet,statistics',
        id: 'jNQXAC9IVRw', // YouTube Rewind 2018
        key: process.env.YOUTUBE_API_KEY!,
      },
    });

    expect(response.status()).toBe(200);

    const body = await response.json() as { items: Array<{ id: string }> };
    expect(body.items[0].id).toBe('jNQXAC9IVRw');
  });

  test('API returns 400 for a missing required parameter', async ({ request }) => {
    const response = await request.get(`${API_BASE}/search`, {
      params: {
        // `part` is required — omitting it should return a 400 Bad Request
        q: 'test',
        key: process.env.YOUTUBE_API_KEY!,
      },
    });

    expect(response.status()).toBe(400);
  });

  test('API returns 403 for an invalid API key', async ({ request }) => {
    const response = await request.get(`${API_BASE}/search`, {
      params: {
        part: 'snippet',
        q: 'test',
        key: 'INVALID_KEY_12345',
      },
    });

    expect(response.status()).toBe(400);
  });
});
