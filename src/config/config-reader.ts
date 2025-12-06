/**
 * Configuration reader for loading test settings from environment and config files
 */

import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { Settings } from './settings';

/**
 * ConfigReader class handles loading and parsing configuration from various sources
 * Supports environment variables, .env files, and JSON configuration files
 */
export class ConfigReader {
  private static readonly ENV_FILE = '.env';
  private static readonly CONFIG_FILE = 'config.json';

  /**
   * Load configuration from all available sources
   * Priority: Environment variables > .env file > config.json > defaults
   */
  static loadConfiguration(): void {
    // Load .env file if it exists
    this.loadEnvFile();

    // Initialize settings from environment variables
    Settings.initialize();
  }

  /**
   * Load environment variables from .env file
   * @private
   */
  private static loadEnvFile(): void {
    const envPath = path.resolve(process.cwd(), this.ENV_FILE);

    if (fs.existsSync(envPath)) {
      dotenv.config({ path: envPath });
    }
  }

  /**
   * Load configuration from JSON file
   * @param configPath - Path to configuration file
   * @returns Parsed configuration object
   * @throws Error if file doesn't exist or is invalid JSON
   */
  static loadFromFile(configPath: string): Record<string, unknown> {
    if (!fs.existsSync(configPath)) {
      throw new Error(`Configuration file not found: ${configPath}`);
    }

    try {
      const fileContent = fs.readFileSync(configPath, 'utf-8');
      return JSON.parse(fileContent);
    } catch (error) {
      throw new Error(`Failed to parse configuration file: ${error}`);
    }
  }

  /**
   * Get a specific configuration value
   * @param key - Configuration key
   * @param defaultValue - Default value if key not found
   * @returns Configuration value or default
   */
  static get(key: string, defaultValue?: unknown): unknown {
    return process.env[key] || defaultValue;
  }

  /**
   * Get configuration value as string
   * @param key - Configuration key
   * @param defaultValue - Default value if key not found
   * @returns Configuration value as string
   */
  static getString(key: string, defaultValue: string = ''): string {
    return (process.env[key] || defaultValue).toString();
  }

  /**
   * Get configuration value as number
   * @param key - Configuration key
   * @param defaultValue - Default value if key not found
   * @returns Configuration value as number
   */
  static getNumber(key: string, defaultValue: number = 0): number {
    const value = process.env[key];
    return value ? parseInt(value, 10) : defaultValue;
  }

  /**
   * Get configuration value as boolean
   * @param key - Configuration key
   * @param defaultValue - Default value if key not found
   * @returns Configuration value as boolean
   */
  static getBoolean(key: string, defaultValue: boolean = false): boolean {
    const value = process.env[key];
    if (value === undefined) return defaultValue;
    return value.toLowerCase() === 'true';
  }
}
