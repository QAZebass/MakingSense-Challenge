import { test } from '../base/pomFixture';
import staticData from '../support/data/staticInputData.json';
test.describe('Making Sense Challenge - Mercado Libre', async () => {

    test('Validate that the user can search for cheap cars', async ({ homePage, productListPage }) => {

        await homePage.visitMercadoLibre();
        await homePage.clickOnArgentina();
        await homePage.verifyThat().MeLiURLisVisible();
        await homePage.typeInSearch(staticData.Input.product);
        await homePage.clickOnSubmit();
        await productListPage.applyProvinceFilter(staticData.Input.province);
        await productListPage.typeInMaxPrice(staticData.Input.maxPrice);
        await productListPage.applyPriceFilter();
        await productListPage.clickOnSortingDropdown();
        await productListPage.selectFromCheapestToHighest();
        await productListPage.verifyThat().pricesAreSorted();
    });

});
