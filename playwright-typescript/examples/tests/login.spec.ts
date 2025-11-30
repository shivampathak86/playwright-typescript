/**
 * Example Login Test
 * Demonstrates how to write tests using the framework
 */

import { test, expect } from '@base/test-initialize-hook';
import { LoginPage } from '../pages/login-page';

test.describe('Login Functionality', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ parallelConfig }) => {
    loginPage = new LoginPage(parallelConfig);
    await loginPage.navigateToLoginPage();
  });

  test('should login with valid credentials', async ({ parallelConfig }) => {
    // Arrange
    const username = 'testuser@example.com';
    const password = 'password123';

    // Act
    await loginPage.login(username, password);

    // Assert
    const currentUrl = loginPage.getCurrentUrl();
    expect(currentUrl).toContain('/dashboard');
  });

  test('should display error message with invalid credentials', async ({ parallelConfig }) => {
    // Arrange
    const username = 'invalid@example.com';
    const password = 'wrongpassword';

    // Act
    await loginPage.login(username, password);

    // Assert
    const isErrorDisplayed = await loginPage.isErrorMessageDisplayed();
    expect(isErrorDisplayed).toBe(true);

    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Invalid credentials');
  });

  test('should require username field', async ({ parallelConfig }) => {
    // Arrange
    const password = 'password123';

    // Act
    await loginPage.enterPassword(password);
    await loginPage.clickLoginButton();

    // Assert
    const isErrorDisplayed = await loginPage.isErrorMessageDisplayed();
    expect(isErrorDisplayed).toBe(true);
  });
});
