# Shivam Playwright-Typescript

[![npm version](https://img.shields.io/npm/v/@shivam/playwright-typescript.svg)](https://www.npmjs.com/package/@shivam/playwright-typescript)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

An enterprise-grade test automation framework built on **Playwright** and **TypeScript**. Designed for scalable, maintainable test automation with support for BDD, parallel execution, and comprehensive reporting.

## Features

✨ **Playwright-based** - Cross-browser automation with Chromium, Firefox, and WebKit  
🎯 **Page Object Model** - Built-in support for POM pattern  
📝 **BDD Ready** - Seamless integration with BDD frameworks  
⚡ **Parallel Execution** - Run tests in parallel for faster feedback  
📊 **Comprehensive Logging** - Built-in logging and reporting  
🔧 **Configuration Management** - Flexible environment-based configuration  
📦 **NPM Package** - Easy distribution and consumption  
🏗️ **TypeScript** - Full TypeScript support with strict type checking  

## Quick Start

### Installation

```bash
npm install @shivam/playwright-typescript @playwright/test
npx playwright install
```

### Create Your First Test

1. **Create a Page Object**

```typescript
import { BasePage } from '@shivam/playwright-typescript';
import { IParallelConfig } from '@shivam/playwright-typescript';

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
}
```

2. **Write a Test**

```typescript
import { test, expect } from '@shivam/playwright-typescript';
import { LoginPage } from './pages/login-page';

test('should login successfully', async ({ parallelConfig }) => {
  const loginPage = new LoginPage(parallelConfig);
  await loginPage.navigateTo('/login');
  await loginPage.login('user@example.com', 'password123');
  
  expect(loginPage.getCurrentUrl()).toContain('/dashboard');
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

## Documentation

For comprehensive documentation, see [FRAMEWORK-CONSTITUTION.md](./FRAMEWORK-CONSTITUTION.md)

### Key Topics

- [Architecture](./FRAMEWORK-CONSTITUTION.md#architecture)
- [Core Components](./FRAMEWORK-CONSTITUTION.md#core-components)
- [Installation & Setup](./FRAMEWORK-CONSTITUTION.md#installation--setup)
- [Configuration](./FRAMEWORK-CONSTITUTION.md#configuration)
- [Usage Guide](./FRAMEWORK-CONSTITUTION.md#usage-guide)
- [Best Practices](./FRAMEWORK-CONSTITUTION.md#best-practices)
- [API Reference](./FRAMEWORK-CONSTITUTION.md#api-reference)

## Examples

Check the `examples/` directory for complete examples:

- [Login Page Object](./examples/pages/login-page.ts)
- [Login Steps](./examples/steps/login-steps.ts)
- [Login Test](./examples/tests/login.spec.ts)

## Available Commands

```bash
# Build the framework
npm run build

# Run tests
npm test

# Run tests in headed mode
npm run test:headed

# Run tests in debug mode
npm run test:debug

# Lint code
npm run lint

# Format code
npm run format

# Clean build artifacts
npm run clean
```

## Browser Support

- ✅ Chromium
- ✅ Firefox
- ✅ WebKit (Safari)

## API Highlights

### BasePage Methods

```typescript
// Navigation
await page.navigateTo('/login');

// Element Interaction
await page.click(selector);
await page.fillText(selector, text);
await page.getText(selector);

// Waits
await page.waitForElement(selector);
await page.waitForElementHidden(selector);

// Assertions
await page.isVisible(selector);
await page.isEnabled(selector);
```

### BaseStep Methods

```typescript
// Step Execution
await step.executeStep(name, async () => { /* ... */ });

// Assertions
step.assert(condition, message);
step.assertEqual(actual, expected, message);
step.assertTrue(value, message);
step.assertContains(text, substring, message);
```

### Logger

```typescript
import { Logger } from '@shivam/playwright-typescript';

Logger.info('Test started');
Logger.debug('Debug information');
Logger.warn('Warning message');
Logger.error('Error occurred', error);
```

## Best Practices

1. **Use Page Object Model** - Encapsulate page elements and interactions
2. **Meaningful Names** - Use descriptive names for pages, steps, and tests
3. **Arrange-Act-Assert** - Follow AAA pattern in tests
4. **Avoid Hard Waits** - Use explicit waits instead of `wait()`
5. **Log Appropriately** - Use logging for debugging and reporting
6. **Configuration** - Use environment variables for configuration
7. **Error Handling** - Always handle errors gracefully

## Contributing

We welcome contributions! Please see [FRAMEWORK-CONSTITUTION.md#contributing](./FRAMEWORK-CONSTITUTION.md#contributing) for guidelines.

## License

MIT License - See [LICENSE](./LICENSE) file for details

## Support

- 📖 [Documentation](./FRAMEWORK-CONSTITUTION.md)
- 🐛 [Report Issues](https://github.com/shivam/playwright-typescript/issues)
- 💬 [Discussions](https://github.com/shivam/playwright-typescript/discussions)

## Version History

### v2.0.5
- Initial TypeScript/Playwright conversion
- Page Object Model support
- BDD-ready architecture
- Comprehensive logging
- NPM package distribution

---

**Maintained by**: Shivam  
**Last Updated**: November 2024
