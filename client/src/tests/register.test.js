// tests/register.test.js
const { test, expect } = require('@playwright/test');

test('should display registration form and submit successfully', async ({ page }) => {
    // Navigate to the registration page
    await page.goto('/register'); // Ensure this path is correct

    // Check if the registration form is visible
    await expect(page.locator('h2')).toHaveText('Register');
    await expect(page.locator('input[name="username"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toHaveText('Register');

    // Fill the form and submit
    await page.fill('input[name="username"]', 'newuser');
    await page.fill('input[name="password"]', 'newpassword123');
    await page.click('button[type="submit"]');

    // Verify successful registration by checking the URL or some text that indicates registration
    await page.waitForURL('/login'); // Adjust if your app redirects to a different URL
    await expect(page.locator('h2')).toHaveText('Login'); // Adjust if your app shows a different text or page

    // Optionally, check for a success message or user being logged in automatically
    await expect(page.locator('.success-message')).toHaveText('Registration successful'); // Adjust according to your app's behavior
});
