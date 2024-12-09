import { expect, Page, Locator } from '@playwright/test';

export class HomePage {
    page: Page;
    private argentina: Locator;
    private searchBar: Locator;
    private submitSearchButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.argentina = this.page.locator('[id="AR"]');
        this.searchBar = this.page.locator('[class="nav-search-input"]');
        this.submitSearchButton = this.page.locator('[type="submit"]');
    }

    async visitMercadoLibre(website: string) {
        await this.page.goto(website);
        await expect(this.argentina).toBeVisible();
        await this.argentina.click();
    }

    async typeInSearch(search: string) {
        await expect(this.searchBar).toBeVisible();
        await expect(this.searchBar).toHaveAttribute('placeholder', 'Buscar productos, marcas y más…');
        await this.searchBar.fill(search);
    }
    async clickOnSubmit() {
        await expect(this.submitSearchButton).toBeAttached();
        await this.submitSearchButton.click();
    }
}