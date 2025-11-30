# ARI Automation Framework - Framework Constitution

## Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Core Components](#core-components)
4. [Project Structure](#project-structure)
5. [Installation & Setup](#installation--setup)
6. [Configuration](#configuration)
7. [Usage Guide](#usage-guide)
8. [Best Practices](#best-practices)
9. [API Reference](#api-reference)
10. [Contributing](#contributing)

---

## Overview

The ARI Automation Framework is an enterprise-grade test automation framework built on **Playwright** and **TypeScript**. It provides a robust, scalable, and maintainable foundation for building comprehensive test automation solutions.

### Key Features

- **Playwright-based**: Leverages the power of Playwright for cross-browser automation
- **TypeScript Support**: Full TypeScript support with strict type checking
- **Page Object Model**: Built-in support for Page Object Model pattern
- **BDD Ready**: Designed to work seamlessly with BDD frameworks
- **Parallel Execution**: Support for parallel test execution
- **Comprehensive Logging**: Built-in logging and reporting capabilities
- **Configuration Management**: Flexible configuration system
- **NPM Package**: Distributed as an npm package for easy consumption
- **Cross-browser**: Support for Chrome, Firefox, and Safari

### Target Audience

- QA Engineers and Test Automation Specialists
- Development Teams building test automation solutions
- Organizations requiring enterprise-grade automation frameworks

---

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Test Layer                            │
│              (Test Specs & Step Definitions)             │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│                  Page Object Layer                       │
│         (BasePage, Page Objects, Components)            │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│                   Base Layer                             │
│    (Base, BasePage, BaseStep, DriverContext)            │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│              Browser Factory Layer                       │
│         (Browser Launch, Context Management)            │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│                Playwright Layer                          │
│         (Browser, Context, Page, Locator)               │
└─────────────────────────────────────────────────────────┘
```

### Design Patterns

1. **Page Object Model (POM)**: Encapsulates page elements and interactions
2. **Factory Pattern**: BrowserFactory for browser instance creation
3. **Singleton Pattern**: Settings and Logger classes
4. **Template Method Pattern**: Base classes define test execution flow
5. **Strategy Pattern**: Different browser strategies for execution

---

## Core Components

### 1. Base Classes

#### Base
- **Purpose**: Foundation class for all automation classes
- **Responsibilities**: 
  - Provide access to DriverContext
  - Offer utility methods for page and step classes
  - Handle logging and assertions
- **Key Methods**:
  - `createPageInstance<T>()`: Create page instances
  - `as<T>()`: Cast to specific page type
  - `wait()`: Wait for specified duration
  - `log()`, `logDebug()`, `logWarn()`, `logError()`: Logging methods

#### BasePage
- **Purpose**: Base class for all page objects
- **Responsibilities**:
  - Encapsulate page elements and interactions
  - Provide element interaction methods
  - Handle page navigation and assertions
- **Key Methods**:
  - `$()`, `$$()`: Find elements
  - `click()`, `fillText()`, `getText()`: Element interactions
  - `waitForElement()`, `waitForElementHidden()`: Wait conditions
  - `takeScreenshot()`: Capture screenshots
  - `executeScript()`: Execute JavaScript

#### BaseStep
- **Purpose**: Base class for BDD step definitions
- **Responsibilities**:
  - Provide step execution utilities
  - Offer assertion methods
  - Handle step logging
- **Key Methods**:
  - `executeStep()`: Execute step with error handling
  - `assert()`, `assertEqual()`, `assertNotEqual()`: Assertions
  - `assertTrue()`, `assertFalse()`: Boolean assertions
  - `assertNull()`, `assertNotNull()`: Null assertions
  - `assertContains()`: String assertions

### 2. Configuration Management

#### Settings
- **Purpose**: Global configuration for test execution
- **Responsibilities**:
  - Store and manage test settings
  - Provide access to configuration values
  - Initialize settings from environment
- **Key Properties**:
  - `timeout`: Element interaction timeout
  - `baseUrl`: Application URL
  - `browserType`: Browser for execution
  - `headless`: Headless mode flag
  - `incognito`: Incognito mode flag
  - `environment`: Test environment

#### ConfigReader
- **Purpose**: Load and parse configuration from various sources
- **Responsibilities**:
  - Load .env files
  - Parse JSON configuration
  - Provide configuration access methods
- **Key Methods**:
  - `loadConfiguration()`: Load all configuration sources
  - `get()`, `getString()`, `getNumber()`, `getBoolean()`: Get config values

### 3. Browser Management

#### BrowserFactory
- **Purpose**: Create and manage browser instances
- **Responsibilities**:
  - Launch browsers
  - Create browser contexts
  - Create pages
  - Cleanup resources
- **Key Methods**:
  - `launchBrowser()`: Launch browser instance
  - `createContext()`: Create browser context
  - `createPage()`: Create new page
  - `closePage()`, `closeContext()`, `closeBrowser()`: Cleanup
  - `closeAllBrowsers()`: Close all resources

#### DriverContext
- **Purpose**: Manage browser and page instances for test
- **Responsibilities**:
  - Provide access to page and context
  - Handle page navigation
  - Manage browser state
- **Key Methods**:
  - `getPage()`, `getContext()`: Get instances
  - `goToUrl()`: Navigate to URL
  - `getCurrentUrl()`, `getPageTitle()`: Get page info
  - `refreshPage()`, `goBack()`, `goForward()`: Navigation
  - `setViewportSize()`: Set viewport

### 4. Logging

#### Logger
- **Purpose**: Provide comprehensive logging functionality
- **Responsibilities**:
  - Log to file and console
  - Manage log files
  - Format log messages
- **Key Methods**:
  - `debug()`, `info()`, `warn()`, `error()`: Log methods
  - `initialize()`: Initialize logger
  - `getLogFilePath()`: Get log file path

---

## Project Structure

```
ari-automation-framework/
├── src/
│   ├── base/
│   │   ├── base.ts                    # Base class
│   │   ├── base-page.ts               # Base page class
│   │   ├── base-step.ts               # Base step class
│   │   ├── driver-context.ts          # Driver context
│   │   ├── browser-factory.ts         # Browser factory
│   │   ├── test-initialize-hook.ts    # Test initialization
│   │   └── index.ts                   # Module exports
│   ├── config/
│   │   ├── settings.ts                # Global settings
│   │   ├── config-reader.ts           # Configuration reader
│   │   └── index.ts                   # Module exports
│   ├── helpers/
│   │   ├── logger.ts                  # Logger utility
│   │   └── index.ts                   # Module exports
│   ├── types/
│   │   └── index.ts                   # Type definitions
│   └── index.ts                       # Main entry point
├── examples/
│   ├── pages/
│   │   └── login-page.ts              # Example page object
│   ├── steps/
│   │   └── login-steps.ts             # Example steps
│   └── tests/
│       └── login.spec.ts              # Example test
├── tests/                             # Test files
├── playwright.config.ts               # Playwright configuration
├── tsconfig.json                      # TypeScript configuration
├── package.json                       # NPM package configuration
├── .env.example                       # Environment variables example
├── FRAMEWORK-CONSTITUTION.md          # This file
├── README.md                          # Quick start guide
└── LICENSE                            # License file
```

---

## Installation & Setup

### Prerequisites

- Node.js 16+ and npm
- Git (for version control)

### Installation Steps

#### 1. Install as NPM Package

```bash
npm install @leadventure/ari-automation-framework
```

#### 2. Install Playwright Browsers

```bash
npx playwright install
```

#### 3. Create Project Structure

```bash
mkdir my-automation-project
cd my-automation-project
npm init -y
npm install @leadventure/ari-automation-framework @playwright/test
```

#### 4. Create Configuration Files

Create `.env` file:
```env
BASE_URL=http://localhost:3000
TIMEOUT=30000
HEADLESS=true
ENVIRONMENT=dev
```

Create `playwright.config.ts`:
```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
  ],
});
```

---

## Configuration

### Environment Variables

| Variable | Type | Default | Description |
|----------|------|---------|-------------|
| `BASE_URL` | string | http://localhost:3000 | Application URL |
| `TIMEOUT` | number | 30000 | Element interaction timeout (ms) |
| `HEADLESS` | boolean | true | Run browser in headless mode |
| `INCOGNITO` | boolean | false | Run browser in incognito mode |
| `ENVIRONMENT` | string | dev | Test environment |
| `ENABLE_LOGGING` | boolean | true | Enable logging |
| `REMOTE_URL` | string | - | Remote browser URL |
| `BUILD_NAME` | string | Local Build | Build name for reporting |

### Settings Class

Access settings programmatically:

```typescript
import { Settings } from '@leadventure/ari-automation-framework';

// Get individual settings
const timeout = Settings.timeout;
const baseUrl = Settings.baseUrl;

// Get all settings
const allSettings = Settings.getAll();

// Initialize from environment
Settings.initialize();
```

---

## Usage Guide

### Creating a Page Object

```typescript
import { BasePage } from '@leadventure/ari-automation-framework';
import { IParallelConfig } from '@leadventure/ari-automation-framework';

export class HomePage extends BasePage {
  private readonly searchInput = 'input[placeholder="Search"]';
  private readonly searchButton = 'button[type="submit"]';

  constructor(parallelConfig: IParallelConfig) {
    super(parallelConfig);
  }

  async navigateToHome(): Promise<void> {
    await this.navigateTo('/');
  }

  async search(query: string): Promise<void> {
    await this.fillText(this.searchInput, query);
    await this.click(this.searchButton);
  }

  async getSearchResults(): Promise<string[]> {
    const results = await this.$$('.search-result');
    const texts: string[] = [];
    for (const result of results) {
      const text = await result.textContent();
      if (text) texts.push(text);
    }
    return texts;
  }
}
```

### Creating Step Definitions

```typescript
import { BaseStep } from '@leadventure/ari-automation-framework';
import { IParallelConfig } from '@leadventure/ari-automation-framework';
import { HomePage } from './pages/home-page';

export class SearchSteps extends BaseStep {
  private homePage: HomePage;

  constructor(parallelConfig: IParallelConfig) {
    super(parallelConfig);
    this.homePage = new HomePage(parallelConfig);
  }

  async givenUserIsOnHomePage(): Promise<void> {
    await this.executeStep('User is on home page', async () => {
      await this.homePage.navigateToHome();
    });
  }

  async whenUserSearchesFor(query: string): Promise<void> {
    await this.executeStep(`User searches for "${query}"`, async () => {
      await this.homePage.search(query);
    });
  }

  async thenUserShouldSeeResults(): Promise<void> {
    await this.executeStep('User should see search results', async () => {
      const results = await this.homePage.getSearchResults();
      this.assertTrue(results.length > 0, 'Search results should not be empty');
    });
  }
}
```

### Writing Tests

```typescript
import { test, expect } from '@leadventure/ari-automation-framework';
import { HomePage } from './pages/home-page';

test.describe('Search Functionality', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ parallelConfig }) => {
    homePage = new HomePage(parallelConfig);
    await homePage.navigateToHome();
  });

  test('should search and display results', async ({ parallelConfig }) => {
    // Arrange
    const searchQuery = 'automation';

    // Act
    await homePage.search(searchQuery);

    // Assert
    const results = await homePage.getSearchResults();
    expect(results.length).toBeGreaterThan(0);
  });
});
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in headed mode
npm run test:headed

# Run tests in debug mode
npm run test:debug

# Run specific test file
npx playwright test tests/login.spec.ts

# Run tests with specific browser
npx playwright test --project=chromium
```

---

## Best Practices

### 1. Page Object Model

- **Encapsulate selectors**: Keep selectors private within page classes
- **Meaningful method names**: Use descriptive names for page interactions
- **Single responsibility**: Each page class should represent one page
- **Reusable methods**: Create methods for common interactions

```typescript
// Good
export class LoginPage extends BasePage {
  private readonly usernameInput = 'input[name="username"]';
  
  async login(username: string, password: string): Promise<void> {
    await this.fillText(this.usernameInput, username);
    // ...
  }
}

// Avoid
export class LoginPage extends BasePage {
  async login(): Promise<void> {
    await this.getPage().locator('input[name="username"]').fill('user');
    // ...
  }
}
```

### 2. Test Organization

- **Group related tests**: Use `test.describe()` for test grouping
- **Clear test names**: Use descriptive test names
- **Arrange-Act-Assert**: Follow AAA pattern
- **One assertion per test**: Keep tests focused

```typescript
test.describe('Login', () => {
  test('should login with valid credentials', async ({ parallelConfig }) => {
    // Arrange
    const loginPage = new LoginPage(parallelConfig);
    
    // Act
    await loginPage.login('user@example.com', 'password');
    
    // Assert
    expect(loginPage.getCurrentUrl()).toContain('/dashboard');
  });
});
```

### 3. Error Handling

- **Use try-catch**: Wrap async operations
- **Log errors**: Always log errors for debugging
- **Meaningful messages**: Provide context in error messages

```typescript
async login(username: string, password: string): Promise<void> {
  try {
    await this.fillText(this.usernameInput, username);
    await this.fillText(this.passwordInput, password);
    await this.click(this.loginButton);
  } catch (error) {
    this.logError('Login failed', error);
    throw error;
  }
}
```

### 4. Waits and Timeouts

- **Use explicit waits**: Avoid hard waits when possible
- **Set appropriate timeouts**: Use reasonable timeout values
- **Wait for specific conditions**: Wait for elements to be visible/enabled

```typescript
// Good
await this.waitForElement(this.successMessage);

// Avoid
await this.wait(5000); // Hard wait
```

### 5. Logging

- **Log important steps**: Log key actions and assertions
- **Use appropriate log levels**: Debug, Info, Warn, Error
- **Include context**: Add relevant data to log messages

```typescript
this.logInfo('Logging in with username: ' + username);
this.logDebug('Element found: ' + selector);
this.logWarn('Timeout waiting for element');
this.logError('Login failed', error);
```

### 6. Configuration Management

- **Use environment variables**: Store configuration in .env
- **Avoid hardcoding**: Never hardcode URLs, credentials, or timeouts
- **Use Settings class**: Access configuration through Settings class

```typescript
// Good
const baseUrl = Settings.baseUrl;
const timeout = Settings.timeout;

// Avoid
const baseUrl = 'http://localhost:3000';
const timeout = 30000;
```

---

## API Reference

### Base Class

```typescript
class Base {
  constructor(parallelConfig: IParallelConfig)
  protected getDriverContext(): DriverContext
  protected getParallelConfig(): IParallelConfig
  protected createPageInstance<T extends Base>(PageClass: new (config: IParallelConfig) => T): T
  as<T extends Base>(): T
  protected async wait(milliseconds: number): Promise<void>
  protected log(message: string): void
  protected logDebug(message: string): void
  protected logWarn(message: string): void
  protected logError(message: string, error?: unknown): void
}
```

### BasePage Class

```typescript
class BasePage extends Base {
  constructor(parallelConfig: IParallelConfig)
  protected getPage(): Page
  protected async navigateTo(url: string): Promise<void>
  protected $(selector: string): Locator
  protected async $$(selector: string): Promise<Locator[]>
  protected async click(selector: string): Promise<void>
  protected async fillText(selector: string, text: string): Promise<void>
  protected async getText(selector: string): Promise<string>
  protected async getAttribute(selector: string, attributeName: string): Promise<string | null>
  protected async isVisible(selector: string): Promise<boolean>
  protected async isEnabled(selector: string): Promise<boolean>
  protected async isChecked(selector: string): Promise<boolean>
  protected async waitForElement(selector: string, timeout?: number): Promise<void>
  protected async waitForElementHidden(selector: string, timeout?: number): Promise<void>
  protected async hover(selector: string): Promise<void>
  protected async doubleClick(selector: string): Promise<void>
  protected async rightClick(selector: string): Promise<void>
  protected async selectOption(selector: string, value: string): Promise<void>
  protected getCurrentUrl(): string
  protected async getPageTitle(): Promise<string>
  protected async takeScreenshot(fileName: string): Promise<void>
  protected async refreshPage(): Promise<void>
  protected async executeScript<T>(script: string, ...args: unknown[]): Promise<T>
}
```

### BaseStep Class

```typescript
class BaseStep extends Base {
  constructor(parallelConfig: IParallelConfig)
  protected async executeStep(stepName: string, stepFunction: () => Promise<void>): Promise<void>
  protected assert(condition: boolean, message: string): void
  protected assertEqual(actual: unknown, expected: unknown, message: string): void
  protected assertNotEqual(actual: unknown, unexpected: unknown, message: string): void
  protected assertContains(text: string, substring: string, message: string): void
  protected assertTrue(value: unknown, message: string): void
  protected assertFalse(value: unknown, message: string): void
  protected assertNull(value: unknown, message: string): void
  protected assertNotNull(value: unknown, message: string): void
}
```

### Logger Class

```typescript
class Logger {
  static initialize(): void
  static debug(message: string, data?: unknown): void
  static info(message: string, data?: unknown): void
  static warn(message: string, data?: unknown): void
  static error(message: string, error?: unknown): void
  static getLogFilePath(): string
}
```

### Settings Class

```typescript
class Settings {
  static timeout: number
  static baseUrl: string
  static testType: TestType
  static executionType: ExecutionType
  static browserType: BrowserType
  static headless: boolean
  static incognito: boolean
  static logPath: string
  static enableLogging: boolean
  static environment: string
  static initialize(): void
  static getAll(): ITestSettings
}
```

---

## Contributing

### Development Setup

```bash
# Clone repository
git clone https://github.com/leadventure/ari-automation-framework.git
cd ari-automation-framework

# Install dependencies
npm install

# Build framework
npm run build

# Run tests
npm test

# Format code
npm run format

# Lint code
npm run lint
```

### Code Style

- Use TypeScript strict mode
- Follow ESLint rules
- Format code with Prettier
- Add JSDoc comments to all public methods
- Write meaningful commit messages

### Pull Request Process

1. Create feature branch: `git checkout -b feature/feature-name`
2. Make changes and commit: `git commit -m "Add feature"`
3. Push to branch: `git push origin feature/feature-name`
4. Create Pull Request with description
5. Ensure all tests pass
6. Request review from maintainers

---

## License

MIT License - See LICENSE file for details

## Support

For issues, questions, or contributions, please visit:
- GitHub: https://github.com/leadventure/ari-automation-framework
- Issues: https://github.com/leadventure/ari-automation-framework/issues

---

**Version**: 2.0.5  
**Last Updated**: November 2024  
**Maintained by**: LeadVenture
