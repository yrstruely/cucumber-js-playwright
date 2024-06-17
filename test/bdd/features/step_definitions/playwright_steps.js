import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { chromium, expect } from '@playwright/test';


Before(async function () {
    const browser = await chromium.launch({ headless: true });
    this.browser = browser
});
  
After(async function () {
   await this.browser.close();
});

Given('I browse to the Wonderous Flutter Web app', async function () {
    const context = await this.browser.newContext();
    const page = await context.newPage();
    this.page = page
    await page.goto('https://wonderous.app/web/');
    await expect(page).toHaveTitle(/Wonderous/);
})

When('I navigate to another page', async function () {
    await this.page.getByRole('button', { name: 'Next' }).click();
    await this.page.locator('flutter-view').click();
    await this.page.getByRole('heading', { name: 'Wonderous' }).click();
});

Then('I should be taken to that page', async function () {
    await expect(this.page.locator('#flt-semantic-node-9')).toContainText('Wonderous');
});
