import { test, expect } from '@playwright/test';

//Test des liens dans Éléments
test('liens_element', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  await page.locator('div').filter({ hasText: /^Elements$/ }).first().click();
  await page.getByText('Links', { exact: true }).click();

  // Fonction utilitaire pour vérifier les liens
  const verifyLinkResponse = async (linkName: string, expectedText: string) => {
    await page.getByRole('link', { name: linkName }).click();
    const responseText = await page.getByText(expectedText).textContent();
    expect(responseText).toBe(expectedText);
    await page.waitForTimeout(3000); // Si nécessaire
  };

  // Vérifications des différents liens
  await verifyLinkResponse('Created', 'Link has responded with staus 201 and status text Created');
  await verifyLinkResponse('No Content', 'Link has responded with staus 204 and status text No Content');
  await verifyLinkResponse('Moved', 'Link has responded with staus 301 and status text Moved Permanently');
  await verifyLinkResponse('Bad Reques', 'Link has responded with staus 400 and status text Bad Request');
  await verifyLinkResponse('Unauthorized', 'Link has responded with staus 401 and status text Unauthorized');
  await verifyLinkResponse('Forbidden', 'Link has responded with staus 403 and status text Forbidden');
  await verifyLinkResponse('Not Found', 'Link has responded with staus 404 and status text Not Found');
});


// Test pour le formulaire à remplir
test('formulaire1', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  await page.locator('div').filter({ hasText: /^Forms$/ }).first().click();
  await page.getByText('Practice Form').click();

  // Fonction utilitaire pour remplir un champ texte
  const fillTextField = async (selector: string, value: string) => {
    const field = page.getByRole('textbox', { name: selector });
    await field.click();
    await field.fill(value);
  };

  // Fonction utilitaire pour sélectionner une option dans un menu déroulant
  const selectDropdownOption = async (locator: string, value: string) => {
    await page.locator(locator).click();
    await page.getByText(value, { exact: true }).click();
  };

  // Remplissage des champs du formulaire
  await fillTextField('First Name', 'FLEURY');
  await fillTextField('Last Name', 'Antonio');
  await fillTextField('name@example.com', 'fleury.antonio@test.com');
  await page.getByText('Male', { exact: true }).click();
  await fillTextField('Mobile Number', '0601020304');

  // Sélection de la date de naissance
  await page.locator('#dateOfBirthInput').click();
  await page.locator('div').filter({ hasText: /^JanuaryFebruaryMarchAprilMayJuneJulyAugustSeptemberOctoberNovemberDecember$/ }).getByRole('combobox').selectOption('3');
  await page.getByRole('combobox').nth(1).selectOption('2001');
  await page.getByRole('option', { name: 'Choose Wednesday, April 11th,' }).click();

  // Sélection des matières et des hobbies
  await page.locator('.subjects-auto-complete__value-container').click();
  await page.locator('#subjectsInput').fill('i');
  await page.getByText('Computer Science', { exact: true }).click();
  await page.getByText('Sports').click();

  // Remplissage de l'adresse
  await fillTextField('Current Address', 'On remplit ce champ pour tester');
  await selectDropdownOption('#state svg', 'NCR');
  await selectDropdownOption('#city svg', 'Delhi');

  // Soumission du formulaire
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.waitForTimeout(5000);
  await page.getByRole('button', { name: 'Close' }).click();
});


test('test hover tooltips and verify attributes', async ({ page }) => {
  await page.goto('https://demoqa.com/');

  // Aller dans Widgets puis Tool Tips
  await page.getByText('Widgets').click();
  await page.getByText('Tool Tips').click();

  // Liste des éléments à tester avec leur texte attendu
  const elementsToTest = [
    { locator: page.getByRole('button', { name: 'Hover me to see' }), expectedText: 'You hovered over the Button' },
    { locator: page.locator('#toolTipTextField'), expectedText: 'You hovered over the text field' },
    { locator: page.getByRole('link', { name: 'Contrary' }), expectedText: 'You hovered over the Contrary' },
    { locator: page.getByRole('link', { name: '1.10.32' }), expectedText: 'You hovered over the 1.10.32' },
  ];

  for (const { locator, expectedText } of elementsToTest) {
    // Vérifier que l'attribut `aria-describedby` n'existe pas dans la balise HTML avant le hover
    await expect(locator).not.toHaveAttribute('aria-describedby');

    // Survoler l'élément
    await locator.hover();

    // Vérifier que `aria-describedby` est maintenant présent dans la balise HTML
    await expect(locator).toHaveAttribute('aria-describedby');

    // Récupérer l'ID du tooltip
    const tooltipId = await locator.getAttribute('aria-describedby');

    // Vérifier que le tooltip est visible et contient le bon texte
    const tooltip = page.locator(`#${tooltipId}`);
    await expect(tooltip).toBeVisible();
    await expect(tooltip).toHaveText(expectedText);
  }
});

test('test select menu interactions', async ({ page }) => {
  await page.goto('https://demoqa.com/');

  // Naviguer vers "Widgets" puis "Select Menu"
  await page.locator('div:nth-child(4) > div > .avatar > svg').click();
  await page.getByText('Select Menu').click();

  // Sélection dans "Select Option"
  await page.locator('#withOptGroup div').filter({ hasText: 'Select Option' }).nth(1).click();
  await page.getByText('Another root option', { exact: true }).click();

  // Sélection dans "Select One"
  await page.locator('.css-tlfecz-indicatorContainer').first().click();
  await page.getByText('Other', { exact: true }).click();

  // Sélection dans "Old Style Select Menu"
  await page.locator('#oldSelectMenu').selectOption('10');

  // Sélection multiple dans "Multi Select DropDown"
  await page.locator('div').filter({ hasText: /^Select\.\.\.$/ }).nth(2).click();
  const multiSelectOptions = ['#react-select-4-option-0', '#react-select-4-option-1', '#react-select-4-option-2', '#react-select-4-option-3'];
  for (const option of multiSelectOptions) {
    await page.locator(option).click();
  }

  // Sélection de "Audi" dans "Standard Multi-Select"
  await page.locator('#cars').selectOption('audi');
});

test('test radio button selection', async ({ page }) => {
  await page.goto('https://demoqa.com/');

  // Aller dans "Elements" puis "Radio Button"
  await page.getByText('Elements').click();
  await page.getByText('Radio Button').click();

  // Fonction pour cliquer sur un bouton radio et vérifier le texte affiché
  const verifySelection = async (option, expectedText) => {
    await page.getByText(option).click();
    const confirmationText = page.getByText(`You have selected ${expectedText}`);
    await expect(confirmationText).toBeVisible();
  };

  // Vérifier "Yes"
  await verifySelection('Yes', 'Yes');

  // Vérifier "Impressive"
  await verifySelection('Impressive', 'Impressive');
});

test('vérification du changement de couleur2', async ({ page }) => {
  await page.goto('https://demoqa.com/');

  // Aller dans "Elements" puis "Dynamic Properties"
  await page.getByText('Elements').click();
  await page.getByText('Dynamic Properties').click();

  // Localiser le bouton "Color Change"
  const colorChangeButton = page.getByRole('button', { name: 'Color Change' });

  // Fonction pour récupérer la couleur du bouton
  const getButtonColor = async () => {
    return await colorChangeButton.evaluate((button) => window.getComputedStyle(button).color);
  };

  // Récupérer la couleur initiale
  const initialColor = await getButtonColor();
  console.log('Couleur initiale:', initialColor);

  // Attendre que la couleur change (au lieu de `waitForTimeout`, on attend un changement)
  await expect
    .poll(async () => await getButtonColor(), { timeout: 6000 }) // Vérifie la couleur pendant 6 secondes max
    .not.toBe(initialColor);

  // Récupérer la nouvelle couleur après le changement
  const changedColor = await getButtonColor();
  console.log('Couleur changée:', changedColor);

  // Vérifier que la couleur a bien changé
  expect(initialColor).not.toBe(changedColor);
});

test('test register on Book Store Application', async ({ page }) => {
  await page.goto('https://demoqa.com/');

  // Naviguer vers "Book Store Application" puis "Profile"
  await page.getByText('Book Store Application').click();
  await page.getByText('Profile').click();
  await page.getByRole('link', { name: 'register' }).click();

  // Remplir le formulaire d'inscription
  const userData = {
    'First Name': 'Jean-Pierre',
    'Last Name': 'FLEURY',
    'UserName': 'jpfleury',
    'Password': 'Test123456@'
  };

  for (const [field, value] of Object.entries(userData)) {
    await page.getByRole('textbox', { name: field }).fill(value);
  }

  // Attente dynamique (remplacement de `waitForTimeout(15000)`)
  await expect(page.getByRole('button', { name: 'Register' })).toBeEnabled({ timeout: 15000 });

  // Cliquer sur "Register"
  await page.getByRole('button', { name: 'Register' }).click();
});
