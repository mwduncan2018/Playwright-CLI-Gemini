import { ProductModel } from "../models/ProductModel";
import { BasePage } from "./BasePage";

export class ProductPage extends BasePage {
    private readonly BTN_ADD_NEW_PRODUCT = "text=Add New Product";
    private readonly BTN_FUZZY_MATCHING = "#fuzzFuzz";
    private readonly CHK_MATCH = "td:nth-child(1)";
    private readonly CHK_FUZZY_MATCH = "td:nth-child(7)";

    async addNewProduct() {
        await this.page.click(this.BTN_ADD_NEW_PRODUCT);
    }

    async isFuzzyMatchingEnabled(): Promise<boolean> {
        const text = await this.page.innerText(this.BTN_FUZZY_MATCHING);
        return text === "Disable Fuzzy Matching!";
    }

    async enableFuzzyMatching() {
        if (!(await this.isFuzzyMatchingEnabled())) {
            await this.page.click(this.BTN_FUZZY_MATCHING);
        }
    }

    private getProductRow(product: ProductModel): string {
        return `tbody tr:has(td:nth-child(2):has-text("${product.manufacturer}")):has(td:nth-child(3):has-text("${product.model}"))`;
    }

    async isProductAMatch(product: ProductModel): Promise<boolean> {
        const row = this.getProductRow(product);
        const status = await this.page.innerText(`${row} >> ${this.CHK_MATCH}`);
        return status.trim().toLowerCase() === "true";
    }

    async isProductAStandardMatch(product: ProductModel): Promise<boolean> {
        return await this.isProductAMatch(product);
    }

    async isProductAFuzzyMatch(product: ProductModel): Promise<boolean> {
        const row = this.getProductRow(product);
        const fuzzyCell = `${row} >> ${this.CHK_FUZZY_MATCH}`;
        if (await this.page.locator(fuzzyCell).count() > 0) {
            const status = await this.page.innerText(fuzzyCell);
            return status.trim().toLowerCase() === "true";
        }
        return false;
    }
}