import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { InventoryPage } from "../pages/inventory.page";
import { CartPage } from "../pages/cart.page";

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
});

test("1 item in basket", async ({ page }) => {
  const cartPage = new CartPage(page);
  expect(await cartPage.itemCount()).toBe(1);
  expect(await cartPage.inventoryItemByIndex(0).name).toHaveText(
    "Sauce Labs Fleece Jacket",
  );
});

test("can remove item from basket", async ({ page }) => {
  const cartPage = new CartPage(page);
  expect(await cartPage.itemCount()).toBe(1);
  await cartPage
    .inventoryItemByName("Sauce Labs Fleece Jacket")
    .removeButton.click();
  expect(await cartPage.itemCount()).toBe(0);
});

test("can continue shopping", async ({ page }) => {
  const cartPage = new CartPage(page);
  expect(await cartPage.itemCount()).toBe(1);
  await cartPage.continueButton.click();
  expect(page.url()).toContain("inventory.html");
  const inventoryPage = new InventoryPage(page);
  expect(await inventoryPage.basketItemsInLocalStorage()).toHaveLength(1);
});

//this test will fail
test("cannot checkout an empty basket", async ({ page }) => {
  const cartPage = new CartPage(page);
  expect(await cartPage.itemCount()).toBe(1);
  await cartPage
    .inventoryItemByName("Sauce Labs Fleece Jacket")
    .removeButton.click();
  expect(await cartPage.itemCount()).toBe(0);
  expect(cartPage.checkoutButton).toBeDisabled();
});
