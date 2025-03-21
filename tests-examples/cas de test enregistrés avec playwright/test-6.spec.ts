import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  await page.locator('div').filter({ hasText: /^Book Store Application$/ }).first().click();
  await page.getByText('Profile').click();
  await page.getByRole('link', { name: 'register' }).click();
  await page.getByRole('textbox', { name: 'First Name' }).click();
  await page.getByRole('textbox', { name: 'First Name' }).fill('Jean-Pierre');
  await page.getByRole('textbox', { name: 'Last Name' }).click();
  await page.getByRole('textbox', { name: 'Last Name' }).fill('FLEURY');
  await page.getByRole('textbox', { name: 'UserName' }).click();
  await page.getByRole('textbox', { name: 'UserName' }).fill('jpfleury');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Test123456@');
  await page.waitForTimeout(15000);;
  await page.getByRole('button', { name: 'Register' }).click();
});

test('test register on Book Store Application', async ({ page }) => {
  await page.goto('https://demoqa.com/');

  // Naviguer vers "Book Store Application" puis "Profile"
  await page.getByText('Book Store Application').click();
  await page.getByText('Profile').click();
  await page.getByRole('link', { name: 'register' }).click();

  // Remplir le formulaire d'inscription
  const userData = {
    'First Name': 'Jean-Pierre',
    'Last Name': 'FLEURY',
    'UserName': 'jpfleury',
    'Password': 'Test123456@'
  };

  for (const [field, value] of Object.entries(userData)) {
    await page.getByRole('textbox', { name: field }).fill(value);
  }

  // Attente dynamique (remplacement de `waitForTimeout(15000)`)
  await expect(page.getByRole('button', { name: 'Register' })).toBeEnabled({ timeout: 15000 });

  // Cliquer sur "Register"
  await page.getByRole('button', { name: 'Register' }).click();
});
