const { test, expect } = require('@playwright/test');

const menuItems = [
  'Dashboard',
  'Model Registry',
  'Stock Watchlist',
  'Buy Zone Monitor',
  'Batch Log',
  'Agent Workflow',
  'Requirements & QA',
  'Settings'
];

async function expectNoBlankScreen(page) {
  await expect(page.locator('#app')).toBeVisible();
  await expect(page.locator('#page-title')).toBeVisible();
  await expect(page.locator('#content')).toBeVisible();
  const contentText = (await page.locator('#content').innerText()).trim();
  expect(contentText.length).toBeGreaterThan(20);
}

async function collectConsoleErrors(page, errors) {
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', err => errors.push(err.message));
}

test.describe('Model Factory Hub Lite - PQA smoke test', () => {
  test('app opens without crash and every main page renders', async ({ page }) => {
    const errors = [];
    await collectConsoleErrors(page, errors);
    await page.goto('/', { waitUntil: 'networkidle' });
    await expect(page).toHaveTitle(/Model Factory Hub Lite/i);
    await expectNoBlankScreen(page);

    for (const item of menuItems) {
      await page.getByRole('button', { name: new RegExp(item, 'i') }).click();
      await expect(page.locator('#page-title')).toContainText(item);
      await expectNoBlankScreen(page);
    }

    expect(errors, `Console/page errors: ${errors.join('\n')}`).toHaveLength(0);
  });

  test('dashboard key buttons work', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.getByRole('button', { name: /Toggle theme/i }).click();
    await expect(page.locator('body')).toHaveClass(/light/);
    await page.getByRole('button', { name: /Toggle theme/i }).click();
    await expect(page.locator('#app')).toBeVisible();

    await page.getByRole('button', { name: /System Health/i }).click();
    await expect(page.locator('#modal-root')).toBeVisible();
    await expect(page.locator('#modal-root')).toContainText(/System Health|Mode|Model count/i);
    await page.getByRole('button', { name: /Close/i }).click();
    await expect(page.locator('#modal-root')).toHaveClass(/hidden/);
  });

  test('model registry search, empty state, and detail modal work', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.getByRole('button', { name: /Model Registry/i }).click();
    await expect(page.locator('#content')).toContainText(/Model Registry/i);

    await page.locator('#model-search').fill('M7');
    await expect(page.locator('#content')).toContainText(/M7/i);
    await page.locator('tr[data-model="M7"]').first().click();
    await expect(page.locator('#modal-root')).toBeVisible();
    await expect(page.locator('#modal-root')).toContainText(/M7/i);
    await page.getByRole('button', { name: /Close/i }).click();

    await page.locator('#model-search').fill('zzzz-no-result');
    await expect(page.locator('#content')).toContainText(/ไม่พบ|No|empty/i);
  });

  test('stock watchlist search and ticker detail work', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.getByRole('button', { name: /Stock Watchlist/i }).click();
    await expect(page.locator('#content')).toContainText(/Stock Watchlist/i);

    await page.locator('#stock-search').fill('SOFI');
    await expect(page.locator('#content')).toContainText(/SOFI/i);
    await page.locator('tr[data-stock="SOFI"]').first().click();
    await expect(page.locator('#modal-root')).toBeVisible();
    await expect(page.locator('#modal-root')).toContainText(/SOFI/i);
    await page.getByRole('button', { name: /Close/i }).click();

    await page.locator('#stock-search').fill('zzzz-no-stock');
    await expect(page.locator('#content')).toContainText(/ไม่พบ|No|empty/i);
  });

  test('buy zone filter and QA checklist do not crash', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.getByRole('button', { name: /Buy Zone Monitor/i }).click();
    await expect(page.locator('#content')).toContainText(/Buy Zone Monitor/i);
    await page.locator('#buy-status').selectOption('near');
    await expect(page.locator('#content')).toContainText(/Near Buy Zone|SOFI|ERII/i);

    await page.getByRole('button', { name: /Requirements & QA/i }).click();
    await expect(page.locator('#content')).toContainText(/PQA Test Cases|MVP Acceptance/i);
    const firstCheckbox = page.locator('input[type="checkbox"]').first();
    await firstCheckbox.click({ force: true });
    await expect(page.locator('#content')).toBeVisible();
  });
});
