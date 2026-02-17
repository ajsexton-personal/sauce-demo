import { test, expect, Page } from "@playwright/test";
import { LoginPage } from "../pages/login.page";

test.beforeEach(async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
});

test("standard user can purchase something", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login("standard_user", "secret_sauce");
  expect(page.url()).toContain("inventory.html");
  //just grab the first item, we're just looking to get anything in the basket
  //test ids on inventory items are unique to that item and not reusable, fall back to role here
  await page.getByTestId("inventory-item").nth(0).getByRole("button", {name: "Add to cart"}).click();
  await expect (page.getByTestId("shopping-cart-badge")).toHaveCount(1);
  await page.getByTestId("shopping-cart-link").click();
  expect(page.url()).toContain("cart.html")
  //could add steps to check the inventory item is carried through but inventory items appear
  //reusable across pages.  enhance when refactoring to POM
  await page.getByTestId("checkout").click();
  expect(page.url()).toContain("checkout-step-one.html");
  await page.getByTestId("firstName").fill("firstName");
  await page.getByTestId("lastName").fill("lastName");
  await page.getByTestId("postalCode").fill("postalCode");
  await page.getByTestId("continue").click();
  expect (page.url()).toContain("checkout-step-two.html");
  //again should check the item is present / hasn't changed. revisit later
  await page.getByTestId("finish").click();
  await expect (page.getByTestId("complete-header")).toHaveText("Thank you for your order!")
});