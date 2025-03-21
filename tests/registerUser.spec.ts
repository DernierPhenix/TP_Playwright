import { test } from '@playwright/test';
import { BasePage } from '../pages/BasePage';
import { BookstorePage } from '../pages/BookstorePage';
import { userData } from '../utils/test-data';

test('Test d\'inscription Book Store', async ({ page }) => {
  const homePage = new BasePage(page);
  const bookstorePage = new BookstorePage(page);

  await homePage.goTo();
  await homePage.navigateTo('Book Store Application');
  await bookstorePage.goToProfile();
  await bookstorePage.goToRegister();
  await bookstorePage.registerUser(userData);
  
});
//J'ai mis un timer de 15 Seconde pour le CAPCHAT car Je n'ai pas trouvé la solution pour le passer outre. Donc je le fais manuellement et le test se poursuit après les 15 secondes.
