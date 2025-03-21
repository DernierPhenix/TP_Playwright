import { test, expect } from '@playwright/test';

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
// test('test', async ({ page }) => {
//   await page.goto('https://demoqa.com/');
//   await page.locator('div').filter({ hasText: /^Widgets$/ }).first().click();
//   await page.getByText('Tool Tips').click();
//   await page.getByRole('button', { name: 'Hover me to see' }).hover();
//   // await page.getByRole('link', { name: 'Contrary' }).click();
//   // await page.getByRole('link', { name: '1.10.32' }).click();
// });

// test('teste', async ({ page }) => {
//   await page.goto('https://demoqa.com/');
//   await page.locator('div').filter({ hasText: /^Widgets$/ }).first().click();
//   await page.getByText('Tool Tips').click();

//   // Effectuer un hover sur le bouton
//   await page.getByRole('button', { name: 'Hover me to see' }).hover();
//   await page.waitForTimeout(10000)
//   // Vérifier que l'élément avec la classe "tooltip-inner" apparaît
//   const tooltip = page.locator('.tooltip-inner');
//   await expect(tooltip).toBeVisible();
// });

// test('vérification du hover et du message', async ({ page }) => {
//   await page.goto('https://demoqa.com/');
//   await page.locator('div').filter({ hasText: /^Widgets$/ }).first().click();
//   await page.getByText('Tool Tips').click();

//   // Effectuer un hover sur le bouton
//   const button = page.getByRole('button', { name: 'Hover me to see' });
//   await button.hover();

//   // Attendre que l'élément lié à l'attribut aria-describedby apparaisse
//   const tooltipId = await button.getAttribute('aria-describedby');
//   const tooltip = page.locator(`#${tooltipId}`);
//   await expect(tooltip).toBeVisible();

//   // Vérifier le contenu du message
//   const tooltipText = await tooltip.textContent();
//   expect(tooltipText).toBe('You hovered over the Button');
// });

// test('test hover tooltip and verify attribute', async ({ page }) => {
//   await page.goto('https://demoqa.com/');

//    await page.getByText('Widgets').click();
//    await page.getByText('Tool Tips').click();

//   // Sélection du bouton stocké dans une variable const
//   const hoverButton = page.getByRole('button', { name: 'Hover me to see' });

//   // On Vérifie que l'attribut `aria-describedby` n'existe pas dans la balise HTML AVANT le hover
//   await expect(hoverButton).not.toHaveAttribute('aria-describedby');

//   // Survole du bouton
//   await hoverButton.hover();

//   // Vérifier que l'attribut `aria-describedby` apparaît dans la balise HTML APRÈS le hover
//   await expect(hoverButton).toHaveAttribute('aria-describedby'); // On vérifie qu'il y a la présence de l'attribut

//   // Récupérer l'ID du tooltip
//   const tooltipId = await hoverButton.getAttribute('aria-describedby');

//   // Vérifier le contenu du tooltip
//   const tooltip = page.locator(`#${tooltipId}`);
//   await expect(tooltip).toBeVisible();
//   await expect(tooltip).toHaveText('You hovered over the Button');
// });

// test('test hover textfieldtooltip and verify attribute', async ({ page }) => {
//   await page.goto('https://demoqa.com/');

//    await page.getByText('Widgets').click();
//    await page.getByText('Tool Tips').click();

//   // Sélection du bouton stocké dans une variable const
//   const hoverInput = page.locator('#toolTipTextField');

//   // On Vérifie que l'attribut `aria-describedby` n'existe pas dans la balise HTML AVANT le hover
//   await expect(hoverInput).not.toHaveAttribute('aria-describedby');

//   // Survole du bouton
//   await hoverInput.hover();

//   // Vérifier que l'attribut `aria-describedby` apparaît dans la balise HTML APRÈS le hover
//   await expect(hoverInput).toHaveAttribute('aria-describedby'); // On vérifie qu'il y a la présence de l'attribut

//   // Récupérer l'ID du tooltip
//   const texttooltipId = await hoverInput.getAttribute('aria-describedby');

//   // Vérifier le contenu du tooltip
//   const texttooltip = page.locator(`#${texttooltipId}`);
//   await expect(texttooltip).toBeVisible();
//   await expect(texttooltip).toHaveText('You hovered over the text field');
// });


// test('test hover tooltip on Contrary link', async ({ page }) => {
//   await page.goto('https://demoqa.com/');

//   // Aller dans Widgets
//   await page.getByText('Widgets').click();

//   // Aller dans Tool Tips
//   await page.getByText('Tool Tips').click();

//   // Sélectionner le lien "Contrary"
//   const numbersLink = page.getByRole('link', { name: 'Contrary' });

//   // Vérifier que `aria-describedby` n'existe pas avant le hover
//   await expect(numbersLink).not.toHaveAttribute('aria-describedby');

//   // Survoler le lien
//   await numbersLink.hover();

//   // Vérifier que `aria-describedby` est maintenant présent
//   await expect(numbersLink).toHaveAttribute('aria-describedby');

//   // Récupérer l'ID du tooltip
//   const tooltipId = await numbersLink.getAttribute('aria-describedby');

//   // Vérifier le contenu du tooltip
//   const tooltip = page.locator(`#${tooltipId}`);
//   await expect(tooltip).toBeVisible();
//   await expect(tooltip).toHaveText('You hovered over the Contrary');
// });
// test('test hover tooltip on numbers link', async ({ page }) => {
//   await page.goto('https://demoqa.com/');

//   // Aller dans Widgets
//   await page.getByText('Widgets').click();

//   // Aller dans Tool Tips
//   await page.getByText('Tool Tips').click();

//   // Sélectionner le lien "Contrary"
//   const numbersLink = page.getByRole('link', { name: '1.10.32' });

//   // Vérifier que `aria-describedby` n'existe pas avant le hover
//   await expect(numbersLink).not.toHaveAttribute('aria-describedby');

//   // Survoler le lien
//   await numbersLink.hover();

//   // Vérifier que `aria-describedby` est maintenant présent
//   await expect(numbersLink).toHaveAttribute('aria-describedby');

//   // Récupérer l'ID du tooltip
//   const tooltipId = await numbersLink.getAttribute('aria-describedby');

//   // Vérifier le contenu du tooltip
//   const tooltip = page.locator(`#${tooltipId}`);
//   await expect(tooltip).toBeVisible();
//   await expect(tooltip).toHaveText('You hovered over the 1.10.32');
// });




