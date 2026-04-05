import { test, expect } from '@playwright/test';

const API_BASE = 'https://www.googleapis.com/youtube/v3';

test.describe('YouTube Data API v3', () => {
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

  test('API returns id-only results when part is not set', async ({ request }) => {
    const response = await request.get(`${API_BASE}/search`, {
      params: {
        q: 'test',
        key: process.env.YOUTUBE_API_KEY!,
      },
    });

      expect(response.status()).toBe(200);
    const body = await response.json() as { items: Array<Record<string, unknown>> };
    expect(body.items.length).toBeGreaterThan(0);
    // Items should only contain id — no snippet since part was not requested
    expect(body.items[0]).not.toHaveProperty('snippet');
    });

    test('API returns 400 for invalid channelID', async ({request}) => {
      const response = await request.get(`${API_BASE}/search`, {
        params: {
          channelId: 'definitelyNotARealChannelID',
          q: 'test',
          key: process.env.YOUTUBE_API_KEY!,
        }
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
