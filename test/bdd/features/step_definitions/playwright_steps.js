import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { chromium, expect } from '@playwright/test';


Before(async function () {
    const browser = await chromium.launch({ headless: true });
    this.browser = browser
});

After(async function () {
    await this.browser.close();
});

Given('I am on the Flutter Web app', async function () {
    const context = await this.browser.newContext();
    const page = await context.newPage();
    this.page = page
    await this.page.goto('http://localhost:3002/');
    await expect(this.page).toHaveTitle(/Flutter Demo/);
})

When('I increment the counter {int} times', async function (times) {
    await this.page.getByRole('button', { name: 'Increment' }).click();

    for (let i = 0; i < times - 1; i++) {
        await this.page.getByRole('button', { name: 'Increment Increment' }).click();
    }
});

Then('the counter should show the number {int}', async function (times) {
    await expect(this.page.locator('#flt-semantic-node-5')).toContainText('' + times);
});
