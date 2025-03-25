import { test } from '@playwright/test';
import { BasePage } from '../pages/BasePage'; // adapte le chemin selon ton projet
import { WidgetsPage } from '../pages/WidgetsPage'; // idem, ajuste le chemin

test('Vérification des ToolTips sur DemoQA', async ({ page }) => {
  const basePage = new BasePage(page);
  const widgetsPage = new WidgetsPage(page);

  // Aller sur le site DemoQA
  await basePage.goTo();

  // Naviguer vers la section Widgets > Tool Tips
  await basePage.navigateTo('Widgets');
  await widgetsPage.goToToolTips();

  // Vérifier le comportement des tooltips
  await widgetsPage.verifyTooltips();
});
