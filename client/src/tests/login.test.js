// tests/login.test.js
const { test, expect } = require('@playwright/test');

test('should display login form and submit successfully', async ({ page }) => {
    // Navigate to the login page
    await page.goto('/login'); // Ensure this path is correct

    // Check if the login form is visible
    await expect(page.locator('h2')).toHaveText('Login');
    await expect(page.locator('input[name="username"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toHaveText('Login');

    // Fill the form and submit
    await page.fill('input[name="username"]', 'testuser');
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');

    // Verify successful login by checking the URL or some text that indicates login
    await page.waitForURL('/dashboard'); // Ensure this is the correct URL after login
    await expect(page.locator('h1')).toHaveText('Dashboard');
});
