/**
 * Global settings configuration for test execution
 * Contains all configurable parameters for the automation framework
 */

import { BrowserType, ExecutionType, TestType } from '../types';
import type { ITestSettings } from '../types';

/**
 * Settings class manages global configuration for test execution
 * All properties are static and accessible throughout the framework
 */
export class Settings {
  /** Timeout for element interactions (in milliseconds) */
  static timeout: number = 30000;

  /** Base URL of the application under test */
  static baseUrl: string = process.env.BASE_URL || 'http://localhost:3000';

  /** Type of test being executed (UI, API, or Hybrid) */
  static testType: TestType = TestType.UI;

  /** Execution environment (local, remote, or cloud) */
  static executionType: ExecutionType = ExecutionType.Local;

  /** Browser type for test execution */
  static browserType: BrowserType = BrowserType.Chrome;

  /** Run browser in headless mode */
  static headless: boolean = true;

  /** Run browser in incognito/private mode */
  static incognito: boolean = false;

  /** Path for storing logs */
  static logPath: string = './logs';

  /** Enable logging during test execution */
  static enableLogging: boolean = true;

  /** Test environment (dev, staging, production) */
  static environment: string = process.env.ENVIRONMENT || 'dev';

  /** Remote URL for cloud execution */
  static remoteUrl: string = process.env.REMOTE_URL || '';

  /** Build name for reporting */
  static buildName: string = process.env.BUILD_NAME || 'Local Build';

  /** Application name under test */
  static applicationName: string = process.env.APP_NAME || 'AUT';

  /** Custom capabilities flag */
  static isCustomCapabilities: boolean = false;

  /**
   * Initialize settings from environment variables
   * This method should be called at the start of test execution
   */
  static initialize(): void {
    this.timeout = parseInt(process.env.TIMEOUT || '30000', 10);
    this.baseUrl = process.env.BASE_URL || this.baseUrl;
    this.headless = process.env.HEADLESS !== 'false';
    this.incognito = process.env.INCOGNITO === 'true';
    this.enableLogging = process.env.ENABLE_LOGGING !== 'false';
    this.environment = process.env.ENVIRONMENT || this.environment;
  }

  /**
   * Get all current settings as an object
   * @returns Object containing all settings
   */
  static getAll(): ITestSettings {
    return {
      timeout: this.timeout,
      baseUrl: this.baseUrl,
      testType: this.testType,
      executionType: this.executionType,
      browserType: this.browserType,
      headless: this.headless,
      incognito: this.incognito,
      logPath: this.logPath,
      enableLogging: this.enableLogging,
      environment: this.environment,
    };
  }
}
