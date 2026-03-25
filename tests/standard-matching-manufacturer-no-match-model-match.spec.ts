import { test, expect } from '@playwright/test';
import { Pages } from '../page-object-model/AllPages';
import { ProductModel } from '../models/ProductModel';
import { EntryModel } from '../models/EntryModel';

test('standard-matching-manufacturer-no-match-model-match', async ({ page }) => {
    const pages = new Pages(page);
    const product: ProductModel = {
        manufacturer: "BMW",
        model: "Sports Car",
        price: 80000,
        numberInStock: 3
    };
    const entry: EntryModel = {
        manufacturer: "Tesla",
        model: "Sports Car"
    };

    await test.step('Add a new product to the system with the following: Manufacturer: BMW, Model: Sports Car.', async () => {
        await pages.navbar.goToHome();
        await pages.navbar.goToProductList();
        await pages.products.addNewProduct();
        await pages.productAdd.addProduct(product);
    });

    await test.step('Create a reference entry with a different manufacturer but the same model name: Manufacturer: Tesla, Model: Sports Car.', async () => {
        await pages.navbar.goToWatchList();
        await pages.watchlist.addNewEntry();
        await pages.watchlistAdd.addEntry(entry);
    });

    await test.step('Navigate to the Products page.', async () => {
        await pages.navbar.goToProductList();
    });

    await test.step('Inspect the match status for the BMW Sports Car.', async () => {
        const isMatch = await pages.products.isProductAStandardMatch(product);
        expect(isMatch).toBe(false);
    });
});
