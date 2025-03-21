// tests/login.spec.ts

import { test } from '@playwright/test';
import { BasePage } from '../pages/BasePage';
import { BookstorePage } from '../pages/BookstorePage';
import { donneeUser } from '../utils/test-data';

test('Login Book Store Application', async ({ page }) => {
  const basePage = new BasePage(page);
  const bookstorePage = new BookstorePage(page);

    await basePage.goTo();
    await basePage.navigateTo('Book Store Application');
    await bookstorePage.goToLogin();
    await bookstorePage.login(donneeUser.login, donneeUser.password);
    await bookstorePage.verifyUserIsLoggedIn();
});
