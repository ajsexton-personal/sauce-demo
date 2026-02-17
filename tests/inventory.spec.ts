import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { InventoryPage } from "../pages/inventory.page";

test.beforeEach(async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
});

test("can add and remove from basket", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login("standard_user", "secret_sauce");
  expect(page.url()).toContain("inventory.html");
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.inventoryItemByIndex(0).addToCartButton.click();
  expect(await inventoryPage.basketItemsInLocalStorage()).toHaveLength(1);
  expect(inventoryPage.header().shoppingCartItemCount).toHaveText("1");
  await inventoryPage.inventoryItemByIndex(0).removeButton.click();
  expect(await inventoryPage.basketItemsInLocalStorage()).toHaveLength(0);
  await expect(inventoryPage.header().shoppingCartItemCount).toHaveCount(0);
});

// problem user cannot sort products, so those tests will fail
const users = [{ username: "standard_user" }, { username: "problem_user" }];
users.forEach(({ username }) => {
  test(`${username} can sort products`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(username, "secret_sauce");
    expect(page.url()).toContain("inventory.html");
    const inventoryPage = new InventoryPage(page);
    //these checks are not robust if the inventory items change
    //too much work to iterate through and check for the purpose of a demo
    await expect(inventoryPage.inventoryItemByIndex(0).price).toHaveText(
      "$29.99",
    );
    await inventoryPage.productSortSelect.selectOption({
      label: "Price (low to high)",
    });
    await expect(inventoryPage.inventoryItemByIndex(0).price).toHaveText(
      "$7.99",
    );
    await inventoryPage.productSortSelect.selectOption({
      label: "Name (Z to A)",
    });
    await expect(inventoryPage.inventoryItemByIndex(0).name).toHaveText(
      "Test.allTheThings() T-Shirt (Red)",
    );
  });
});
