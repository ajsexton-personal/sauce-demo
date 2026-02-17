import { type Locator, type Page } from "@playwright/test";
import { HeaderComponent } from "./components/header.component";
import { InventoryItem } from "./components/inventory-item.component";

export class CartPage {
  readonly page: Page;
  readonly continueButton: Locator;
  readonly checkoutButton: Locator;
  private readonly inventoryItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.continueButton = this.page.getByTestId("continue-shopping");
    this.checkoutButton = this.page.getByTestId("checkout");
    this.inventoryItems = this.page.getByTestId("inventory-item");
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
