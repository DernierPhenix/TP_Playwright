import { Page } from '@playwright/test';

export async function fillTextField(page: Page, label: string, value: string) {
  const field = page.getByRole('textbox', { name: label });
  await field.fill(value);
}

export async function selectDropdown(page: Page, locator: string, value: string) {
  await page.locator(locator).click();
  await page.getByText(value, { exact: true }).click();
}