import { type Locator, type Page } from "@playwright/test";

export class HeaderComponent {
  readonly page: Page;
  readonly burgerMenuButton: Locator;
  readonly shoppingCartLink: Locator;
  readonly shoppingCartItemCount: Locator;

  constructor(page: Page) {
    this.page = page;
    this.burgerMenuButton = this.page.getByRole("button", {
      name: "Open Menu",
    });
    this.shoppingCartLink = this.page.getByTestId("shopping-cart-link");
    this.shoppingCartItemCount = this.page.getByTestId("shopping-cart-badge");
  }
}
