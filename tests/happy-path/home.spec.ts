import { test, expect } from '../../fixtures/pages.fixture';
import { EXPECTED_TITLES } from '../../test-data/videos';

/**
 * Happy path tests verify the core user flows work as expected.
 * Each `test()` block is one scenario. The string is the test name shown in reports.
 */
test.describe('YouTube Home Page', () => {
  test('loads successfully and displays the logo', async ({ homePage }) => {
    await homePage.goto();

    expect(await homePage.getTitle()).toBe(EXPECTED_TITLES.HOME);
    expect(await homePage.isLogoVisible()).toBe(true);
  });

  test('home page URL is correct', async ({ homePage }) => {
    await homePage.goto();

    expect(await homePage.getCurrentUrl()).toContain('youtube.com');
  });
});
