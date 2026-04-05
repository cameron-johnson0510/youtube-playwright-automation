# YouTube Playwright Automation

A Playwright + TypeScript test automation framework for YouTube's web application, covering UI interactions and YouTube Data API v3.

## Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| `@playwright/test` | ^1.59.1 | Browser automation and test runner |
| `typescript` | ^5.7.0 | Type-safe test code |
| `allure-playwright` | ^3.6.0 | HTML test reporting |
| `dotenv` | ^16.4.0 | Environment variable management |
| `eslint` + `@typescript-eslint` | ^9 / ^8 | Linting and code style |

## Project Structure

```
YoutubeAutomation/
├── pages/                      # Page Object Model classes
│   ├── base-page.ts            # Shared page methods
│   ├── home-page.ts            # YouTube home page
│   ├── search-results-page.ts  # Search results page
│   └── video-page.ts           # Video watch page
├── tests/
│   ├── happy-path/             # Positive scenario tests
│   ├── error-states/           # Edge case and error tests
│   └── api/                    # YouTube Data API v3 tests
├── fixtures/
│   └── pages.fixture.ts        # Auto-injected page objects
├── test-data/
│   └── videos.ts               # Test video IDs, queries, titles
├── playwright.config.ts
├── .env.example
└── tsconfig.json
```

## Setup

### Prerequisites

- Node.js 18+
- npm

### Install dependencies

```bash
npm install
npx playwright install chromium
```

### Environment variables

```bash
cp .env.example .env
```

Edit `.env` and add your YouTube Data API v3 key:

```
YOUTUBE_API_KEY=your_api_key_here
```

To get an API key:
1. Create a project at [Google Cloud Console](https://console.cloud.google.com)
2. Enable the **YouTube Data API v3**
3. Create an **API Key** credential

> API tests are automatically skipped if `YOUTUBE_API_KEY` is not set.

## Running Tests

```bash
# All tests
npm test

# By suite
npm run test:happy-path
npm run test:error-states
npm run test:api

# Headed (visible browser)
npm run test:headed

# Debug mode (Playwright Inspector)
npm run test:debug
```

## Reporting

Tests use [Allure](https://allurereport.org/) for rich HTML reports.

```bash
# Generate and open report
npm run allure:report

# Or separately
npm run allure:generate
npm run allure:open
```

On failure, Playwright automatically captures:
- Screenshots
- Video recordings
- Trace files

## Architecture

### Page Object Model

All page interactions are encapsulated in typed classes under `pages/`. Each extends `BasePage`, which provides shared utilities (`waitForNetworkIdle`, `getTitle`, `getCurrentUrl`).

### Custom Fixtures

`fixtures/pages.fixture.ts` extends Playwright's `test` with auto-instantiated page objects:

```typescript
// Pages are injected automatically — no manual setup needed
test('example', async ({ homePage, searchResultsPage }) => { ... });
```

### Test Organization

- **happy-path** — Core functionality: home page, search, video playback
- **error-states** — Edge cases: invalid queries, bad video IDs, age-restricted content
- **api** — YouTube Data API v3: search, video details, error responses

### Locator Strategy

Accessibility-first locators are preferred (`getByRole`, `getByLabel`) with CSS fallbacks for YouTube-specific components (e.g., `ytd-video-renderer`).

## Code Quality

```bash
npm run lint        # ESLint
npm run type-check  # TypeScript type checking
```

## Configuration

- **baseURL**: `https://www.youtube.com`
- **Parallelism**: 4 workers locally, 2 on CI
- **Retries**: 0 locally, 1 on CI
- **Browser**: Chromium (desktop)
- **Path aliases**: `@pages/*`, `@fixtures/*`, `@test-data/*`, `@utils/*`
