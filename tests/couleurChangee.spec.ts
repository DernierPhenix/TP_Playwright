import { test } from '@playwright/test';
import { BasePage } from '../pages/BasePage';
import { ElementsPage } from '../pages/ElementsPage';

test('Vérifier le changement de couleur', async ({ page }) => {
  const homePage = new BasePage(page);
  const elementsPage = new ElementsPage(page);

  await homePage.goTo();
  await homePage.navigateTo('Elements');
  await elementsPage.goToDynamicProperties();
  await elementsPage.verifyColorChange();
});