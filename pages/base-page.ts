import { Page } from '@playwright/test';

/**
 * BasePage is the parent class all page objects extend.
 * It holds the shared `page` instance and common actions used across pages.
 */
export class BasePage {
  constructor(protected readonly page: Page) {}

  async waitForNetworkIdle(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }

  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }
}
