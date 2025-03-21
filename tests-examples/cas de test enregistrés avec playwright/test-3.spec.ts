import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  await page.locator('div:nth-child(4) > div > .avatar > svg').click();
  await page.getByText('Select Menu').click();
  await page.locator('#withOptGroup div').filter({ hasText: 'Select Option' }).nth(1).click();
  await page.getByText('Another root option', { exact: true }).click();
  await page.locator('.css-tlfecz-indicatorContainer').first().click();
  await page.getByText('Other', { exact: true }).click();
  await page.locator('#oldSelectMenu').selectOption('10');
  await page.locator('div').filter({ hasText: /^Select\.\.\.$/ }).nth(2).click();
  await page.locator('#react-select-4-option-0').click();
  await page.locator('#react-select-4-option-1').click();
  await page.locator('#react-select-4-option-2').click();
  await page.locator('#react-select-4-option-3').click();
  await page.locator('#cars').selectOption('audi');
});


test('test select menu interactions', async ({ page }) => {
  await page.goto('https://demoqa.com/');

  // Naviguer vers "Widgets" puis "Select Menu"
  await page.locator('div:nth-child(4) > div > .avatar > svg').click();
  await page.getByText('Select Menu').click();

  // Sélection dans "Select Option"
  await page.locator('#withOptGroup div').filter({ hasText: 'Select Option' }).nth(1).click();
  await page.getByText('Another root option', { exact: true }).click();

  // Sélection dans "Select One"
  await page.locator('.css-tlfecz-indicatorContainer').first().click();
  await page.getByText('Other', { exact: true }).click();

  // Sélection dans "Old Style Select Menu"
  await page.locator('#oldSelectMenu').selectOption('10');

  // Sélection multiple dans "Multi Select DropDown"
  await page.locator('div').filter({ hasText: /^Select\.\.\.$/ }).nth(2).click();
  const multiSelectOptions = ['#react-select-4-option-0', '#react-select-4-option-1', '#react-select-4-option-2', '#react-select-4-option-3'];
  for (const option of multiSelectOptions) {
    await page.locator(option).click();
  }

  // Sélection de "Audi" dans "Standard Multi-Select"
  await page.locator('#cars').selectOption('audi');
});
