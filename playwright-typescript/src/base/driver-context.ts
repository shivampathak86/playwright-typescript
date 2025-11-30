/**
 * Driver context for managing browser and page instances
 * Provides centralized access to Playwright page and context objects
 */

import { Page, BrowserContext } from '@playwright/test';
import { IParallelConfig, BrowserType } from '@types/index';
import { Logger } from '@helpers/logger';

/**
 * DriverContext class manages the browser context and page for test execution
 * Handles navigation, page interactions, and context management
 */
export class DriverContext {
  private parallelConfig: IParallelConfig;

  /**
   * Initialize DriverContext with parallel configuration
   * @param parallelConfig - Configuration for parallel test execution
   */
  constructor(parallelConfig: IParallelConfig) {
    this.parallelConfig = parallelConfig;
  }

  /**
   * Get the current page instance
   * @returns Playwright Page object
   * @throws Error if page is not initialized
   */
  getPage(): Page {
    if (!this.parallelConfig.page) {
      throw new Error('Page is not initialized. Ensure browser is launched before accessing page.');
    }
    return this.parallelConfig.page;
  }

  /**
   * Get the current browser context
   * @returns Playwright BrowserContext object
   * @throws Error if context is not initialized
   */
  getContext(): BrowserContext {
    if (!this.parallelConfig.context) {
      throw new Error('Context is not initialized. Ensure browser is launched before accessing context.');
    }
    return this.parallelConfig.context;
  }

  /**
   * Navigate to a specific URL
   * @param url - URL to navigate to
   * @throws Error if page is not initialized
   */
  async goToUrl(url: string): Promise<void> {
    try {
      Logger.info(`Navigating to URL: ${url}`);
      await this.getPage().goto(url, { waitUntil: 'networkidle' });
      Logger.info(`Successfully navigated to: ${url}`);
    } catch (error) {
      Logger.error(`Failed to navigate to URL: ${url}`, error);
      throw error;
    }
  }

  /**
   * Get the current page URL
   * @returns Current page URL
   */
  getCurrentUrl(): string {
    return this.getPage().url();
  }

  /**
   * Get the current page title
   * @returns Current page title
   */
  async getPageTitle(): Promise<string> {
    return this.getPage().title();
  }

  /**
   * Refresh the current page
   */
  async refreshPage(): Promise<void> {
    Logger.info('Refreshing page');
    await this.getPage().reload();
  }

  /**
   * Go back in browser history
   */
  async goBack(): Promise<void> {
    Logger.info('Going back in browser history');
    await this.getPage().goBack();
  }

  /**
   * Go forward in browser history
   */
  async goForward(): Promise<void> {
    Logger.info('Going forward in browser history');
    await this.getPage().goForward();
  }

  /**
   * Set the browser viewport size
   * @param width - Viewport width
   * @param height - Viewport height
   */
  async setViewportSize(width: number, height: number): Promise<void> {
    Logger.info(`Setting viewport size to ${width}x${height}`);
    await this.getPage().setViewportSize({ width, height });
  }

  /**
   * Get browser type
   * @returns Browser type being used
   */
  getBrowserType(): BrowserType {
    return this.parallelConfig.browserType;
  }

  /**
   * Get test name
   * @returns Current test name
   */
  getTestName(): string {
    return this.parallelConfig.testName;
  }

  /**
   * Get timeout setting
   * @returns Timeout in milliseconds
   */
  getTimeout(): number {
    return this.parallelConfig.timeout;
  }

  /**
   * Update page instance (used when page changes)
   * @param page - New page instance
   */
  setPage(page: Page): void {
    this.parallelConfig.page = page;
  }

  /**
   * Update context instance
   * @param context - New context instance
   */
  setContext(context: BrowserContext): void {
    this.parallelConfig.context = context;
  }
}
