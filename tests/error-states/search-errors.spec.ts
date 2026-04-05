import { test, expect } from '../../fixtures/pages.fixture';
import { SEARCH_QUERIES } from '../../test-data/videos';

test.describe('YouTube Search - Error States', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
  });

  test('searching with special characters does not crash', async ({ homePage, page }) => {
    await homePage.search(SEARCH_QUERIES.SPECIAL_CHARS);

    // The page should still be on YouTube (not a 500 error page)
    expect(page.url()).toContain('youtube.com');
  });

  test('searching with an extremely long query does not crash', async ({ homePage, page }) => {
    await homePage.search(SEARCH_QUERIES.LONG_QUERY);

    expect(page.url()).toContain('youtube.com');
  });
});
