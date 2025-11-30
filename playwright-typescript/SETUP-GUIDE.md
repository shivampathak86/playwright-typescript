# ARI Automation Framework - Setup Guide

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Project Setup](#project-setup)
4. [Configuration](#configuration)
5. [Verification](#verification)
6. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before setting up the ARI Automation Framework, ensure you have:

- **Node.js**: Version 16 or higher
  - Download from: https://nodejs.org/
  - Verify installation: `node --version`

- **npm**: Version 7 or higher (comes with Node.js)
  - Verify installation: `npm --version`

- **Git**: For version control
  - Download from: https://git-scm.com/
  - Verify installation: `git --version`

- **Text Editor/IDE**: 
  - Recommended: Visual Studio Code (https://code.visualstudio.com/)
  - Or any TypeScript-compatible editor

---

## Installation

### Step 1: Create Project Directory

```bash
mkdir my-automation-project
cd my-automation-project
```

### Step 2: Initialize NPM Project

```bash
npm init -y
```

This creates a `package.json` file with default settings.

### Step 3: Install Framework and Dependencies

```bash
npm install @leadventure/ari-automation-framework @playwright/test
```

### Step 4: Install Playwright Browsers

```bash
npx playwright install
```

This downloads the browser binaries for Chromium, Firefox, and WebKit.

### Step 5: Install TypeScript and Development Dependencies

```bash
npm install --save-dev typescript @types/node
```

### Step 6: Initialize TypeScript Configuration

```bash
npx tsc --init
```

This creates a `tsconfig.json` file. Update it with the configuration from the framework documentation.

---

## Project Setup

### Step 1: Create Project Structure

```bash
mkdir -p src/pages src/steps src/tests
mkdir -p logs screenshots
```

### Step 2: Create Configuration Files

#### Create `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "sourceMap": true,
    "moduleResolution": "node",
    "baseUrl": "./src",
    "paths": {
      "@base/*": ["base/*"],
      "@config/*": ["config/*"],
      "@helpers/*": ["helpers/*"],
      "@pages/*": ["pages/*"],
      "@steps/*": ["steps/*"],
      "@types/*": ["types/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

#### Create `playwright.config.ts`

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src/tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'test-results/results.json' }],
  ],
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
```

#### Create `.env`

```env
BASE_URL=http://localhost:3000
TIMEOUT=30000
HEADLESS=true
INCOGNITO=false
ENVIRONMENT=dev
ENABLE_LOGGING=true
```

### Step 3: Update `package.json`

Add scripts section:

```json
{
  "scripts": {
    "build": "tsc",
    "test": "playwright test",
    "test:headed": "playwright test --headed",
    "test:debug": "playwright test --debug",
    "test:ui": "playwright test --ui",
    "clean": "rm -rf dist test-results playwright-report"
  }
}
```

### Step 4: Create Example Page Object

Create `src/pages/login-page.ts`:

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

  async navigateToLoginPage(): Promise<void> {
    await this.navigateTo('/login');
    await this.waitForElement(this.usernameInput);
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

### Step 5: Create Example Test

Create `src/tests/login.spec.ts`:

```typescript
import { test, expect } from '@leadventure/ari-automation-framework';
import { LoginPage } from '../pages/login-page';

test.describe('Login Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ parallelConfig }) => {
    loginPage = new LoginPage(parallelConfig);
    await loginPage.navigateToLoginPage();
  });

  test('should login with valid credentials', async ({ parallelConfig }) => {
    await loginPage.login('user@example.com', 'password123');
    expect(loginPage.getCurrentUrl()).toContain('/dashboard');
  });
});
```

---

## Configuration

### Environment Variables

The framework uses environment variables for configuration. Create a `.env` file in your project root:

```env
# Application URL
BASE_URL=http://localhost:3000

# Timeout for element interactions (milliseconds)
TIMEOUT=30000

# Run in headless mode
HEADLESS=true

# Run in incognito mode
INCOGNITO=false

# Test environment
ENVIRONMENT=dev

# Enable logging
ENABLE_LOGGING=true
```

### Accessing Configuration

In your code, use the `Settings` class:

```typescript
import { Settings } from '@leadventure/ari-automation-framework';

// Initialize settings from environment
Settings.initialize();

// Access settings
const baseUrl = Settings.baseUrl;
const timeout = Settings.timeout;
const browserType = Settings.browserType;
```

---

## Verification

### Step 1: Build the Project

```bash
npm run build
```

This compiles TypeScript to JavaScript. Check for any compilation errors.

### Step 2: Run a Test

```bash
npm test
```

This runs all tests in the `src/tests` directory.

### Step 3: View Test Report

After tests complete, open the HTML report:

```bash
npx playwright show-report
```

---

## Troubleshooting

### Issue: `npm install` fails

**Solution**: 
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

### Issue: Playwright browsers not installed

**Solution**:
```bash
npx playwright install
```

### Issue: TypeScript compilation errors

**Solution**:
- Ensure `tsconfig.json` is properly configured
- Check for missing type definitions: `npm install --save-dev @types/node`
- Verify TypeScript version: `npx tsc --version`

### Issue: Tests not found

**Solution**:
- Ensure test files are in `src/tests` directory
- Test files should end with `.spec.ts` or `.test.ts`
- Check `playwright.config.ts` for correct `testDir`

### Issue: Cannot find module errors

**Solution**:
- Verify path aliases in `tsconfig.json`
- Ensure imports use correct paths
- Rebuild project: `npm run build`

### Issue: Browser fails to launch

**Solution**:
- Reinstall browsers: `npx playwright install`
- Check system dependencies (for Linux):
  ```bash
  npx playwright install-deps
  ```
- Verify browser path in settings

### Issue: Tests timeout

**Solution**:
- Increase `TIMEOUT` in `.env` file
- Check if application is running
- Verify `BASE_URL` is correct
- Check network connectivity

### Issue: Cannot connect to application

**Solution**:
- Verify `BASE_URL` in `.env` file
- Ensure application is running
- Check firewall settings
- Verify network connectivity

---

## Next Steps

1. **Read the Documentation**: Review [FRAMEWORK-CONSTITUTION.md](./FRAMEWORK-CONSTITUTION.md)
2. **Explore Examples**: Check the `examples/` directory
3. **Create Page Objects**: Build page objects for your application
4. **Write Tests**: Create test cases for your features
5. **Run Tests**: Execute tests and review reports

---

## Getting Help

- 📖 [Framework Documentation](./FRAMEWORK-CONSTITUTION.md)
- 📚 [Playwright Documentation](https://playwright.dev/)
- 🐛 [Report Issues](https://github.com/leadventure/ari-automation-framework/issues)
- 💬 [Discussions](https://github.com/leadventure/ari-automation-framework/discussions)

---

**Version**: 2.0.5  
**Last Updated**: November 2024
