import { test, expect } from '../../fixtures/pages.fixture';
import { SEARCH_QUERIES } from '../../test-data/videos';

test.describe('YouTube Search - Happy Path', () => {
  test.beforeEach(async ({ homePage }) => {
    // `beforeEach` runs before every test in this describe block
    await homePage.goto();
  });

  test('search returns results for a valid query', async ({ homePage, searchResultsPage }) => {
    await homePage.search(SEARCH_QUERIES.VALID);
    await searchResultsPage.waitForResults();

    const count = await searchResultsPage.getResultCount();
    expect(count).toBeGreaterThan(0);
  });

  test('search via keyboard Enter key works', async ({ homePage, searchResultsPage }) => {
    await homePage.searchWithKeyboard(SEARCH_QUERIES.VALID);
    await searchResultsPage.waitForResults();

    const count = await searchResultsPage.getResultCount();
    expect(count).toBeGreaterThan(0);
  });

  test('search query is reflected in the results page input', async ({ homePage, searchResultsPage }) => {
    await homePage.search(SEARCH_QUERIES.VALID);
    await searchResultsPage.waitForResults();

    const currentQuery = await searchResultsPage.getCurrentSearchQuery();
    expect(currentQuery).toBe(SEARCH_QUERIES.VALID);
  });

  test('clicking first search result navigates to video page', async ({ homePage, searchResultsPage, page }) => {
    await homePage.search(SEARCH_QUERIES.VALID);
    await searchResultsPage.waitForResults();
    await searchResultsPage.clickFirstResult();

    await page.waitForURL('**/watch**');
    expect(page.url()).toContain('/watch');
  });
});
