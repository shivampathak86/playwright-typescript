/**
 * Type definitions for the Shivam Playwright-Typescript
 */

import type { Page, BrowserContext } from '@playwright/test';

/**
 * Supported browser types for automation
 */
export enum BrowserType {
  Chrome = 'chromium',
  Firefox = 'firefox',
  Safari = 'webkit',
  Edge = 'msedge',
}

/**
 * Test execution types
 */
export enum ExecutionType {
  Local = 'local',
  Remote = 'remote',
  Cloud = 'cloud',
}

/**
 * Test types
 */
export enum TestType {
  UI = 'ui',
  API = 'api',
  Hybrid = 'hybrid',
}

/**
 * Step definition types for BDD
 */
export enum StepType {
  Given = 'Given',
  When = 'When',
  Then = 'Then',
  And = 'And',
}

/**
 * Test execution status
 */
export enum TestStatus {
  Passed = 'passed',
  Failed = 'failed',
  Skipped = 'skipped',
}

/**
 * Driver context containing browser and page instances
 */
export interface IDriverContext {
  page: Page;
  context: BrowserContext;
  browserType: BrowserType;
}

/**
 * Configuration for parallel test execution
 */
export interface IParallelConfig {
  page?: Page;
  context?: BrowserContext;
  browserType: BrowserType;
  testName: string;
  timeout: number;
  headless: boolean;
  incognito: boolean;
}

/**
 * Test settings configuration
 */
export interface ITestSettings {
  timeout: number;
  baseUrl: string;
  testType: TestType;
  executionType: ExecutionType;
  browserType: BrowserType;
  headless: boolean;
  incognito: boolean;
  logPath: string;
  enableLogging: boolean;
  environment: string;
}

/**
 * Step execution result
 */
export interface IStepResult {
  stepName: string;
  status: TestStatus;
  duration: number;
  error?: string;
  screenshot?: string;
}
