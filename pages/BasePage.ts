import { Page } from '@playwright/test';

export class BasePage {
  constructor(private page: Page) {}
// Permet de se rendre sur la page d'accueil
  async goTo() {
    await this.page.goto('https://demoqa.com/');
  }

  // Permet de se rendre sur une section de la page en fonction du test à réaliser
  async navigateTo(section: string) {
    await this.page.getByText(section, { exact: true }).click();
  }
}
  