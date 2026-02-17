import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { InventoryPage } from "../pages/inventory.page";
import { CartPage } from "../pages/cart.page";
import { CheckoutOnePage } from "../pages/checkout-one.page";

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
  const cartPage = new CartPage(page)
  await cartPage.checkoutButton.click();
  expect(page.url()).toContain("checkout-step-one.html")
});

test("user must provide information to continue", async ({page}) => {
  const checkoutOnePage = new CheckoutOnePage(page)
  await checkoutOnePage.continueButton.click()
  expect(checkoutOnePage.error).toHaveText("Error: First Name is required")
  await checkoutOnePage.firstName.fill("firstName")
  await checkoutOnePage.continueButton.click()
  expect(checkoutOnePage.error).toHaveText("Error: Last Name is required")
  await checkoutOnePage.lastName.fill("lastName")
  await checkoutOnePage.continueButton.click()
  expect(checkoutOnePage.error).toHaveText("Error: Postal Code is required")
  await checkoutOnePage.postalCode.fill("postCode")
  await checkoutOnePage.continueButton.click()
  expect(page.url()).toContain("checkout-step-two.html")
})
