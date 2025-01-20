import { expect, Page, Locator } from '@playwright/test';
import { ProductListPageValidations } from './productListPageValidations';

export class ProductListPage {
    page: Page;
    private verifyer: ProductListPageValidations;
    private locationTitle: Locator;
    private priceTitle: Locator;
    private provinceFilterTag: Locator;
    private maxPriceFilterTag: Locator;
    private maxPriceInput: Locator;
    private submitMaxPriceButton: Locator;
    private sortingDropdownWrapper: Locator;
    private sortingDropdownTitle: Locator;
    private sortingDropdown: Locator;
    private dropDownOptionTitle: Locator;
    private dropDownListWrapper: Locator;
    private dropDownList: Locator;
    private fromLowToHighOption: Locator;
    private productWrapper: Locator;
    private productPrice: Locator;
    private productName: Locator;

    constructor(page: Page) {
        this.page = page;
        this.verifyer = new ProductListPageValidations(this);
        this.locationTitle = this.page.locator('[class="ui-search-filter-dt-title"]').filter({ hasText: 'Ubicación' });
        this.priceTitle = this.page.locator('[class="ui-search-money-picker-dt-title"]');
        this.provinceFilterTag = this.page.locator('[class="andes-tag__label"]').first();
        this.maxPriceFilterTag = this.page.locator('[id=":R6clee:"]');
        this.maxPriceInput = this.page.locator('[data-testid="Maximum-price"]');
        this.submitMaxPriceButton = this.page.getByTestId('submit-price');
        this.sortingDropdownWrapper = this.page.locator('[class="ui-search-view-options"]');
        this.sortingDropdownTitle = this.page.locator('[class="ui-search-view-options__title"]');
        this.sortingDropdown = this.page.getByRole('button', { name: 'Más relevantes' });
        this.dropDownOptionTitle = this.page.locator('[class="andes-list__item-primary"]');
        this.dropDownListWrapper = this.page.locator('[class="andes-floating-menu andes-floating-menu--show"]');
        this.dropDownList = this.page.getByRole("listbox");
        this.fromLowToHighOption = this.page.getByRole('option', { name: 'Menor precio' });
        this.productWrapper = this.page.locator('[class="ui-search-layout__item"]');
        this.productPrice = this.page.locator('[class$="--cents-superscript"]');
        this.productName = this.page.locator('[class="poly-component__title"]');
    }

    verifyThat() {
        return this.verifyer;
    }

    async applyProvinceFilter(province: string) {
        await expect(this.locationTitle).toHaveText('Ubicación');
        const selectedProvince = this.page.getByTitle(`${province}`, { exact: false });
        await expect(selectedProvince).toBeVisible();
        await selectedProvince.click();
        await expect(this.provinceFilterTag).toBeVisible();
        await expect(this.provinceFilterTag).toHaveText(province);
        console.log(`Filter applied: ${await this.provinceFilterTag.textContent()}`);
    }
    async typeInMaxPrice(maxPrice: number) {
        await expect(this.priceTitle).toHaveText('Precio');
        await this.maxPriceInput.type(maxPrice.toString(), { delay: 300 });
    };
    async applyPriceFilter() {
        await this.submitMaxPriceButton.waitFor({ state: 'visible', timeout: 6000 });
        await expect(this.submitMaxPriceButton).toBeVisible();
        await expect(this.submitMaxPriceButton).toBeEnabled();
        await this.submitMaxPriceButton.click();
        await expect(this.maxPriceFilterTag).toBeVisible();
        const maxPrice = await this.maxPriceFilterTag.textContent();
        console.log(`Filter applied:${maxPrice}`);
    }
    async clickOnSortingDropdown() {

        await this.sortingDropdown.waitFor({ state: 'attached' });
        await this.sortingDropdown.waitFor({ state: 'visible' });
        const dropDownTitle = await this.sortingDropdownWrapper.locator(this.sortingDropdownTitle).textContent();
        expect(dropDownTitle).toContain('Ordenar por');
        await expect(this.sortingDropdown).toBeEnabled();
        await expect(this.sortingDropdown).toBeVisible();
        await this.sortingDropdown.hover();

        await expect(async () => {
            await this.sortingDropdown.click();
            await expect(this.dropDownList).toBeVisible();
        }).toPass();
    }

    async selectFromCheapestToHighest() {
        await expect(this.fromLowToHighOption).toBeAttached();
        await expect(this.fromLowToHighOption).toBeVisible();
        const optionTitle = await this.fromLowToHighOption.locator(this.dropDownOptionTitle).textContent();
        expect(optionTitle).toEqual('Menor precio');
        await this.fromLowToHighOption.click();
        const sortedPrices = await this.getSortedResults();
        return sortedPrices;
    }

    async getSortedResults() {
        const sortedProducts: any = [];
        await expect(this.productWrapper.first()).toBeVisible();
        const allProducts = await this.productWrapper.all();
        for (const product of allProducts) {
            const names: any = await product.locator(this.productName).textContent();
            const prices: any = await product.locator(this.productPrice).textContent();
            const productInformation: models.ProductInfo = {
                car: names,
                price: prices
            };
            sortedProducts.push(productInformation);
        }
        return sortedProducts;
    }
}