/**
 * Browser factory for creating and managing browser instances
 * Handles browser launch, context creation, and cleanup
 */

import { chromium, firefox, webkit, Browser, BrowserContext, Page } from '@playwright/test';
import { BrowserType, IParallelConfig } from '@types/index';
import { Settings } from '@config/settings';
import { Logger } from '@helpers/logger';

/**
 * BrowserFactory class manages browser instance creation and lifecycle
 * Supports multiple browser types and configurations
 */
export class BrowserFactory {
  private static browsers: Map<string, Browser> = new Map();
  private static contexts: Map<string, BrowserContext> = new Map();

  /**
   * Launch a browser instance
   * @param browserType - Type of browser to launch
   * @param testName - Name of the test
   * @returns Browser instance
   */
  static async launchBrowser(browserType: BrowserType, testName: string): Promise<Browser> {
    const browserKey = `${browserType}-${testName}`;

    // Return existing browser if already launched
    if (this.browsers.has(browserKey)) {
      Logger.info(`Reusing existing browser: ${browserType}`);
      return this.browsers.get(browserKey)!;
    }

    Logger.info(`Launching browser: ${browserType}`);

    let browser: Browser;

    switch (browserType) {
      case BrowserType.Chrome:
        browser = await chromium.launch({
          headless: Settings.headless,
          args: this.getChromeArgs(),
        });
        break;

      case BrowserType.Firefox:
        browser = await firefox.launch({
          headless: Settings.headless,
          args: this.getFirefoxArgs(),
        });
        break;

      case BrowserType.Safari:
        browser = await webkit.launch({
          headless: Settings.headless,
        });
        break;

      default:
        throw new Error(`Unsupported browser type: ${browserType}`);
    }

    this.browsers.set(browserKey, browser);
    Logger.info(`Browser launched successfully: ${browserType}`);

    return browser;
  }

  /**
   * Create a browser context
   * @param browser - Browser instance
   * @param testName - Name of the test
   * @returns Browser context
   */
  static async createContext(browser: Browser, testName: string): Promise<BrowserContext> {
    const contextKey = `${browser.browserType().name}-${testName}`;

    // Return existing context if already created
    if (this.contexts.has(contextKey)) {
      Logger.info(`Reusing existing context for test: ${testName}`);
      return this.contexts.get(contextKey)!;
    }

    Logger.info(`Creating browser context for test: ${testName}`);

    const context = await browser.newContext({
      ignoreHTTPSErrors: true,
      javaScriptEnabled: true,
      bypassCSP: true,
      ...this.getContextOptions(),
    });

    this.contexts.set(contextKey, context);
    Logger.info(`Browser context created successfully for test: ${testName}`);

    return context;
  }

  /**
   * Create a new page in the context
   * @param context - Browser context
   * @returns Page instance
   */
  static async createPage(context: BrowserContext): Promise<Page> {
    Logger.info('Creating new page');
    const page = await context.newPage();

    // Set default timeout
    page.setDefaultTimeout(Settings.timeout);
    page.setDefaultNavigationTimeout(Settings.timeout);

    Logger.info('Page created successfully');
    return page;
  }

  /**
   * Close a page
   * @param page - Page to close
   */
  static async closePage(page: Page): Promise<void> {
    try {
      Logger.info('Closing page');
      await page.close();
      Logger.info('Page closed successfully');
    } catch (error) {
      Logger.error('Error closing page', error);
    }
  }

  /**
   * Close a browser context
   * @param context - Context to close
   */
  static async closeContext(context: BrowserContext): Promise<void> {
    try {
      Logger.info('Closing browser context');
      await context.close();
      Logger.info('Browser context closed successfully');
    } catch (error) {
      Logger.error('Error closing browser context', error);
    }
  }

  /**
   * Close a browser
   * @param browser - Browser to close
   */
  static async closeBrowser(browser: Browser): Promise<void> {
    try {
      Logger.info('Closing browser');
      await browser.close();
      Logger.info('Browser closed successfully');
    } catch (error) {
      Logger.error('Error closing browser', error);
    }
  }

  /**
   * Close all browsers and cleanup resources
   */
  static async closeAllBrowsers(): Promise<void> {
    Logger.info('Closing all browsers');

    // Close all contexts
    for (const context of this.contexts.values()) {
      await this.closeContext(context);
    }
    this.contexts.clear();

    // Close all browsers
    for (const browser of this.browsers.values()) {
      await this.closeBrowser(browser);
    }
    this.browsers.clear();

    Logger.info('All browsers closed successfully');
  }

  /**
   * Get Chrome-specific launch arguments
   * @private
   */
  private static getChromeArgs(): string[] {
    const args: string[] = [];

    if (Settings.incognito) {
      args.push('--incognito');
    }

    args.push('--disable-blink-features=AutomationControlled');
    args.push('--disable-dev-shm-usage');
    args.push('--no-first-run');
    args.push('--no-default-browser-check');

    return args;
  }

  /**
   * Get Firefox-specific launch arguments
   * @private
   */
  private static getFirefoxArgs(): string[] {
    const args: string[] = [];

    if (Settings.incognito) {
      args.push('-private');
    }

    return args;
  }

  /**
   * Get context creation options
   * @private
   */
  private static getContextOptions(): Record<string, unknown> {
    const options: Record<string, unknown> = {};

    if (Settings.incognito) {
      // Incognito mode is handled at browser level
    }

    return options;
  }
}
