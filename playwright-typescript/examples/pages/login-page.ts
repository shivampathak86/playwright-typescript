/**
 * Example Login Page Object
 * Demonstrates how to create page objects using the framework
 */

import { BasePage } from '@base/base-page';
import { IParallelConfig } from '@types/index';

/**
 * LoginPage class represents the login page of the application
 * Encapsulates all interactions with login page elements
 */
export class LoginPage extends BasePage {
  // Selectors
  private readonly usernameInput = 'input[name="username"]';
  private readonly passwordInput = 'input[name="password"]';
  private readonly loginButton = 'button[type="submit"]';
  private readonly errorMessage = '.error-message';

  /**
   * Initialize LoginPage with parallel configuration
   * @param parallelConfig - Configuration for parallel test execution
   */
  constructor(parallelConfig: IParallelConfig) {
    super(parallelConfig);
  }

  /**
   * Navigate to login page
   */
  async navigateToLoginPage(): Promise<void> {
    await this.navigateTo('/login');
    await this.waitForElement(this.usernameInput);
  }

  /**
   * Enter username
   * @param username - Username to enter
   */
  async enterUsername(username: string): Promise<void> {
    await this.fillText(this.usernameInput, username);
  }

  /**
   * Enter password
   * @param password - Password to enter
   */
  async enterPassword(password: string): Promise<void> {
    await this.fillText(this.passwordInput, password);
  }

  /**
   * Click login button
   */
  async clickLoginButton(): Promise<void> {
    await this.click(this.loginButton);
  }

  /**
   * Perform login with credentials
   * @param username - Username
   * @param password - Password
   */
  async login(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  /**
   * Get error message text
   * @returns Error message text
   */
  async getErrorMessage(): Promise<string> {
    return this.getText(this.errorMessage);
  }

  /**
   * Check if error message is displayed
   * @returns True if error message is visible
   */
  async isErrorMessageDisplayed(): Promise<boolean> {
    return this.isVisible(this.errorMessage);
  }
}
