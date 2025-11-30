/**
 * Logger utility for test execution logging
 * Provides file and console logging capabilities
 */

import * as fs from 'fs';
import * as path from 'path';
import { Settings } from '@config/settings';

/**
 * Log levels for filtering log output
 */
export enum LogLevel {
  Debug = 'DEBUG',
  Info = 'INFO',
  Warn = 'WARN',
  Error = 'ERROR',
}

/**
 * Logger class provides comprehensive logging functionality
 * Supports both file and console logging with timestamps
 */
export class Logger {
  private static logFilePath: string;
  private static logFileName: string;
  private static initialized: boolean = false;

  /**
   * Initialize logger with log directory
   * Creates log directory if it doesn't exist
   */
  static initialize(): void {
    if (this.initialized) return;

    const timestamp = this.getTimestamp().replace(/[:\s]/g, '');
    this.logFileName = `test-${timestamp}.log`;
    this.logFilePath = path.join(Settings.logPath, this.logFileName);

    // Create log directory if it doesn't exist
    if (!fs.existsSync(Settings.logPath)) {
      fs.mkdirSync(Settings.logPath, { recursive: true });
    }

    this.initialized = true;
  }

  /**
   * Log debug message
   * @param message - Message to log
   * @param data - Optional additional data
   */
  static debug(message: string, data?: unknown): void {
    this.log(LogLevel.Debug, message, data);
  }

  /**
   * Log info message
   * @param message - Message to log
   * @param data - Optional additional data
   */
  static info(message: string, data?: unknown): void {
    this.log(LogLevel.Info, message, data);
  }

  /**
   * Log warning message
   * @param message - Message to log
   * @param data - Optional additional data
   */
  static warn(message: string, data?: unknown): void {
    this.log(LogLevel.Warn, message, data);
  }

  /**
   * Log error message
   * @param message - Message to log
   * @param error - Error object or additional data
   */
  static error(message: string, error?: unknown): void {
    this.log(LogLevel.Error, message, error);
  }

  /**
   * Internal log method that handles both file and console logging
   * @private
   */
  private static log(level: LogLevel, message: string, data?: unknown): void {
    if (!Settings.enableLogging) return;

    this.initialize();

    const timestamp = this.getTimestamp();
    const logMessage = this.formatLogMessage(timestamp, level, message, data);

    // Log to console
    console.log(logMessage);

    // Log to file
    if (this.initialized) {
      try {
        fs.appendFileSync(this.logFilePath, logMessage + '\n');
      } catch (error) {
        console.error('Failed to write to log file:', error);
      }
    }
  }

  /**
   * Format log message with timestamp and level
   * @private
   */
  private static formatLogMessage(
    timestamp: string,
    level: LogLevel,
    message: string,
    data?: unknown
  ): string {
    let formattedMessage = `[${timestamp}] [${level}] ${message}`;

    if (data) {
      if (typeof data === 'object') {
        formattedMessage += ` ${JSON.stringify(data)}`;
      } else {
        formattedMessage += ` ${data}`;
      }
    }

    return formattedMessage;
  }

  /**
   * Get current timestamp in readable format
   * @private
   */
  private static getTimestamp(): string {
    const now = new Date();
    return now.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  }

  /**
   * Get the current log file path
   * @returns Path to the current log file
   */
  static getLogFilePath(): string {
    this.initialize();
    return this.logFilePath;
  }
}
