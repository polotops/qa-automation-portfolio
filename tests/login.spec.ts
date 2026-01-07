import { test, expect } from '@playwright/test';
// Test for login functionality on demoblaze.com
// to add sign in tests
let username = "testpolo";
let password =  "123";

test('successful login', async ({ page }) => {
    await page.goto('https://www.demoblaze.com/');
    await page.locator('#login2').click();
    await page.waitForTimeout(1000);
    await page.locator('#loginusername').fill(username);
    await page.locator('#loginpassword').fill(password);
    await page.locator('button:has-text("Log in")').click();
    await page.locator('#nameofuser').waitFor({ state: 'visible', timeout: 10000 });
    await expect(page.locator('#nameofuser')).toHaveText("Welcome " + username);
});

test('stay logged in after navigation', async ({ page }) => {
    await page.goto('https://www.demoblaze.com/');
    await page.locator('#login2').click();
    await page.waitForTimeout(1000);
    await page.locator('#loginusername').fill(username);
    await page.locator('#loginpassword').fill(password);
    await page.locator('button:has-text("Log in")').click();
    await page.locator('#nameofuser').waitFor({ state: 'visible', timeout: 10000 });
    await expect(page.locator('#nameofuser')).toHaveText("Welcome " + username);
    await page.locator('#cartur').click();
    await page.waitForTimeout(1000);
    await page.locator('.nav-link:has-text("Home")').click();
    await page.locator('#nameofuser').waitFor({ state: 'visible', timeout: 10000 });
    await expect(page.locator('#nameofuser')).toHaveText("Welcome " + username);
});

test('failed login with incorrect password', async ({ page }) => {
    await page.goto('https://www.demoblaze.com/');
    await page.locator('#login2').click();
    await page.waitForTimeout(1000);
    await page.locator('#loginusername').fill(username);
    await page.locator('#loginpassword').fill(password + "wrong");
    page.once('dialog', async dialog => {
        expect(dialog.message()).toBe('Wrong password.');
        await dialog.accept();
    });
    await page.locator('button:has-text("Log in")').click();
    await page.waitForTimeout(500);
});

test('failed login with incorrect username', async ({ page }) => {
    await page.goto('https://www.demoblaze.com/');
    await page.locator('#login2').click();
    await page.waitForTimeout(1000);
    await page.locator('#loginusername').fill(username + "wrong");
    await page.locator('#loginpassword').fill(password);
    page.once('dialog', async dialog => {
        expect(dialog.message()).toBe('User does not exist.');
        await dialog.accept();
    });
    await page.locator('button:has-text("Log in")').click();
    await page.waitForTimeout(500);
});

test('failed login with empty password', async ({ page }) => {
    await page.goto('https://www.demoblaze.com/');
    await page.locator('#login2').click();
    await page.waitForTimeout(1000);
    await page.locator('#loginusername').fill("");
    await page.locator('#loginpassword').fill(password);
    page.once('dialog', async dialog => {
      expect(dialog.message()).toBe('Please fill out Username and Password.');
      await dialog.accept();
    });  
    await page.locator('button:has-text("Log in")').click();
    await page.waitForTimeout(1000);

});

test('failed login with empty username', async ({ page }) => {
    await page.goto('https://www.demoblaze.com/');
    await page.locator('#login2').click();
    await page.waitForTimeout(1000);
    await page.locator('#loginusername').fill(username);
    await page.locator('#loginpassword').fill("");
    page.once('dialog', async dialog => {
      expect(dialog.message()).toBe('Please fill out Username and Password.');
      await dialog.accept();
    });
    await page.locator('button:has-text("Log in")').click();
    await page.waitForTimeout(1000);

});

test('successful logout', async ({ page }) => {
    await page.goto('https://www.demoblaze.com/');
    await page.locator('#login2').click();
    await page.waitForTimeout(1000);
    await page.locator('#loginusername').fill(username);
    await page.locator('#loginpassword').fill(password);
    await page.locator('button:has-text("Log in")').click();
    await page.waitForTimeout(1000);
    await page.locator('#logout2').click();
    await page.locator('#login2').waitFor({ state: 'visible', timeout: 10000 });
    await expect(page.locator('#login2')).toBeVisible();
});

