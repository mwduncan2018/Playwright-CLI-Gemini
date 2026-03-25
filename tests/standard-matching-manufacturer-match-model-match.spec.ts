import { test, expect } from '@playwright/test';
import { Pages } from '../page-object-model/AllPages';
import { ProductModel } from '../models/ProductModel';
import { EntryModel } from '../models/EntryModel';

test('standard-matching-manufacturer-match-model-match', async ({ page }) => {
    const pages = new Pages(page);
    const product: ProductModel = {
        manufacturer: "Porsche",
        model: "Cayenne",
        price: 100000,
        numberInStock: 5
    };
    const entry: EntryModel = {
        manufacturer: "Porsche",
        model: "Cayenne"
    };

    await test.step('Navigate to the product creation module and add a product.', async () => {
        await pages.navbar.goToHome();
        await pages.navbar.goToProductList();
        await pages.products.addNewProduct();
        await pages.productAdd.addProduct(product);
    });

    await test.step('Navigate to the entry/reference data module and create an entry.', async () => {
        await pages.navbar.goToWatchList();
        await pages.watchlist.addNewEntry();
        await pages.watchlistAdd.addEntry(entry);
    });

    await test.step('Navigate to the Product List.', async () => {
        await pages.navbar.goToProductList();
    });

    await test.step('Verify the match status of the Porsche Cayenne product.', async () => {
        const isMatch = await pages.products.isProductAStandardMatch(product);
        expect(isMatch).toBe(true);
    });
});
