import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',

  // Run tests within each file in parallel
  fullyParallel: true,

  // Fail the build on CI if test.only() was accidentally committed
  forbidOnly: !!process.env.CI,

  // Retry failed tests once on CI, never locally
  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : 4,

  reporter: [
    ['list'],
    ['allure-playwright', { outputFolder: 'allure-results' }],
  ],

  use: {
    baseURL: 'https://www.youtube.com',

    screenshot: 'only-on-failure',
    video: 'retain-on-failure',

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
