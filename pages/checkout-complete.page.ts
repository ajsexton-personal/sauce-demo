import { type Locator, type Page } from "@playwright/test";
import { HeaderComponent } from "./components/header.component";

export class CheckoutCompletePage {
  readonly page: Page;
  readonly completeHeader: Locator;
  readonly homeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.completeHeader = this.page.getByTestId("complete-header");
    this.homeButton = this.page.getByTestId("back-to-products");
  }

  header() {
    return new HeaderComponent(this.page);
  }
}
