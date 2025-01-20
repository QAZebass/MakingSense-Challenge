import { expect } from '@playwright/test';
import { ProductListPage } from './productListPage';

export class ProductListPageValidations {

    private productListPage: ProductListPage;

    constructor(productListPage: ProductListPage) {
        this.productListPage = productListPage;
    }

    async pricesAreSorted() {
        const sortedProducts = await this.productListPage.getSortedResults();
        //const sortedPrices = await sortedProducts.map((product: { price: any; }) => product.price);
        console.log(`These are the sorted products ${JSON.stringify(sortedProducts, null, 2)}`);
    }
}