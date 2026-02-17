import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";

test.beforeEach(async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
});

test("locked out user is locked out", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login("locked_out_user", "secret_sauce");
  await expect(loginPage.errorMessage).toHaveText(
    "Epic sadface: Sorry, this user has been locked out.",
  );
});

test("standard user can login", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login("standard_user", "secret_sauce");
  expect(page.url()).toContain("inventory.html");
});
