import { Page, Locator } from '@playwright/test';
import { BasePage } from './base-page';

/**
 * HomePage models the YouTube home page (https://www.youtube.com).
 * All selectors and interactions for this page live here.
 */
export class HomePage extends BasePage {
  // Locators are stored as class properties for reuse across methods.
  // Playwright locators are lazy — they don't query the DOM until you act on them.
  private readonly searchInput: Locator;
  private readonly searchButton: Locator;
  private readonly logoLink: Locator;

  constructor(page: Page) {
    super(page);
    this.searchInput = page.getByRole('combobox', { name: 'Search' });
    this.searchButton = page.getByRole('button', { name: 'Search', exact: true });
    this.logoLink = page.getByRole('link', { name: 'YouTube Home' });
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
    await this.waitForNetworkIdle();
  }

  async search(query: string): Promise<void> {
    await this.searchInput.fill(query);
    await this.searchButton.click();
  }

  async searchWithKeyboard(query: string): Promise<void> {
    await this.searchInput.fill(query);
    await this.searchInput.press('Enter');
  }

  async isLogoVisible(): Promise<boolean> {
    return this.logoLink.isVisible();
  }
}
