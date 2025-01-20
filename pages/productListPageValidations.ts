import { expect } from '@playwright/test';
import { ProductListPage } from './productListPage';

export class ProductListPageValidations {

    private productListPage: ProductListPage;

    constructor(productListPage: ProductListPage) {
        this.productListPage = productListPage;
    }

    async pricesAreSorted() {
        const sortedPrices = await this.productListPage.getSortedPrices();
        console.log(sortedPrices);
        const isSorted = (arr: any) => arr.every((v: number, i: number, a: number[]) => !i || a[i - 1] <= v);
        expect(isSorted(sortedPrices)).toBe(true);

    }
}