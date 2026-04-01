import { test as base } from '@playwright/test';
import { HomePage } from '../pages/home-page';
import { SearchResultsPage } from '../pages/search-results-page';
import { VideoPage } from '../pages/video-page';

/**
 * Custom fixtures extend Playwright's built-in `test` object.
 *
 * In TypeScript, you define the "shape" of your fixtures using a type.
 * Here we declare that every test can receive `homePage`, `searchResultsPage`,
 * and `videoPage` as parameters — Playwright will create them automatically.
 */
type PageFixtures = {
  homePage: HomePage;
  searchResultsPage: SearchResultsPage;
  videoPage: VideoPage;
};

export const test = base.extend<PageFixtures>({
  homePage: async ({ page }, use) => {
    // `use` is a Playwright convention: set up the fixture, call use(), then tear down
    await use(new HomePage(page));
  },

  searchResultsPage: async ({ page }, use) => {
    await use(new SearchResultsPage(page));
  },

  videoPage: async ({ page }, use) => {
    await use(new VideoPage(page));
  },
});

// Re-export `expect` so tests only need to import from this file
export { expect } from '@playwright/test';
