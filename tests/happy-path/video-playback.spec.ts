import { test, expect } from '../../fixtures/pages.fixture';
import { VIDEOS } from '../../test-data/videos';

test.describe('YouTube Video Playback - Happy Path', () => {
  test.beforeEach(async ({ videoPage }) => {
    const response = await videoPage.gotoVideo(VIDEOS.ME_AT_THE_ZOO);
    const botCheck = await videoPage.isBotCheckVisible();
    test.skip(!response.ok || botCheck, 'YouTube bot check triggered — skipping');
  });

  test('video page loads and player is visible', async ({ videoPage }) => {
    expect(await videoPage.isPlayerVisible()).toBe(true);
  });

  test('video page displays a title', async ({ videoPage }) => {
    const title = await videoPage.getVideoTitle();
    expect(title.length).toBeGreaterThan(0);
  });

  test('video page displays a channel name', async ({ videoPage }) => {
    const channel = await videoPage.getChannelName();
    expect(channel.length).toBeGreaterThan(0);
  });

  test('related videos are shown alongside the video', async ({ videoPage }) => {
    const relatedCount = await videoPage.getRelatedVideoCount();
    expect(relatedCount).toBeGreaterThan(0);
  });
});
