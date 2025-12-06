# Playwright TypeScript Framework

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://img.shields.io/npm/v/@shivam/playwright-typescript.svg)](https://www.npmjs.com/package/@shivam/playwright-typescript)

A modern, scalable test automation framework built on **Playwright** and **TypeScript**. Designed for maintainable test automation with support for Page Object Model, parallel execution, and comprehensive reporting.

## Features

✨ **Playwright-based** - Cross-browser automation with Chromium, Firefox, and WebKit  
🎯 **Page Object Model** - Built-in support for POM pattern  
⚡ **Parallel Execution** - Run tests in parallel for faster feedback  
� **CComprehensive Logging** - Built-in logging and reporting  
🔧 **Configuration Management** - Flexible environment-based configuration  
🏗️ **TypeScript** - Full TypeScript support with strict type checking  

## Installation

```bash
npm install @shivam/playwright-typescript @playwright/test
npx playwright install
```

## Quick Start

### Create a Page Object

```typescript
import { BasePage } from '@shivam/playwright-typescript';

export class LoginPage extends BasePage {
  async login(username: string, password: string) {
    await this.page.fill('input[name="username"]', username);
    await this.page.fill('input[name="password"]', password);
    await this.page.click('button[type="submit"]');
  }
}
```

### Write a Test

```typescript
import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login-page';

test('should login successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login('user@example.com', 'password123');
  
  expect(page.url()).toContain('/dashboard');
});
```

## API Reference

### BasePage

Base class for creating page objects with built-in Playwright methods.

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

Comprehensive logging with multiple log levels.

```typescript
import { Logger } from '@shivam/playwright-typescript';

Logger.info('Test started');
Logger.debug('Debug information');
Logger.warn('Warning message');
Logger.error('Error occurred', error);
```

### Settings

Access configuration from environment variables.

```typescript
import { Settings } from '@shivam/playwright-typescript';

const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
```

## Browser Support

- ✅ Chromium
- ✅ Firefox
- ✅ WebKit (Safari)

## Best Practices

1. **Use Page Object Model** - Encapsulate page elements and interactions
2. **Meaningful Names** - Use descriptive names for pages and tests
3. **Arrange-Act-Assert** - Follow AAA pattern in tests
4. **Avoid Hard Waits** - Use explicit waits instead of `wait()`
5. **Configuration** - Use environment variables for configuration
6. **Error Handling** - Always handle errors gracefully

## Project Setup

Create your project structure:

```bash
mkdir my-test-project
cd my-test-project
npm init -y
npm install @shivam/playwright-typescript @playwright/test
npx playwright install
mkdir -p src/pages src/tests
```

Create `playwright.config.ts`:

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

Create `tsconfig.json`:

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

Create `.env`:

```env
BASE_URL=http://localhost:3000
```

## Running Tests

```bash
# Run all tests
npx playwright test

# Run in headed mode
npx playwright test --headed

# Run in debug mode
npx playwright test --debug

# Run in UI mode
npx playwright test --ui
```

## Contributing

Contributions are welcome! Please feel free to submit pull requests.

## License

MIT License - See [LICENSE](./LICENSE) file for details

## Support

- 🐛 [Report Issues](https://github.com/shivam/playwright-typescript/issues)
- 💬 [Discussions](https://github.com/shivam/playwright-typescript/discussions)
- 📚 [Playwright Docs](https://playwright.dev/)

---

**Version**: 2.0.5  
**License**: MIT
