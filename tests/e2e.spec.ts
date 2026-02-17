import { test, expect, Page } from "@playwright/test";
import { CartPage } from "../pages/cart.page";
import { LoginPage } from "../pages/login.page";
import { InventoryPage } from "../pages/inventory.page";

test.beforeEach(async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
});

test("standard user can purchase something", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login("standard_user", "secret_sauce");
  expect(page.url()).toContain("inventory.html");
  const inventoryPage = new InventoryPage(page);
  //just grab the first item, we're just looking to get anything in the basket
  await inventoryPage
    .inventoryItemByName("Sauce Labs Fleece Jacket")
    .addToCartButton.click();
  //check localStorage as well as UI.  Can't see any api calls to verify
  expect(await inventoryPage.basketItemsInLocalStorage()).toHaveLength(1);
  expect(inventoryPage.header().shoppingCartItemCount).toHaveText("1");
  await inventoryPage.header().shoppingCartLink.click();
  expect(page.url()).toContain("cart.html");
  const cartPage = new CartPage(page);
  expect(await cartPage.itemCount()).toBe(1);
  expect(cartPage.inventoryItemByIndex(0).name).toHaveText(
    "Sauce Labs Fleece Jacket",
  );
  await cartPage.checkoutButton.click();
  expect(page.url()).toContain("checkout-step-one.html");
  await page.getByTestId("firstName").fill("firstName");
  await page.getByTestId("lastName").fill("lastName");
  await page.getByTestId("postalCode").fill("postalCode");
  await page.getByTestId("continue").click();
  expect(page.url()).toContain("checkout-step-two.html");
  //again should check the item is present / hasn't changed. revisit later
  await page.getByTestId("finish").click();
  await expect(page.getByTestId("complete-header")).toHaveText(
    "Thank you for your order!",
  );
});
