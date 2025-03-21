import { test, expect } from '@playwright/test';


test('vérification du changement de couleur', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  await page.locator('div').filter({ hasText: /^Elements$/ }).first().click();
  await page.getByText('Dynamic Properties').click();

  // Localiser le bouton "Color Change"
  const colorChangeButton = page.getByRole('button', { name: 'Color Change' });

  // Récupérer la couleur initiale
  const initialColor = await colorChangeButton.evaluate((button) => {
  
    return window.getComputedStyle(button).color;
  });
  console.log('Couleur initiale', initialColor);
  // Attendre que la couleur change (le bouton change après 5 secondes)
  await page.waitForTimeout(6000);

  // Récupérer la couleur après le changement
  const changedColor = await colorChangeButton.evaluate((button) => {
    return window.getComputedStyle(button).color;
  });
  console.log('Couleur Changée', changedColor);

  // Vérifier que la couleur a changé
  expect(initialColor).not.toBe(changedColor);
});


test('vérification du changement de couleur2', async ({ page }) => {
  await page.goto('https://demoqa.com/');

  // Aller dans "Elements" puis "Dynamic Properties"
  await page.getByText('Elements').click();
  await page.getByText('Dynamic Properties').click();

  // Localiser le bouton "Color Change"
  const colorChangeButton = page.getByRole('button', { name: 'Color Change' });

  // Fonction pour récupérer la couleur du bouton
  const getButtonColor = async () => {
    return await colorChangeButton.evaluate((button) => window.getComputedStyle(button).color);
  };

  // Récupérer la couleur initiale
  const initialColor = await getButtonColor();
  console.log('Couleur initiale:', initialColor);

  // Attendre que la couleur change (au lieu de `waitForTimeout`, on attend un changement)
  await expect
    .poll(async () => await getButtonColor(), { timeout: 6000 }) // Vérifie la couleur pendant 6 secondes max
    .not.toBe(initialColor);

  // Récupérer la nouvelle couleur après le changement
  const changedColor = await getButtonColor();
  console.log('Couleur changée:', changedColor);

  // Vérifier que la couleur a bien changé
  expect(initialColor).not.toBe(changedColor);
});
