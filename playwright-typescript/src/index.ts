/**
 * ARI Automation Framework - Main Entry Point
 * 
 * A comprehensive, enterprise-grade automation framework built on Playwright and TypeScript.
 * Provides a robust foundation for building scalable, maintainable test automation solutions.
 * 
 * @packageDocumentation
 */

// Base classes and utilities
export { Base, BasePage, BaseStep, DriverContext, BrowserFactory, test, expect } from '@base/index';

// Configuration
export { Settings, ConfigReader } from '@config/index';

// Helpers
export { Logger, LogLevel } from '@helpers/index';

// Types
export type {
  BrowserType,
  ExecutionType,
  TestType,
  StepType,
  TestStatus,
  IDriverContext,
  IParallelConfig,
  ITestSettings,
  IStepResult,
} from '@types/index';

export { BrowserType, ExecutionType, TestType, StepType, TestStatus } from '@types/index';
