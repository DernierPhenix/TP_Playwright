import { Page, expect } from '@playwright/test';
import { fillTextField } from '../utils/helpers';


export class BookstorePage {
  constructor(private page: Page) {}

  async goToProfile() {
    await this.page.getByText('Profile', { exact: true }).click();
  }

  async goToRegister() {
    await this.page.getByRole('link', { name: 'register' }).click();
  }

  async goToLogin() {
    await this.page.getByRole('listitem').filter({ hasText: 'Login' }).click();
  }

  async login(username: string, password: string) {
    await this.page.getByRole('textbox', { name: 'UserName' }).fill(username);
    await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
    await this.page.getByRole('button', { name: 'Login' }).click();
  }
  async registerUser(userData: { [key: string]: string }) {
    for (const [field, value] of Object.entries(userData)) {
      await fillTextField(this.page, field, value);
    }
    await this.page.waitForTimeout(15000);
    await this.page.getByRole('button', { name: 'Register' }).click();
  }
  
  async verifyUserIsLoggedIn() {
    const logoutButton = this.page.getByRole('button', { name: 'Log out' });
    await expect(logoutButton).toBeVisible();
    console.log('Le bouton Log out est présent : utilisateur connecté avec succès !');
  }
}