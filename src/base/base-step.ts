/**
 * Base step class for BDD step definitions
 * Extends Base class with step-specific functionality
 */

import { Base } from './base';
import type { IParallelConfig } from '../types';
import { Logger } from '../helpers/logger';

/**
 * BaseStep class serves as the foundation for all BDD step definitions
 * Provides common step execution utilities and assertions
 */
export abstract class BaseStep extends Base {
  /**
   * Initialize BaseStep with parallel configuration
   * @param parallelConfig - Configuration for parallel test execution
   */
  constructor(parallelConfig: IParallelConfig) {
    super(parallelConfig);
  }

  /**
   * Execute a step with error handling and logging
   * @param stepName - Name of the step
   * @param stepFunction - Function to execute
   */
  protected async executeStep(stepName: string, stepFunction: () => Promise<void>): Promise<void> {
    try {
      Logger.info(`Executing step: ${stepName}`);
      await stepFunction();
      Logger.info(`Step passed: ${stepName}`);
    } catch (error) {
      Logger.error(`Step failed: ${stepName}`, error);
      throw error;
    }
  }

  /**
   * Assert that a condition is true
   * @param condition - Condition to assert
   * @param message - Error message if assertion fails
   * @throws Error if condition is false
   */
  protected assert(condition: boolean, message: string): void {
    if (!condition) {
      Logger.error(`Assertion failed: ${message}`);
      throw new Error(`Assertion failed: ${message}`);
    }
    Logger.info(`Assertion passed: ${message}`);
  }

  /**
   * Assert that two values are equal
   * @param actual - Actual value
   * @param expected - Expected value
   * @param message - Error message if assertion fails
   * @throws Error if values are not equal
   */
  protected assertEqual(actual: unknown, expected: unknown, message: string): void {
    if (actual !== expected) {
      Logger.error(`Assertion failed: ${message}. Expected: ${expected}, Actual: ${actual}`);
      throw new Error(`Assertion failed: ${message}. Expected: ${expected}, Actual: ${actual}`);
    }
    Logger.info(`Assertion passed: ${message}`);
  }

  /**
   * Assert that two values are not equal
   * @param actual - Actual value
   * @param unexpected - Unexpected value
   * @param message - Error message if assertion fails
   * @throws Error if values are equal
   */
  protected assertNotEqual(actual: unknown, unexpected: unknown, message: string): void {
    if (actual === unexpected) {
      Logger.error(`Assertion failed: ${message}. Value should not be: ${unexpected}`);
      throw new Error(`Assertion failed: ${message}. Value should not be: ${unexpected}`);
    }
    Logger.info(`Assertion passed: ${message}`);
  }

  /**
   * Assert that a string contains a substring
   * @param text - Text to search in
   * @param substring - Substring to find
   * @param message - Error message if assertion fails
   * @throws Error if substring is not found
   */
  protected assertContains(text: string, substring: string, message: string): void {
    if (!text.includes(substring)) {
      Logger.error(`Assertion failed: ${message}. "${text}" does not contain "${substring}"`);
      throw new Error(`Assertion failed: ${message}. "${text}" does not contain "${substring}"`);
    }
    Logger.info(`Assertion passed: ${message}`);
  }

  /**
   * Assert that a value is truthy
   * @param value - Value to assert
   * @param message - Error message if assertion fails
   * @throws Error if value is falsy
   */
  protected assertTrue(value: unknown, message: string): void {
    if (!value) {
      Logger.error(`Assertion failed: ${message}. Expected truthy value`);
      throw new Error(`Assertion failed: ${message}. Expected truthy value`);
    }
    Logger.info(`Assertion passed: ${message}`);
  }

  /**
   * Assert that a value is falsy
   * @param value - Value to assert
   * @param message - Error message if assertion fails
   * @throws Error if value is truthy
   */
  protected assertFalse(value: unknown, message: string): void {
    if (value) {
      Logger.error(`Assertion failed: ${message}. Expected falsy value`);
      throw new Error(`Assertion failed: ${message}. Expected falsy value`);
    }
    Logger.info(`Assertion passed: ${message}`);
  }

  /**
   * Assert that a value is null
   * @param value - Value to assert
   * @param message - Error message if assertion fails
   * @throws Error if value is not null
   */
  protected assertNull(value: unknown, message: string): void {
    if (value !== null) {
      Logger.error(`Assertion failed: ${message}. Expected null, got: ${value}`);
      throw new Error(`Assertion failed: ${message}. Expected null, got: ${value}`);
    }
    Logger.info(`Assertion passed: ${message}`);
  }

  /**
   * Assert that a value is not null
   * @param value - Value to assert
   * @param message - Error message if assertion fails
   * @throws Error if value is null
   */
  protected assertNotNull(value: unknown, message: string): void {
    if (value === null) {
      Logger.error(`Assertion failed: ${message}. Expected non-null value`);
      throw new Error(`Assertion failed: ${message}. Expected non-null value`);
    }
    Logger.info(`Assertion passed: ${message}`);
  }
}
