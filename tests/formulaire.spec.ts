import { test } from '@playwright/test';
import { BasePage } from '../pages/BasePage';
import { FormsPage } from '../pages/FormsPage';

test('Remplir le formulaire de practice', async ({ page }) => {
  const homePage = new BasePage(page);
  const formsPage = new FormsPage(page);

  await homePage.goTo();
  await homePage.navigateTo('Forms');
  await formsPage.goToPracticeForm();
  await formsPage.fillForm();
});