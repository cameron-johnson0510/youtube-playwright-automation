import { Page, Locator } from '@playwright/test';
import { BasePage } from './base-page';

export class VideoPage extends BasePage {
  private readonly player: Locator;
  private readonly playButton: Locator;
  private readonly videoTitle: Locator;
  private readonly channelName: Locator;
  private readonly likeButton: Locator;
  private readonly moreActionsButton: Locator;
  private readonly ageRestrictionMessage: Locator;
  private readonly unavailableMessage: Locator;
  private readonly relatedVideos: Locator;
  private readonly botCheckPrompt: Locator;

  constructor(page: Page) {
    super(page);
    this.player = page.locator('#movie_player');
    this.playButton = page.locator('.ytp-play-button');
    this.videoTitle = page.locator('h1.ytd-watch-metadata yt-formatted-string');
    this.channelName = page.locator('ytd-channel-name a');
    this.likeButton = page.locator('like-button-view-model button');
    this.moreActionsButton = page.locator('ytd-menu-renderer yt-icon-button');
    this.ageRestrictionMessage = page.locator('ytd-watch-needs-sign-in-renderer');
    this.unavailableMessage = page.getByText('This video isn\'t available anymore');
    this.relatedVideos = page.getByRole('heading', { level: 3 });
    this.botCheckPrompt = page.getByText("Sign in to confirm you're not a bot", { exact: false });
  }

  async gotoVideo(videoId: string): Promise<{ status: number; ok: boolean }> {
    const response = await this.page.goto(`/watch?v=${videoId}`);
    await this.waitForNetworkIdle();
    return { status: response?.status() ?? 0, ok: response?.ok() ?? false };
  }

  async isBotCheckVisible(): Promise<boolean> {
    return this.botCheckPrompt.isVisible();
  }

  async getVideoTitle(): Promise<string> {
    await this.videoTitle.waitFor();
    return this.videoTitle.innerText();
  }

  async getChannelName(): Promise<string> {
    await this.channelName.waitFor();
    return this.channelName.first().innerText();
  }

  async isPlayerVisible(): Promise<boolean> {
    return this.player.isVisible();
  }

  async isAgeRestricted(): Promise<boolean> {
    return this.ageRestrictionMessage.isVisible();
  }

  async isVideoUnavailable(): Promise<boolean> {
    return this.unavailableMessage.isVisible();
  }

  async getRelatedVideoCount(): Promise<number> {
    await this.relatedVideos.first().waitFor({ state: 'visible', timeout: 10000 });
    return this.relatedVideos.count();
  }

  async pauseVideo(): Promise<void> {
    await this.player.click();
  }
}
