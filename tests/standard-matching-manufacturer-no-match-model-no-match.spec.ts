import { test, expect } from '@playwright/test';
import { Pages } from '../page-object-model/AllPages';
import { ProductModel } from '../models/ProductModel';
import { EntryModel } from '../models/EntryModel';

test('standard-matching-manufacturer-no-match-model-no-match', async ({ page }) => {
    const pages = new Pages(page);
    const product: ProductModel = {
        manufacturer: "Porsche",
        model: "911",
        price: 120000,
        numberInStock: 1
    };
    const entry: EntryModel = {
        manufacturer: "Toyota",
        model: "Corolla"
    };

    await test.step('Add a new product to the system with the following: Manufacturer: Porsche, Model: 911.', async () => {
        await pages.navbar.goToHome();
        await pages.navbar.goToProductList();
        await pages.products.addNewProduct();
        await pages.productAdd.addProduct(product);
    });

    await test.step('Create a reference entry with completely different data: Manufacturer: Toyota, Model: Corolla.', async () => {
        await pages.navbar.goToWatchList();
        await pages.watchlist.addNewEntry();
        await pages.watchlistAdd.addEntry(entry);
    });

    await test.step('Navigate to the Product List.', async () => {
        await pages.navbar.goToProductList();
    });

    await test.step('Inspect the match status for the Porsche 911.', async () => {
        const isMatch = await pages.products.isProductAStandardMatch(product);
        expect(isMatch).toBe(false);
    });
});
