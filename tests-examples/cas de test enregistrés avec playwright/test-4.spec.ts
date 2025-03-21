import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  await page.locator('div').filter({ hasText: /^Elements$/ }).first().click();
  await page.getByText('Radio Button').click();
  await page.getByText('Yes').click();
  const selectYes = page.getByText('You have selected Yes');
  await expect(selectYes).toBeVisible();

  await page.waitForTimeout(5000);

  await page.getByText('Impressive').click();
  const selectImpressive = page.getByText('You have selected impressive');
  await expect(selectImpressive).toBeVisible();
});

test('test radio button selection', async ({ page }) => {
  await page.goto('https://demoqa.com/');

  // Aller dans "Elements" puis "Radio Button"
  await page.getByText('Elements').click();
  await page.getByText('Radio Button').click();

  // Fonction pour cliquer sur un bouton radio et vérifier le texte affiché
  const verifySelection = async (option, expectedText) => {
    await page.getByText(option).click();
    const confirmationText = page.getByText(`You have selected ${expectedText}`);
    await expect(confirmationText).toBeVisible();
  };

  // Vérifier "Yes"
  await verifySelection('Yes', 'Yes');

  // Vérifier "Impressive"
  await verifySelection('Impressive', 'Impressive');
});
