import { type Locator, type Page } from "@playwright/test";

export class InventoryItem {
  readonly item: Locator;
  readonly price: Locator;
  readonly name: Locator;
  readonly addToCartButton: Locator;
  readonly removeButton: Locator;

  constructor(page: Page, index?: number, name?: string) {
    if (index) {
      this.item = page.getByTestId("inventory-item").nth(index);
    } else if (name) {
      this.item = page.getByTestId("inventory-item").filter({
        has: page.getByText(name),
      });
    } else this.item = page.getByTestId("inventory-item").nth(0);
    this.price = this.item.getByTestId("inventory-item-price");
    this.name = this.item.getByTestId("inventory-item-name");
    this.addToCartButton = this.item.getByRole("button", {
      name: "Add to cart",
    });
    this.removeButton = this.item.getByRole("button", { name: "Remove" });
  }
}
