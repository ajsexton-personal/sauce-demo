import { type Locator, type Page } from "@playwright/test";
import { HeaderComponent } from "./components/header.component";

export class CheckoutOnePage {
  readonly page: Page;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly postalCode: Locator;
  readonly cancelButton: Locator;
  readonly continueButton: Locator;
  readonly error: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstName = this.page.getByTestId("firstName");
    this.lastName = this.page.getByTestId("lastName");
    this.postalCode = this.page.getByTestId("postalCode");
    this.cancelButton = this.page.getByTestId("cancel");
    this.continueButton = this.page.getByTestId("continue");
    this.error = this.page.getByTestId("error");
  }

  header() {
    return new HeaderComponent(this.page);
  }

  async fillYourInfo(firstName: string, lastName: string, postCode: string) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.postalCode.fill(postCode);
  }
}
