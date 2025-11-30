# ARI Automation Framework - Quick Reference

## Installation

```bash
npm install @leadventure/ari-automation-framework @playwright/test
npx playwright install
```

## Project Setup

```bash
mkdir my-automation-project && cd my-automation-project
npm init -y
npm install @leadventure/ari-automation-framework @playwright/test
npx playwright install
mkdir -p src/{pages,steps,tests}
```

## Configuration

### .env File
```env
BASE_URL=http://localhost:3000
TIMEOUT=30000
HEADLESS=true
ENVIRONMENT=dev
```

### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "baseUrl": "./src",
    "paths": {
      "@base/*": ["base/*"],
      "@pages/*": ["pages/*"]
    }
  }
}
```

## Page Object Example

```typescript
import { BasePage } from '@leadventure/ari-automation-framework';
import { IParallelConfig } from '@leadventure/ari-automation-framework';

export class LoginPage extends BasePage {
  private readonly usernameInput = 'input[name="username"]';
  private readonly passwordInput = 'input[name="password"]';
  private readonly loginButton = 'button[type="submit"]';

  constructor(parallelConfig: IParallelConfig) {
    super(parallelConfig);
  }

  async login(username: string, password: string): Promise<void> {
    await this.fillText(this.usernameInput, username);
    await this.fillText(this.passwordInput, password);
    await this.click(this.loginButton);
  }

  async getErrorMessage(): Promise<string> {
    return this.getText('.error-message');
  }
}
```

## Test Example

```typescript
import { test, expect } from '@leadventure/ari-automation-framework';
import { LoginPage } from '../pages/login-page';

test('should login successfully', async ({ parallelConfig }) => {
  const loginPage = new LoginPage(parallelConfig);
  await loginPage.navigateTo('/login');
  await loginPage.login('user@example.com', 'password123');
  
  expect(loginPage.getCurrentUrl()).toContain('/dashboard');
});
```

## Common Methods

### Navigation
```typescript
await page.navigateTo('/login');
await page.getCurrentUrl();
await page.getPageTitle();
await page.refreshPage();
```

### Element Interaction
```typescript
await page.click(selector);
await page.fillText(selector, text);
await page.getText(selector);
await page.getAttribute(selector, 'attribute');
await page.selectOption(selector, value);
```

### Waits
```typescript
await page.waitForElement(selector);
await page.waitForElementHidden(selector);
```

### Checks
```typescript
await page.isVisible(selector);
await page.isEnabled(selector);
await page.isChecked(selector);
```

### Advanced
```typescript
await page.hover(selector);
await page.doubleClick(selector);
await page.rightClick(selector);
await page.takeScreenshot('filename');
await page.executeScript<T>(script, ...args);
```

## Assertions (BaseStep)

```typescript
step.assert(condition, message);
step.assertEqual(actual, expected, message);
step.assertNotEqual(actual, unexpected, message);
step.assertTrue(value, message);
step.assertFalse(value, message);
step.assertNull(value, message);
step.assertNotNull(value, message);
step.assertContains(text, substring, message);
```

## Logging

```typescript
import { Logger } from '@leadventure/ari-automation-framework';

Logger.info('Information message');
Logger.debug('Debug message');
Logger.warn('Warning message');
Logger.error('Error message', error);
```

## Settings

```typescript
import { Settings } from '@leadventure/ari-automation-framework';

Settings.initialize();

const baseUrl = Settings.baseUrl;
const timeout = Settings.timeout;
const browserType = Settings.browserType;
const headless = Settings.headless;
```

## Commands

```bash
# Build
npm run build

# Run tests
npm test

# Run tests headed
npm run test:headed

# Run tests debug
npm run test:debug

# Lint
npm run lint

# Format
npm run format

# Clean
npm run clean
```

## Browser Types

```typescript
import { BrowserType } from '@leadventure/ari-automation-framework';

BrowserType.Chrome      // Chromium
BrowserType.Firefox     // Firefox
BrowserType.Safari      // WebKit
```

## Test Types

```typescript
import { TestType } from '@leadventure/ari-automation-framework';

TestType.UI             // UI Testing
TestType.API            // API Testing
TestType.Hybrid         // Hybrid Testing
```

## Execution Types

```typescript
import { ExecutionType } from '@leadventure/ari-automation-framework';

ExecutionType.Local     // Local execution
ExecutionType.Remote    // Remote execution
ExecutionType.Cloud     // Cloud execution
```

## Step Execution

```typescript
export class MySteps extends BaseStep {
  async givenSomething(): Promise<void> {
    await this.executeStep('Given something', async () => {
      // Step implementation
    });
  }

  async whenSomethingHappens(): Promise<void> {
    await this.executeStep('When something happens', async () => {
      // Step implementation
    });
  }

  async thenVerifyResult(): Promise<void> {
    await this.executeStep('Then verify result', async () => {
      // Step implementation with assertions
      this.assertTrue(condition, 'Condition should be true');
    });
  }
}
```

## File Structure

```
my-automation-project/
├── src/
│   ├── pages/
│   │   ├── login-page.ts
│   │   └── dashboard-page.ts
│   ├── steps/
│   │   └── login-steps.ts
│   └── tests/
│       └── login.spec.ts
├── .env
├── playwright.config.ts
├── tsconfig.json
└── package.json
```

## Playwright Config

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

## Useful Links

- 📖 [Framework Documentation](./FRAMEWORK-CONSTITUTION.md)
- 🚀 [Setup Guide](./SETUP-GUIDE.md)
- 📚 [Playwright Docs](https://playwright.dev/)
- 🐛 [Report Issues](https://github.com/leadventure/ari-automation-framework/issues)

## Tips & Tricks

### Use Path Aliases
```typescript
// Instead of
import { BasePage } from '../../../base/base-page';

// Use
import { BasePage } from '@base/base-page';
```

### Reuse Page Objects
```typescript
export class DashboardPage extends BasePage {
  private loginPage: LoginPage;

  constructor(parallelConfig: IParallelConfig) {
    super(parallelConfig);
    this.loginPage = new LoginPage(parallelConfig);
  }
}
```

### Create Page Hierarchies
```typescript
export class BasePage extends BasePage {
  async waitForPageLoad(): Promise<void> {
    await this.waitForElement('.page-loaded');
  }
}

export class LoginPage extends BasePage {
  // Inherits waitForPageLoad
}
```

### Use Fixtures for Setup
```typescript
test.beforeEach(async ({ parallelConfig }) => {
  // Setup before each test
  const page = new LoginPage(parallelConfig);
  await page.navigateTo('/login');
});

test.afterEach(async ({ parallelConfig }) => {
  // Cleanup after each test
});
```

---

**Version**: 2.0.5  
**Last Updated**: November 2024
