import { test, expect, Page } from '@playwright/test';

const userData = {
  name: 'Test User',
  country: 'USA',
  city: 'New York',
  card: '1234-1234-1234-1234',
  month: '12',
  year: '31',
};

async function addRandomItemToCart(page: Page) {
  await page.goto('https://www.demoblaze.com/');
  const products = page.locator('.card-title a');
  const count = await products.count();
  const randomIndex = Math.floor(Math.random() * count);
  await products.nth(randomIndex).click();

  await page.waitForTimeout(1000);
  await page.locator('.btn-lg').click();

  page.once('dialog', async dialog => { 
    await expect(dialog.message()).toBe('Product added'); 
    await dialog.accept();
  });
  await page.locator('#cartur').click();
  await page.waitForTimeout(1000);
}

test('add random item to cart', async ({ page }) => {
  await addRandomItemToCart(page);

  await expect(page.getByRole('row')).toHaveCount(1);
});

test('remove item from cart', async ({ page }) => {
  await addRandomItemToCart(page);

  await page.getByRole('link', { name: 'Delete' }).click();
  await page.locator('.success').waitFor({ state: 'visible', timeout: 10000 });
  await expect(page.locator('#tbodyid > tr:nth-child(1)')).toBeHidden();
});

test('complete checkout', async ({ page }) => {
  await addRandomItemToCart(page);

  await page.getByRole('button', { name: 'Place Order' }).click();

  await page.locator('#name').fill(userData.name);
  await page.locator('#country').fill(userData.country);
  await page.locator('#city').fill(userData.city);
  await page.locator('#card').fill(userData.card);
  await page.locator('#month').fill(userData.month);
  await page.locator('#year').fill(userData.year);

  await page.getByRole('button', { name: 'Purchase' }).click();

  await expect(
    page.getByRole('heading', { name: 'Thank you for your purchase!' })
  ).toBeVisible();
});
