/**
 * Base class for all automation classes
 * Provides common functionality and utilities for pages and steps
 */

import type { IParallelConfig } from '../types';
import { DriverContext } from './driver-context';
import { Logger } from '../helpers/logger';

/**
 * Base class that serves as the foundation for all page and step classes
 * Provides access to driver context and common utilities
 */
export abstract class Base {
  protected driverContext: DriverContext;
  protected parallelConfig: IParallelConfig;

  /**
   * Initialize Base with parallel configuration
   * @param parallelConfig - Configuration for parallel test execution
   */
  constructor(parallelConfig: IParallelConfig) {
    this.parallelConfig = parallelConfig;
    this.driverContext = new DriverContext(parallelConfig);
  }

  /**
   * Get driver context for page and browser interactions
   * @returns DriverContext instance
   */
  protected getDriverContext(): DriverContext {
    return this.driverContext;
  }

  /**
   * Get parallel configuration
   * @returns Parallel configuration object
   */
  protected getParallelConfig(): IParallelConfig {
    return this.parallelConfig;
  }

  /**
   * Create a new instance of a page class
   * @template T - Page class type
   * @param PageClass - Page class constructor
   * @returns New instance of the page class
   */
  protected createPageInstance<T extends Base>(PageClass: new (config: IParallelConfig) => T): T {
    return new PageClass(this.parallelConfig);
  }

  /**
   * Cast current instance to a specific page type
   * @template T - Target page type
   * @returns Current instance cast to target type
   */
  as<T extends Base>(): T {
    return this as unknown as T;
  }

  /**
   * Wait for a specific duration
   * @param milliseconds - Duration to wait in milliseconds
   */
  protected async wait(milliseconds: number): Promise<void> {
    Logger.debug(`Waiting for ${milliseconds}ms`);
    await new Promise((resolve) => setTimeout(resolve, milliseconds));
  }

  /**
   * Log a message at info level
   * @param message - Message to log
   */
  protected log(message: string): void {
    Logger.info(message);
  }

  /**
   * Log a message at debug level
   * @param message - Message to log
   */
  protected logDebug(message: string): void {
    Logger.debug(message);
  }

  /**
   * Log a warning message
   * @param message - Message to log
   */
  protected logWarn(message: string): void {
    Logger.warn(message);
  }

  /**
   * Log an error message
   * @param message - Message to log
   * @param error - Error object
   */
  protected logError(message: string, error?: unknown): void {
    Logger.error(message, error);
  }
}
