# Playwright TypeScript Framework

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A modern, scalable test automation framework built on **Playwright** and **TypeScript**. Designed for maintainable test automation with support for Page Object Model, parallel execution, and comprehensive reporting.

## Features

✨ **Playwright-based** - Cross-browser automation with Chromium, Firefox, and WebKit  
🎯 **Page Object Model** - Built-in support for POM pattern  
⚡ **Parallel Execution** - Run tests in parallel for faster feedback  
📊 **Comprehensive Logging** - Built-in logging and reporting  
🔧 **Configuration Management** - Flexible environment-based configuration  
🏗️ **TypeScript** - Full TypeScript support with strict type checking  

## Quick Start

### Installation

```bash
npm install @playwright/test
npx playwright install
```

### Create Your First Test

1. **Create a Page Object**

```typescript
import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async navigateTo() {
    await this.page.goto('/login');
  }

  async login(username: string, password: string) {
    await this.page.fill('input[name="username"]', username);
    await this.page.fill('input[name="password"]', password);
    await this.page.click('button[type="submit"]');
  }
}
```

2. **Write a Test**

```typescript
import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login-page';

test('should login successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigateTo();
  await loginPage.login('user@example.com', 'password123');
  
  expect(page.url()).toContain('/dashboard');
});
```

3. **Run Tests**

```bash
npx playwright test
```

## Configuration

Create a `.env` file in your project root:

```env
BASE_URL=http://localhost:3000
TIMEOUT=30000
HEADLESS=true
ENVIRONMENT=dev
```

## Project Structure

```
my-automation-project/
├── pages/
│   ├── login-page.ts
│   └── dashboard-page.ts
├── steps/
│   └── login-steps.ts
├── tests/
│   └── login.spec.ts
├── .env
├── playwright.config.ts
└── package.json
```

## Installation

### Prerequisites

- **Node.js** 16+ ([Download](https://nodejs.org/))
- **npm** 7+ (comes with Node.js)

### Setup Steps

1. **Create a new project**
```bash
mkdir my-test-project
cd my-test-project
npm init -y
```

2. **Install the framework**
```bash
npm install @shivam/playwright-typescript @playwright/test
npx playwright install
```

3. **Create project structure**
```bash
mkdir -p src/pages src/tests
```

4. **Create playwright.config.ts**
```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src/tests',
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
```

5. **Create tsconfig.json**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "moduleResolution": "node"
  },
  "include": ["src/**/*"]
}
```

6. **Create .env**
```env
BASE_URL=http://localhost:3000
```

## Available Commands

```bash
# Run tests
npm test

# Run tests in headed mode
npm run test:headed

# Run tests in debug mode
npm run test:debug

# Run tests in UI mode
npm run test:ui
```

## Browser Support

- ✅ Chromium
- ✅ Firefox
- ✅ WebKit (Safari)

## Common Methods

### Navigation
```typescript
await page.goto('/login');
await page.url();
await page.title();
```

### Element Interaction
```typescript
await page.click(selector);
await page.fill(selector, text);
await page.textContent(selector);
await page.getAttribute(selector, 'attribute');
```

### Waits
```typescript
await page.waitForSelector(selector);
await page.waitForNavigation();
```

### Assertions
```typescript
expect(page.url()).toContain('/dashboard');
expect(await page.isVisible(selector)).toBeTruthy();
```

## Best Practices

1. **Use Page Object Model** - Encapsulate page elements and interactions
2. **Meaningful Names** - Use descriptive names for pages and tests
3. **Arrange-Act-Assert** - Follow AAA pattern in tests
4. **Avoid Hard Waits** - Use explicit waits instead of `wait()`
5. **Configuration** - Use environment variables for configuration
6. **Error Handling** - Always handle errors gracefully

## Contributing

We welcome contributions! Please feel free to submit pull requests.

## License

MIT License - See [LICENSE](./LICENSE) file for details

## API Reference

### BasePage Class

```typescript
import { BasePage } from '@shivam/playwright-typescript';

export class MyPage extends BasePage {
  async navigateTo(url: string) {
    await this.page.goto(url);
  }

  async click(selector: string) {
    await this.page.click(selector);
  }

  async fill(selector: string, text: string) {
    await this.page.fill(selector, text);
  }

  async getText(selector: string) {
    return await this.page.textContent(selector);
  }
}
```

### Logger

```typescript
import { Logger } from '@shivam/playwright-typescript';

Logger.info('Test started');
Logger.debug('Debug information');
Logger.warn('Warning message');
Logger.error('Error occurred', error);
```

### Settings

```typescript
import { Settings } from '@shivam/playwright-typescript';

const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
const timeout = 30000;
```

## Troubleshooting

### Playwright browsers not installed
```bash
npx playwright install
```

### Tests not found
- Ensure test files are in the `testDir` specified in `playwright.config.ts`
- Test files should end with `.spec.ts` or `.test.ts`

### Cannot connect to application
- Verify `BASE_URL` in `.env` file
- Ensure your application is running
- Check firewall settings

## Contributing

Contributions are welcome! Please feel free to submit pull requests.

## License

MIT License - See [LICENSE](./LICENSE) file for details

## Support

- 🐛 [Report Issues](https://github.com/shivam/playwright-typescript/issues)
- 💬 [Discussions](https://github.com/shivam/playwright-typescript/discussions)

---

**Version**: 2.0.5  
**Last Updated**: December 2024  
**License**: MIT
