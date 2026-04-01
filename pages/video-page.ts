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

  constructor(page: Page) {
    super(page);
    this.player = page.locator('#movie_player');
    this.playButton = page.locator('.ytp-play-button');
    this.videoTitle = page.locator('h1.ytd-watch-metadata yt-formatted-string');
    this.channelName = page.locator('ytd-channel-name a');
    this.likeButton = page.locator('like-button-view-model button');
    this.moreActionsButton = page.locator('ytd-menu-renderer yt-icon-button');
    this.ageRestrictionMessage = page.locator('ytd-watch-needs-sign-in-renderer');
    this.unavailableMessage = page.locator('yt-formatted-string:has-text("unavailable")');
    this.relatedVideos = page.getByRole('heading', { level: 3 });
  }

  async gotoVideo(videoId: string): Promise<void> {
    await this.page.goto(`/watch?v=${videoId}`);
    await this.waitForNetworkIdle();
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
    return this.relatedVideos.count();
  }

  async pauseVideo(): Promise<void> {
    await this.player.click();
  }
}
