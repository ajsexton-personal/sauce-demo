import { type Locator, type Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly usernameTextBox: Locator;
  readonly passwordTextBox: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameTextBox = this.page.getByTestId("username");
    this.passwordTextBox = page.getByTestId("password");
    this.loginButton = page.getByTestId("login-button");
    this.errorMessage = page.getByTestId("error");
  }

  async login(username: string, password: string) {
    await this.usernameTextBox.fill(username);
    await this.passwordTextBox.fill(password);
    await this.loginButton.click();
  }
}
