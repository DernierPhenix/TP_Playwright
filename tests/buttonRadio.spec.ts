import { test } from '@playwright/test';
import { BasePage } from '../pages/BasePage';
import { ElementsPage } from '../pages/ElementsPage';

test('Vérifier les boutons radio', async ({ page }) => {
// --> J'instancie la classe BasePage que je stocke dans la variable homePage
  const homePage = new BasePage(page); 
// --> pareil avec la class ElementsPage que je stocke dans la variable elementsPage
  const elementsPage = new ElementsPage(page);  

// --> J'appelle la méthode goTo() de la classe BasePage et me rends sur la page d'accueil
  await homePage.goTo(); 
// --> J'appelle la méthode navigateTo() de la classe BasePage et me rends sur la page Elements
  await homePage.navigateTo('Elements'); 
// --> J'appelle la méthode goToRadioButton() de la classe ElementsPage et me rends sur la page des boutons radio
  await elementsPage.goToRadioButton(); 

  await elementsPage.verifyRadio('Yes'); 
  await elementsPage.verifyRadio('Impressive');
})