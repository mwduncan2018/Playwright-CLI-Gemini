import { test, expect } from '@playwright/test';
import { Pages } from '../page-object-model/AllPages';
import { ProductModel } from '../models/ProductModel';
import { EntryModel } from '../models/EntryModel';

test.describe('Fuzzy matching', () => {
    let pages: Pages;

    test.beforeEach(async ({ page }) => {
        pages = new Pages(page);
        await pages.navbar.goToHome();
    });

    const manufacturerMatchModelMatch = [
        { productManufacturer: 'Wendys', productModel: 'Taco Salad', entryManufacturer: 'Wendys', entryModel: 'Taco Salad' },
        { productManufacturer: 'Wendys', productModel: 'Apple Pecan Salad', entryManufacturer: 'Wendys', entryModel: 'Apple Pecan Salad' },
        { productManufacturer: 'Wendys', productModel: 'Jalapeno Popper Salad', entryManufacturer: 'Wendys', entryModel: 'Jalapeno Popper Salad' },
        { productManufacturer: 'Wendys', productModel: 'Bourbon Bacon Cheeseburger', entryManufacturer: 'Wendys', entryModel: 'Bourbon Bacon Cheeseburger' },
    ];

    for (const data of manufacturerMatchModelMatch) {
        test(`Manufacturer match, model match: ${data.productManufacturer} - ${data.productModel}`, async () => {
            const product: ProductModel = {
                manufacturer: data.productManufacturer,
                model: data.productModel,
                price: 10,
                numberInStock: 100
            };
            const entry: EntryModel = {
                manufacturer: data.entryManufacturer,
                model: data.entryModel
            };

            await test.step(`a product is added with manufacturer "${data.productManufacturer}" and model "${data.productModel}"`, async () => {
                await pages.navbar.goToProductList();
                await pages.products.addNewProduct();
                await pages.productAdd.addProduct(product);
            });

            await test.step(`an entry is added with manufacturer "${data.entryManufacturer}" and model "${data.entryModel}"`, async () => {
                await pages.navbar.goToWatchList();
                await pages.watchlist.addNewEntry();
                await pages.watchlistAdd.addEntry(entry);
            });

            await test.step('fuzzy matching is enabled', async () => {
                await pages.navbar.goToProductList();
                await pages.products.enableFuzzyMatching();
            });

            await test.step(`the product with manufacturer "${data.productManufacturer}" and model "${data.productModel}" is a standard match`, async () => {
                const isMatch = await pages.products.isProductAMatch(product);
                expect(isMatch).toBe(true);
            });
        });
    }

    const manufacturerNoMatchModelNoMatch = [
        { productManufacturer: 'Taco Bell', productModel: 'Grilled Cheese Burrito', entryManufacturer: 'Burger King', entryModel: 'Impossible Whopper' },
        { productManufacturer: 'Taco Bell', productModel: 'Veggie Burrito Supreme', entryManufacturer: 'Burger King', entryModel: 'Texas Double Whopper' },
        { productManufacturer: 'Taco Bell', productModel: 'Quesarito', entryManufacturer: 'Burger King', entryModel: 'Bacon King' },
    ];

    for (const data of manufacturerNoMatchModelNoMatch) {
        test(`Manufacturer no match, model no match: ${data.productManufacturer} - ${data.productModel}`, async () => {
            const product: ProductModel = {
                manufacturer: data.productManufacturer,
                model: data.productModel,
                price: 10,
                numberInStock: 100
            };
            const entry: EntryModel = {
                manufacturer: data.entryManufacturer,
                model: data.entryModel
            };

            await test.step(`a product is added with manufacturer "${data.productManufacturer}" and model "${data.productModel}"`, async () => {
                await pages.navbar.goToProductList();
                await pages.products.addNewProduct();
                await pages.productAdd.addProduct(product);
            });

            await test.step(`an entry is added with manufacturer "${data.entryManufacturer}" and model "${data.entryModel}"`, async () => {
                await pages.navbar.goToWatchList();
                await pages.watchlist.addNewEntry();
                await pages.watchlistAdd.addEntry(entry);
            });

            await test.step('fuzzy matching is enabled', async () => {
                await pages.navbar.goToProductList();
                await pages.products.enableFuzzyMatching();
            });

            await test.step(`the product with manufacturer "${data.productManufacturer}" and model "${data.productModel}" is not a match`, async () => {
                const isMatch = await pages.products.isProductAMatch(product);
                const isFuzzyMatch = await pages.products.isProductAFuzzyMatch(product);
                expect(isMatch).toBe(false);
                expect(isFuzzyMatch).toBe(false);
            });
        });
    }

    const manufacturerMatchModelNoMatch = [
        { productManufacturer: 'Burger King', productModel: 'Italian Original Chicken', entryManufacturer: 'Burger King', entryModel: 'Four nuggets' },
        { productManufacturer: 'Burger King', productModel: 'Spicy Chicken Sandwich', entryManufacturer: 'Burger King', entryModel: 'Chicken Deluxe Sandwich' },
    ];

    for (const data of manufacturerMatchModelNoMatch) {
        test(`Manufacturer match, model no match: ${data.productManufacturer} - ${data.productModel}`, async () => {
            const product: ProductModel = {
                manufacturer: data.productManufacturer,
                model: data.productModel,
                price: 10,
                numberInStock: 100
            };
            const entry: EntryModel = {
                manufacturer: data.entryManufacturer,
                model: data.entryModel
            };

            await test.step(`a product is added with manufacturer "${data.productManufacturer}" and model "${data.productModel}"`, async () => {
                await pages.navbar.goToProductList();
                await pages.products.addNewProduct();
                await pages.productAdd.addProduct(product);
            });

            await test.step(`an entry is added with manufacturer "${data.entryManufacturer}" and model "${data.entryModel}"`, async () => {
                await pages.navbar.goToWatchList();
                await pages.watchlist.addNewEntry();
                await pages.watchlistAdd.addEntry(entry);
            });

            await test.step('fuzzy matching is enabled', async () => {
                await pages.navbar.goToProductList();
                await pages.products.enableFuzzyMatching();
            });

            await test.step(`the product with manufacturer "${data.productManufacturer}" and model "${data.productModel}" is a fuzzy match`, async () => {
                const isFuzzyMatch = await pages.products.isProductAFuzzyMatch(product);
                expect(isFuzzyMatch).toBe(true);
            });
        });
    }

    const manufacturerNoMatchModelMatch = [
        { productManufacturer: 'Popeyes', productModel: 'Chicken Sandwich', entryManufacturer: 'Burger King', entryModel: 'Chicken Sandwich' },
        { productManufacturer: 'McDonalds', productModel: 'Hamburger', entryManufacturer: 'Sonic', entryModel: 'Hamburger' },
    ];

    for (const data of manufacturerNoMatchModelMatch) {
        test(`Manufacturer no match, model match: ${data.productManufacturer} - ${data.productModel}`, async () => {
            const product: ProductModel = {
                manufacturer: data.productManufacturer,
                model: data.productModel,
                price: 10,
                numberInStock: 100
            };
            const entry: EntryModel = {
                manufacturer: data.entryManufacturer,
                model: data.entryModel
            };

            await test.step(`a product is added with manufacturer "${data.productManufacturer}" and model "${data.productModel}"`, async () => {
                await pages.navbar.goToProductList();
                await pages.products.addNewProduct();
                await pages.productAdd.addProduct(product);
            });

            await test.step(`an entry is added with manufacturer "${data.entryManufacturer}" and model "${data.entryModel}"`, async () => {
                await pages.navbar.goToWatchList();
                await pages.watchlist.addNewEntry();
                await pages.watchlistAdd.addEntry(entry);
            });

            await test.step('fuzzy matching is enabled', async () => {
                await pages.navbar.goToProductList();
                await pages.products.enableFuzzyMatching();
            });

            await test.step(`the product with manufacturer "${data.productManufacturer}" and model "${data.productModel}" is a fuzzy match`, async () => {
                const isFuzzyMatch = await pages.products.isProductAFuzzyMatch(product);
                expect(isFuzzyMatch).toBe(true);
            });
        });
    }
});
