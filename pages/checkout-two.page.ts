import { type Locator, type Page } from "@playwright/test";
import { HeaderComponent } from "./components/header.component";
import { InventoryItem } from "./components/inventory-item.component";

export class CheckoutTwoPage {
  readonly page: Page;
  readonly inventoryItems: Locator;
  readonly paymentInfo: Locator;
  readonly shippingInfo: Locator;
  readonly itemTotal: Locator;
  readonly tax: Locator;
  readonly total: Locator;
  readonly cancelButton: Locator;
  readonly finishButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryItems = this.page.getByTestId("inventory-item");
    this.paymentInfo = this.page.getByTestId("payment-info-value");
    this.shippingInfo = this.page.getByTestId("shipping-info-value");
    this.itemTotal = this.page.getByTestId("subtotal-label");
    this.tax = this.page.getByTestId("tax-label");
    this.total = this.page.getByTestId("total-label");
    this.cancelButton = this.page.getByTestId("cancel");
    this.finishButton = this.page.getByTestId("finish");
  }

  header() {
    return new HeaderComponent(this.page);
  }

  inventoryItemByIndex(index: number) {
    return new InventoryItem(this.page, index);
  }

  inventoryItemByName(name: string) {
    return new InventoryItem(this.page, undefined, name);
  }

  async itemCount() {
    return this.inventoryItems.count();
  }
}
