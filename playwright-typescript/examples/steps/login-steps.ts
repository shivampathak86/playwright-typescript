/**
 * Example Login Steps for BDD
 * Demonstrates how to create step definitions using the framework
 */

import { BaseStep } from '@base/base-step';
import { IParallelConfig } from '@types/index';
import { LoginPage } from '../pages/login-page';

/**
 * LoginSteps class contains BDD step definitions for login functionality
 */
export class LoginSteps extends BaseStep {
  private loginPage: LoginPage;

  /**
   * Initialize LoginSteps with parallel configuration
   * @param parallelConfig - Configuration for parallel test execution
   */
  constructor(parallelConfig: IParallelConfig) {
    super(parallelConfig);
    this.loginPage = new LoginPage(parallelConfig);
  }

  /**
   * Given step: User navigates to login page
   */
  async givenUserNavigatesToLoginPage(): Promise<void> {
    await this.executeStep('User navigates to login page', async () => {
      await this.loginPage.navigateToLoginPage();
    });
  }

  /**
   * When step: User enters credentials
   * @param username - Username to enter
   * @param password - Password to enter
   */
  async whenUserEntersCredentials(username: string, password: string): Promise<void> {
    await this.executeStep(`User enters credentials (${username})`, async () => {
      await this.loginPage.login(username, password);
    });
  }

  /**
   * Then step: User should see error message
   * @param expectedMessage - Expected error message
   */
  async thenUserShouldSeeErrorMessage(expectedMessage: string): Promise<void> {
    await this.executeStep(`User should see error message: ${expectedMessage}`, async () => {
      const isDisplayed = await this.loginPage.isErrorMessageDisplayed();
      this.assertTrue(isDisplayed, 'Error message should be displayed');

      const actualMessage = await this.loginPage.getErrorMessage();
      this.assertContains(actualMessage, expectedMessage, 'Error message should contain expected text');
    });
  }

  /**
   * Then step: User should be logged in
   */
  async thenUserShouldBeLoggedIn(): Promise<void> {
    await this.executeStep('User should be logged in', async () => {
      const currentUrl = this.loginPage.getCurrentUrl();
      this.assertContains(currentUrl, '/dashboard', 'User should be redirected to dashboard');
    });
  }
}
