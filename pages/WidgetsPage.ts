import { Page, expect } from '@playwright/test';

export class WidgetsPage {
  constructor(private page: Page) {}

//Permet de se rendre sur la page ToolTips
  async goToToolTips() {
    await this.page.getByText('Tool Tips', { exact: true }).click();
  }

// Permet de vérifier les ToolTips et de les stocker dans un tableau
  async verifyTooltips() {
    const elementsToTest = [
      { locator: this.page.getByRole('button', { name: 'Hover me to see' }), expectedText: 'You hovered over the Button' },
      { locator: this.page.locator('#toolTipTextField'), expectedText: 'You hovered over the text field' },
      { locator: this.page.getByRole('link', { name: 'Contrary' }), expectedText: 'You hovered over the Contrary' },
      { locator: this.page.getByRole('link', { name: '1.10.32' }), expectedText: 'You hovered over the 1.10.32' },
    ];

// Boucle pour vérifier chaque ToolTips - J'ai véirfié que le tooltip dans le code HTML est d'abord caché puis visible au survol de la souris
    for (const { locator, expectedText } of elementsToTest) {
      await expect(locator).not.toHaveAttribute('aria-describedby');
      await locator.hover();
      await expect(locator).toHaveAttribute('aria-describedby');
      const tooltipId = await locator.getAttribute('aria-describedby');
      const tooltip = this.page.locator(`#${tooltipId}`);
      await expect(tooltip).toBeVisible();
      await expect(tooltip).toHaveText(expectedText);
    }
  }
}