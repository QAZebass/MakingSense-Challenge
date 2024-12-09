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
        const sortedPrices = await productListPage.selectFromCheapestToHighest();
        console.log(`Cars sorted from low to high: ${JSON.stringify(sortedPrices, null, 2)}`);
    });


});