import { Page } from '@playwright/test';
import { fillTextField, selectDropdown } from '../utils/helpers.ts';
import { dataUser } from '../utils/test-data.ts';

export class FormsPage {
  constructor(private page: Page) {}

  async goToPracticeForm() {
    await this.page.getByText('Practice Form', { exact: true }).click();
  }
// Éléments pour remplir le formulaire avec les données de l'utilisateur stockés dans le fichier test-data.ts
  async fillForm() {
    await fillTextField(this.page, 'First Name', dataUser.firstName);
    await fillTextField(this.page, 'Last Name', dataUser.lastName);
    await fillTextField(this.page, 'name@example.com', dataUser.email);
    await this.page.getByText('Male', { exact: true }).click();
    await fillTextField(this.page, 'Mobile Number', dataUser.mobileNumber);

//Permet de sélectionner la date de naissance avec le calendrier
    await this.page.locator('#dateOfBirthInput').click();
    await this.page.locator('div').filter({ hasText: /^JanuaryFebruaryMarchAprilMayJuneJulyAugustSeptemberOctoberNovemberDecember$/ }).getByRole('combobox').selectOption('5');
    await this.page.getByRole('combobox').nth(1).selectOption('2001');
    await this.page.getByRole('option', { name: 'Choose Sunday, June 10th,' }).click();

    await this.page.waitForTimeout(5000); // J'ai mis du temps pour qu'on puisse voir que la date est bien sélectionnée

//Permet la sélection des sujets en tapant la 1ère lettre du sujet et en cliquant sur le sujet ( ici 3)
    await this.page.locator('.subjects-auto-complete__value-container').click();
    await this.page.locator('#subjectsInput').fill('i');
    await this.page.getByText('Computer Science', { exact: true }).click();

    await this.page.locator('.subjects-auto-complete__value-container').click();
    await this.page.locator('#subjectsInput').fill('n');
    await this.page.getByText('English', { exact: true }).click();
    
    await this.page.locator('.subjects-auto-complete__value-container').click();
    await this.page.locator('#subjectsInput').fill('a');
    await this.page.getByText('Arts', { exact: true }).click();

    await this.page.waitForTimeout(5000); //ici le temps pour voir que le ou les sujets sont bien renseignés

    await this.page.getByText('Sports').click(); // Sélection du checkbox Sports
    

    await fillTextField(this.page, 'Current Address', 'On remplit ce champ pour tester'); // Remplissage du champ Current Address

    //Sélection  de State et de City
    await selectDropdown(this.page, '#state svg', 'NCR');
    await selectDropdown(this.page, '#city svg', 'Delhi');

    //Temps pour vérifier que les champs 'State' et 'City' sont bien sélectionnés
    await this.page.waitForTimeout(5000);

    await this.page.getByRole('button', { name: 'Submit' }).click();  // Click sur le bouton Submit

    await this.page.waitForTimeout(7000); // Temps pour voir le récapitulatif du formulaire

    await this.page.getByRole('button', { name: 'Close' }).click();
  }
}


// ------------------------------------------------------------------------------------------------------------------------------------------------

//Ancien code pour sélectionner la date de naissance :
    // await this.page.locator('#dateOfBirthInput').click();
    // await this.page.locator('div.react-datepicker__month-select').selectOption('3');
    // await this.page.locator('div.react-datepicker__year-select').selectOption('2001');
    // await this.page.getByRole('option', { name: 'Choose Wednesday, April 11th,' }).click();

//Ancien code pour la sélection des sujets : 
    // await this.page.locator('#subjectsInput').fill('Computer');
    // await this.page.getByText('Computer Science', { exact: true }).click();
    // await this.page.getByText('Sports').click();