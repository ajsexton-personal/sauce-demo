import { test, expect, Page } from "@playwright/test";
import { CartPage } from "../pages/cart.page";
import { LoginPage } from "../pages/login.page";
import { InventoryPage } from "../pages/inventory.page";
import { CheckoutOnePage } from "../pages/checkout-one.page";

test.beforeEach(async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
});

test("standard user can purchase something", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login("standard_user", "secret_sauce");
  expect(page.url()).toContain("inventory.html");
  const inventoryPage = new InventoryPage(page);
  await inventoryPage
    .inventoryItemByName("Sauce Labs Fleece Jacket")
    .addToCartButton.click();
  //check localStorage as well as UI.  Can't see any api calls to verify
  expect(await inventoryPage.basketItemsInLocalStorage()).toHaveLength(1);
  expect(inventoryPage.header().shoppingCartItemCount).toHaveText("1");
  await inventoryPage.header().shoppingCartLink.click();
  expect(page.url()).toContain("cart.html");
  const cartPage = new CartPage(page);
  //check theres one item and it has the same name (could verify price too)
  expect(await cartPage.itemCount()).toBe(1);
  expect(cartPage.inventoryItemByIndex(0).name).toHaveText(
    "Sauce Labs Fleece Jacket",
  );
  await cartPage.checkoutButton.click();
  expect(page.url()).toContain("checkout-step-one.html");
  const checkoutOnePage = new CheckoutOnePage(page);
  await checkoutOnePage.fillYourInfo("firstName", "lastName", "postCode");
  await checkoutOnePage.continueButton.click();
  expect(page.url()).toContain("checkout-step-two.html");
  //again should check the item is present / hasn't changed. revisit later
  await page.getByTestId("finish").click();
  await expect(page.getByTestId("complete-header")).toHaveText(
    "Thank you for your order!",
  );
});
