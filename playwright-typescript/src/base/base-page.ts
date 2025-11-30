/**
 * Base page class for all page objects
 * Extends Base class with page-specific functionality
 */

import { Page, Locator } from '@playwright/test';
import { Base } from './base';
import { IParallelConfig } from '@types/index';
import { Logger } from '@helpers/logger';

/**
 * BasePage class serves as the foundation for all page object models
 * Provides common page interactions and element handling methods
 */
export abstract class BasePage extends Base {
  /**
   * Initialize BasePage with parallel configuration
   * @param parallelConfig - Configuration for parallel test execution
   */
  constructor(parallelConfig: IParallelConfig) {
    super(parallelConfig);
  }

  /**
   * Get the current page instance
   * @returns Playwright Page object
   */
  protected getPage(): Page {
    return this.driverContext.getPage();
  }

  /**
   * Navigate to a specific URL
   * @param url - URL to navigate to
   */
  protected async navigateTo(url: string): Promise<void> {
    await this.driverContext.goToUrl(url);
  }

  /**
   * Find element by selector
   * @param selector - CSS selector or Playwright locator
   * @returns Locator object
   */
  protected $(selector: string): Locator {
    return this.getPage().locator(selector);
  }

  /**
   * Find all elements matching selector
   * @param selector - CSS selector or Playwright locator
   * @returns Array of Locator objects
   */
  protected async $$(selector: string): Promise<Locator[]> {
    const locator = this.getPage().locator(selector);
    const count = await locator.count();
    const locators: Locator[] = [];

    for (let i = 0; i < count; i++) {
      locators.push(locator.nth(i));
    }

    return locators;
  }

  /**
   * Click on an element
   * @param selector - Element selector
   */
  protected async click(selector: string): Promise<void> {
    Logger.info(`Clicking on element: ${selector}`);
    await this.$(selector).click();
  }

  /**
   * Fill text input
   * @param selector - Element selector
   * @param text - Text to fill
   */
  protected async fillText(selector: string, text: string): Promise<void> {
    Logger.info(`Filling text in element: ${selector}`);
    await this.$(selector).fill(text);
  }

  /**
   * Get text content of an element
   * @param selector - Element selector
   * @returns Text content
   */
  protected async getText(selector: string): Promise<string> {
    return this.$(selector).textContent() || '';
  }

  /**
   * Get attribute value of an element
   * @param selector - Element selector
   * @param attributeName - Attribute name
   * @returns Attribute value
   */
  protected async getAttribute(selector: string, attributeName: string): Promise<string | null> {
    return this.$(selector).getAttribute(attributeName);
  }

  /**
   * Check if element is visible
   * @param selector - Element selector
   * @returns True if element is visible
   */
  protected async isVisible(selector: string): Promise<boolean> {
    return this.$(selector).isVisible();
  }

  /**
   * Check if element is enabled
   * @param selector - Element selector
   * @returns True if element is enabled
   */
  protected async isEnabled(selector: string): Promise<boolean> {
    return this.$(selector).isEnabled();
  }

  /**
   * Check if element is checked (for checkboxes/radio buttons)
   * @param selector - Element selector
   * @returns True if element is checked
   */
  protected async isChecked(selector: string): Promise<boolean> {
    return this.$(selector).isChecked();
  }

  /**
   * Wait for element to be visible
   * @param selector - Element selector
   * @param timeout - Timeout in milliseconds
   */
  protected async waitForElement(selector: string, timeout?: number): Promise<void> {
    Logger.info(`Waiting for element: ${selector}`);
    await this.$(selector).waitFor({ state: 'visible', timeout });
  }

  /**
   * Wait for element to be hidden
   * @param selector - Element selector
   * @param timeout - Timeout in milliseconds
   */
  protected async waitForElementHidden(selector: string, timeout?: number): Promise<void> {
    Logger.info(`Waiting for element to be hidden: ${selector}`);
    await this.$(selector).waitFor({ state: 'hidden', timeout });
  }

  /**
   * Hover over an element
   * @param selector - Element selector
   */
  protected async hover(selector: string): Promise<void> {
    Logger.info(`Hovering over element: ${selector}`);
    await this.$(selector).hover();
  }

  /**
   * Double click on an element
   * @param selector - Element selector
   */
  protected async doubleClick(selector: string): Promise<void> {
    Logger.info(`Double clicking on element: ${selector}`);
    await this.$(selector).dblclick();
  }

  /**
   * Right click on an element
   * @param selector - Element selector
   */
  protected async rightClick(selector: string): Promise<void> {
    Logger.info(`Right clicking on element: ${selector}`);
    await this.$(selector).click({ button: 'right' });
  }

  /**
   * Select option from dropdown
   * @param selector - Dropdown selector
   * @param value - Option value to select
   */
  protected async selectOption(selector: string, value: string): Promise<void> {
    Logger.info(`Selecting option: ${value} from dropdown: ${selector}`);
    await this.$(selector).selectOption(value);
  }

  /**
   * Get current page URL
   * @returns Current URL
   */
  protected getCurrentUrl(): string {
    return this.driverContext.getCurrentUrl();
  }

  /**
   * Get current page title
   * @returns Page title
   */
  protected async getPageTitle(): Promise<string> {
    return this.driverContext.getPageTitle();
  }

  /**
   * Take screenshot of current page
   * @param fileName - Screenshot file name
   */
  protected async takeScreenshot(fileName: string): Promise<void> {
    Logger.info(`Taking screenshot: ${fileName}`);
    await this.getPage().screenshot({ path: `./screenshots/${fileName}.png` });
  }

  /**
   * Refresh the current page
   */
  protected async refreshPage(): Promise<void> {
    await this.driverContext.refreshPage();
  }

  /**
   * Execute JavaScript in page context
   * @param script - JavaScript code to execute
   * @param args - Arguments to pass to script
   * @returns Result of script execution
   */
  protected async executeScript<T>(script: string, ...args: unknown[]): Promise<T> {
    return this.getPage().evaluate((s, ...a) => eval(s), script, ...args) as Promise<T>;
  }
}
