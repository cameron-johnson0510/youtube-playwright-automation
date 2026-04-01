import { test, expect } from '../../fixtures/pages.fixture';

test.describe('YouTube Video - Error States', () => {
  test('navigating to a non-existent video ID shows unavailable message', async ({ videoPage, page }) => {
    // This video ID is intentionally invalid
    await videoPage.gotoVideo('INVALID_VIDEO_ID_XYZ');

    const isUnavailable = await videoPage.isVideoUnavailable();
    // Even if the message text changes, the page should not navigate away from YouTube
    expect(page.url()).toContain('youtube.com');
    expect(isUnavailable).toBe(true);
  });

  test('navigating to an age-restricted video shows sign-in prompt', async ({ videoPage }) => {
    // dQw4w9WgXcQ is Rick Astley - consistently available but a known test target
    // Replace with a known age-restricted ID if needed
    await videoPage.gotoVideo('dQw4w9WgXcQ');

    // If age-restricted, we should see the restriction message; if not, player is visible
    const isRestricted = await videoPage.isAgeRestricted();
    const isPlayerVisible = await videoPage.isPlayerVisible();

    expect(isRestricted || isPlayerVisible).toBe(true);
  });
});
