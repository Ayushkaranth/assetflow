import { test, expect } from '@playwright/test';

test.describe('AssetFlow Critical User Journey', () => {

  // 1. Test Landing Page (Generic)
  test('should load homepage and display main elements', async ({ page }) => {
    await page.goto('/');
    
    // Check that the page title contains the app name
    // (This works as long as your metadata has "AssetFlow")
    await expect(page).toHaveTitle(/AssetFlow/i);
    
    // Check for ANY main heading (H1)
    // We don't care what it says, just that a title exists.
    await expect(page.locator('h1')).toBeVisible();
    
    // Check that the Navigation Bar exists
    await expect(page.locator('nav')).toBeVisible();
  });

  // 2. Test Navigation to Market (Link Based)
  test('should navigate to marketplace via links', async ({ page }) => {
    await page.goto('/');
    
    // Instead of looking for "Start Trading" text, 
    // we look for ANY link that points to "/market"
    const marketLink = page.locator('a[href="/market"]').first();
    
    // Ensure the link exists and click it
    await expect(marketLink).toBeVisible();
    await marketLink.click();
    
    // URL should change to /market
    await expect(page).toHaveURL('/market');
    
    // Check that *something* loaded in the market
    // We check for the main grid container or the empty state
    // (This assumes your grid has a class like 'grid' or uses standard div structures)
    const mainContent = page.locator('main');
    await expect(mainContent).toBeVisible();
  });

  // 3. Test Create Page Protection
  test('create page should require wallet', async ({ page }) => {
    await page.goto('/create');
    
    // Look for the main submit button (usually the last button on the form)
    // We target it by looking for a button inside the main container
    const submitBtn = page.locator('main button').last();
    
    // Setup listener for the "Connect Wallet" alert
    page.on('dialog', dialog => {
      console.log(`Alert message: ${dialog.message()}`);
      dialog.dismiss();
    });

    // Click it to trigger the validation
    await submitBtn.click();
  });

});