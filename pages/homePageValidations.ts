import { expect } from '@playwright/test';
import { HomePage } from './homePage';

export class HomePageValidations {

    private homePage: HomePage;

    constructor(homePage: HomePage) {
        this.homePage = homePage;
    }

    async MeLiURLisVisible() {
        await expect(this.homePage.page).toHaveURL(/.*mercadolibre.com.ar/);
        return this;
    }
}