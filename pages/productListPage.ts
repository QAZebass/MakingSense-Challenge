import { expect, Page, Locator } from '@playwright/test';

export class ProductListPage {
    page: Page;
    private locationTitle: Locator;
    private priceTitle: Locator;
    private provinceFilterTag: Locator;
    private maxPriceFilterTag: Locator;
    private maxPriceInput: Locator;
    private submitMaxPriceButton: Locator;
    private sortingDropdownWrapper: Locator;
    private sortingDropdown: Locator;
    private dropDownListWrapper: Locator;
    private dropDownList: Locator;
    private fromLowToHighOption: Locator;
    private productWrapper: Locator;
    private productPrice: Locator;
    private productName: Locator;

    constructor(page: Page) {
        this.page = page;
        this.locationTitle = this.page.locator('[class="ui-search-filter-dt-title"]').filter({ hasText: 'Ubicación' });
        this.priceTitle = this.page.locator('[class="ui-search-money-picker-dt-title"]');
        this.provinceFilterTag = this.page.locator('[class="andes-tag__label"]').first();
        this.maxPriceFilterTag = this.page.locator('[id=":R6clee:"]');
        this.maxPriceInput = this.page.locator('[data-testid="Maximum-price"]');
        this.submitMaxPriceButton = this.page.getByTestId('submit-price');
        this.sortingDropdownWrapper = this.page.locator('[class="ui-search-sort-filter"]');
        this.sortingDropdown = this.page.getByRole('button', { name: 'Más relevantes' });
        this.dropDownListWrapper = this.page.locator('[class="andes-floating-menu andes-floating-menu--show"]');
        this.dropDownList = this.page.getByRole("listbox");
        this.fromLowToHighOption = this.page.getByRole('option', { name: 'Menor precio' });
        this.productWrapper = this.page.locator('[class="ui-search-layout__item"]');
        this.productPrice = this.page.locator('[class$="--cents-superscript"]');
        this.productName = this.page.locator('[class="poly-box poly-component__title"]');
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
        await expect(this.submitMaxPriceButton).toBeVisible();
        await expect(this.submitMaxPriceButton).toBeEnabled();
        await this.submitMaxPriceButton.click();
        const formatNumberWithDots = (num: number): string => {
            return new Intl.NumberFormat('de-DE').format(num);
        };
        await expect(this.maxPriceFilterTag).toBeVisible();
        const maxPrice = await this.maxPriceFilterTag.textContent();
        console.log(`Filter applied:${maxPrice}`);
    }
    async clickOnSortingDropdown() {
        await this.sortingDropdownWrapper.waitFor({ state: 'attached', timeout: 6000 });
        await this.sortingDropdown.waitFor({ state: 'attached' });
        await expect(this.sortingDropdown).toBeEnabled();
        await this.sortingDropdown.click();
        await this.dropDownListWrapper.waitFor({});
        await this.dropDownList.waitFor({ state: 'visible' });
        await expect(this.dropDownList).toBeVisible();
    }

    async selectFromCheapestToHighest() {
        await expect(this.fromLowToHighOption).toBeAttached();
        await expect(this.fromLowToHighOption).toBeVisible();
        await this.fromLowToHighOption.click();

        const sortedPrices = await this.getSortedResults();
        return sortedPrices;
    }

    async getSortedResults() {
        const sortedPrices: any = [];
        await expect(this.productWrapper.first()).toBeVisible();
        const allProducts = await this.productWrapper.all();
        for (const product of allProducts) {
            const names: any = await product.locator(this.productName).textContent();
            const prices: any = await product.locator(this.productPrice).textContent();
            const productInformation: models.ProductInfo = {
                car: names,
                price: prices
            };
            sortedPrices.push(productInformation);
        }
        console.log(sortedPrices);
        return sortedPrices;
    }
}