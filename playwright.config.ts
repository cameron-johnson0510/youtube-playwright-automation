import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  // Directory where Playwright looks for test files
  testDir: './tests',

  // Run tests within each file in parallel
  fullyParallel: true,

  // Fail the build on CI if test.only() was accidentally committed
  forbidOnly: !!process.env.CI,

  // Retry failed tests once on CI, never locally
  retries: process.env.CI ? 1 : 0,

  // Limit parallel workers to 4 to avoid overloading YouTube
  workers: process.env.CI ? 2 : 4,

  // Reporters: Allure for rich HTML reports + built-in list output
  reporter: [
    ['list'],
    ['allure-playwright', { outputFolder: 'allure-results' }],
  ],

  use: {
    // Base URL so tests can use relative paths like page.goto('/')
    baseURL: 'https://www.youtube.com',

    // Record a video and screenshot on every test failure
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',

    // Show browser actions in trace viewer on failure (great for debugging)
    trace: 'retain-on-failure',
  },

  projects: [
    {
      name: 'happy-path',
      testMatch: 'tests/happy-path/**/*.spec.ts',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'error-states',
      testMatch: 'tests/error-states/**/*.spec.ts',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'api',
      testMatch: 'tests/api/**/*.spec.ts',
      // API tests don't need a browser — this disables the browser entirely
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
