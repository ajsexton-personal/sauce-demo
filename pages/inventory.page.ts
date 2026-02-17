import { type Locator, type Page } from "@playwright/test";
import { HeaderComponent } from "./components/header.component";
import { InventoryItem } from "./components/inventory-item.component";

export class InventoryPage {
  readonly page: Page;
  readonly productSortSelect: Locator;
  readonly productSortActiveOption: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productSortSelect = this.page.getByTestId("product-sort-container");
    this.productSortActiveOption = this.page.getByTestId("active-option");
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

  async basketItemsInLocalStorage() {
    const basketItems = await this.page.evaluate(() =>
      localStorage.getItem("cart-contents"),
    );
    if (basketItems) {
      return JSON.parse(basketItems);
    }
    return [];
  }
}
