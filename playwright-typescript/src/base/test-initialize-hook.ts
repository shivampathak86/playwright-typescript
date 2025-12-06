/**
 * Test initialization hook for setup and teardown
 * Handles browser initialization and cleanup for each test
 */

import { test as base, Page, BrowserContext } from '@playwright/test';
import { BrowserFactory } from './browser-factory';
import { BrowserType } from '../types';
import type { IParallelConfig } from '../types';
import { Settings } from '../config/settings';
import { Logger } from '../helpers/logger';
import { ConfigReader } from '../config/config-reader';

/**
 * Extended test fixture with browser and driver context
 */
export const test = base.extend<{
  parallelConfig: IParallelConfig;
}>({
  parallelConfig: async ({}, use) => {
    // Initialize configuration
    ConfigReader.loadConfiguration();
    Logger.initialize();

    const testName = test.info().title;
    Logger.info(`Starting test: ${testName}`);

    // Launch browser
    const browserInstance = await BrowserFactory.launchBrowser(Settings.browserType, testName);

    // Create context
    const context = await BrowserFactory.createContext(browserInstance, testName);

    // Create page
    const page = await BrowserFactory.createPage(context);

    // Create parallel config
    const parallelConfig: IParallelConfig = {
      page,
      context,
      browserType: Settings.browserType,
      testName,
      timeout: Settings.timeout,
      headless: Settings.headless,
      incognito: Settings.incognito,
    };

    // Use the fixture
    await use(parallelConfig);

    // Cleanup
    Logger.info(`Ending test: ${testName}`);
    await BrowserFactory.closePage(page);
    await BrowserFactory.closeContext(context);
  },
});

export { expect } from '@playwright/test';
