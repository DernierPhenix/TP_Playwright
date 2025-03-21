import { Page, expect } from '@playwright/test';

export class ElementsPage {
  constructor(private page: Page) {}

  //Permet de se rendre sur la page Elements
  async goToLinks() {
    await this.page.getByText('Links', { exact: true }).click();
  }

 //Permet de se rendre sur la page Radio Button
  async goToRadioButton() {
    await this.page.getByText('Radio Button', { exact: true }).click();
  }

// Permet de se rendre sur la page Dynamic Properties
  async goToDynamicProperties() {
    await this.page.getByText('Dynamic Properties', { exact: true }).click();
  }

// Permet de cliquer sur le lien et attend que la page soit visible
  async verifyLink(linkName: string, expectedText: string) {
    await this.page.getByRole('link', { name: linkName }).click();
    const response = await this.page.getByText(expectedText);
    await expect(response).toBeVisible();
  }

// Permet de cliquer sur le bouton radio et attend que le text "You have selected" soit visible
  async verifyRadio(option: string) {
    await this.page.getByText(option).click();
    const confirmationText = this.page.getByText(`You have selected ${option}`);
    await expect(confirmationText).toBeVisible();
  }

// Permet de vérifier la couleur du texte, le récupère et affiche dans la console la couleur initiale et la couleur finale
  async verifyColorChange() {
    
    // await this.page.getByRole('button', { name: 'Color Change' }).click();
    const colorChangeButton = this.page.getByRole('button', { name: 'Color Change' });
    const initialColor = await colorChangeButton.evaluate((button) => window.getComputedStyle(button).color);
    await colorChangeButton.click();  // Click sur le bouton Color Change
    console.log('Couleur initiale', initialColor); // Affiche la couleur initiale dans la console

// Merci Copilot pour cette ligne de code ;-) 
    await expect
      .poll(async () => await colorChangeButton.evaluate((btn) => window.getComputedStyle(btn).color), { timeout: 6000 }) //Exécute la fonction plusieurs fois pdt un temps donné (ici 6sec) jusqu'à ce que la couleur change
      .not.toBe(initialColor);
    
    console.log('Couleur Finale', await colorChangeButton.evaluate((btn) => window.getComputedStyle(btn).color)); //affiche la couleur finale dans la console
  }
}