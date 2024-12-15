import { expect, test } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { ProductListPage } from '../pages/productListPage';
import staticData from '../support/data/staticInputData.json';
test.describe('Making Sense Challenge', async () => {

    test.beforeEach('Visit Mercadolibre', async ({ page }) => {
        const homePage = new HomePage(page);
        await homePage.visitMercadoLibre('/');

    });
    test('Validate that the user can search for cheap cars', async ({ page }) => {
        const homePage = new HomePage(page);
        const productListPage = new ProductListPage(page);
        await homePage.typeInSearch(staticData.Input.product);
        await homePage.clickOnSubmit();
        await productListPage.applyProvinceFilter(staticData.Input.province);
        await productListPage.typeInMaxPrice(staticData.Input.maxPrice);
        await productListPage.applyPriceFilter();
        await productListPage.clickOnSortingDropdown();
        const { sortedPrices, numberOfResults } = await productListPage.selectFromCheapestToHighest();
        console.log(`The number of cars found under 6.000.000 is: ${numberOfResults}: ${JSON.stringify(sortedPrices, null, 2)}`);
    });


});