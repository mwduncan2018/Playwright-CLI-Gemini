import { test, expect } from '@playwright/test';
import { Pages } from '../page-object-model/AllPages';
import { ProductModel } from '../models/ProductModel';
import { EntryModel } from '../models/EntryModel';

test('standard-matching-manufacturer-match-model-no-match', async ({ page }) => {
    const pages = new Pages(page);
    const product: ProductModel = {
        manufacturer: "Porsche",
        model: "Taycan",
        price: 150000,
        numberInStock: 2
    };
    const entry: EntryModel = {
        manufacturer: "Porsche",
        model: "Panamera"
    };

    await test.step('Add a new product to the system.', async () => {
        await pages.navbar.goToHome();
        await pages.navbar.goToProductList();
        await pages.products.addNewProduct();
        await pages.productAdd.addProduct(product);
    });

    await test.step('Create a reference entry with the same manufacturer but a different model.', async () => {
        await pages.navbar.goToWatchList();
        await pages.watchlist.addNewEntry();
        await pages.watchlistAdd.addEntry(entry);
    });

    await test.step('Navigate to the Product List.', async () => {
        await pages.navbar.goToProductList();
    });

    await test.step('Inspect the match status for the Porsche Taycan.', async () => {
        const isMatch = await pages.products.isProductAStandardMatch(product);
        expect(isMatch).toBe(false);
    });
});
