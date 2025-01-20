import { test as base } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { ProductListPage } from '../pages/productListPage';

type pages = {
    homepage: HomePage;
    productListPage: ProductListPage;
};

const testPage = base.extend({
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
    productListPage: async ({ page }, use) => {
        await use(new ProductListPage(page));
    }
});

export const test = testPage;
