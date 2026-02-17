import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { InventoryPage } from "../pages/inventory.page";
import { CartPage } from "../pages/cart.page";
import { CheckoutOnePage } from "../pages/checkout-one.page";
import { CheckoutTwoPage } from "../pages/checkout-two.page";

test.beforeEach(async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  const loginPage = new LoginPage(page);
  await loginPage.login("standard_user", "secret_sauce");
  expect(page.url()).toContain("inventory.html");
  const inventoryPage = new InventoryPage(page);
  await inventoryPage
    .inventoryItemByName("Sauce Labs Fleece Jacket")
    .addToCartButton.click();
  expect(await inventoryPage.basketItemsInLocalStorage()).toHaveLength(1);
  await inventoryPage.header().shoppingCartLink.click();
  expect(page.url()).toContain("cart.html");
  const cartPage = new CartPage(page);
  await cartPage.checkoutButton.click();
  expect(page.url()).toContain("checkout-step-one.html");
  const checkoutOnePage = new CheckoutOnePage(page);
  await checkoutOnePage.fillYourInfo("firstName", "lastName", "postCode");
  await checkoutOnePage.continueButton.click();
  expect(page.url()).toContain("checkout-step-two.html");
});

test("user can cancel", async ({ page }) => {
  const checkoutTwoPage = new CheckoutTwoPage(page);
  await checkoutTwoPage.cancelButton.click();
  expect(page.url()).toContain("inventory.html");
});
