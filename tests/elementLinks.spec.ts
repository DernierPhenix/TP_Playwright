import { test } from '@playwright/test';
import { BasePage } from '../pages/BasePage';
import { ElementsPage } from '../pages/ElementsPage';

// Je stocke les liens et les textes attendus dans un tableau
const links = [
  { link: 'Created', text: 'Link has responded with staus 201 and status text Created' },
  { link: 'No Content', text: 'Link has responded with staus 204 and status text No Content' },
  { link: 'Moved', text: 'Link has responded with staus 301 and status text Moved Permanently' },
  { link: 'Bad Reques', text: 'Link has responded with staus 400 and status text Bad Request' },
  { link: 'Unauthorized', text: 'Link has responded with staus 401 and status text Unauthorized' },
  { link: 'Forbidden', text: 'Link has responded with staus 403 and status text Forbidden' },
  { link: 'Not Found', text: 'Link has responded with staus 404 and status text Not Found' },
];

test('Test des liens dans Elements', async ({ page }) => {
  const homePage = new BasePage(page);  // J'instancie la classe BasePage que je stocke dans la variable homePage
  const elementsPage = new ElementsPage(page); // pareil avec la class ElementsPage que je stocke dans la variable elementsPage

  await homePage.goTo();
  await homePage.navigateTo('Elements');
  await elementsPage.goToLinks();

// Je boucle sur le tableau links pour vérifier chaque lien avec un temps de 2sec entre chaque vérification
  for (const { link, text } of links) {
    await elementsPage.verifyLink(link, text);
    await page.waitForTimeout(2000);
  }
});