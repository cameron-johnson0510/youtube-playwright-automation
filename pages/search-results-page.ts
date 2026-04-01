import { Page, Locator } from '@playwright/test';
import { BasePage } from './base-page';

export class SearchResultsPage extends BasePage {
  private readonly results: Locator;
  private readonly noResultsMessage: Locator;
  private readonly didYouMean: Locator;
  private readonly filterButton: Locator;

  constructor(page: Page) {
    super(page);
    // CSS selectors targeting YouTube's rendered HTML structure
    this.results = page.locator('ytd-video-renderer');
    this.noResultsMessage = page.locator('yt-formatted-string.ytd-message-renderer');
    this.didYouMean = page.locator('#did-you-mean a');
    this.filterButton = page.locator('button:has-text("Filters")');
  }

  async waitForResults(): Promise<void> {
    await this.page.waitForSelector('ytd-video-renderer', { timeout: 10000 });
  }

  async getResultCount(): Promise<number> {
    return this.results.count();
  }

  async getFirstResultTitle(): Promise<string> {
    return this.results.first().locator('#video-title').innerText();
  }

  async clickFirstResult(): Promise<void> {
    await this.results.first().locator('#video-title').click();
  }

  async hasNoResults(): Promise<boolean> {
    return this.noResultsMessage.isVisible();
  }

  async getDidYouMeanSuggestion(): Promise<string | null> {
    if (await this.didYouMean.isVisible()) {
      return this.didYouMean.innerText();
    }
    return null;
  }

  async getCurrentSearchQuery(): Promise<string> {
    return this.page.getByRole('combobox', { name: 'Search' }).inputValue();
  }
}
