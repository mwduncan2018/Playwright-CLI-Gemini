import { ProductModel } from "../models/ProductModel";
import { BasePage } from "./BasePage";

export class ProductAddPage extends BasePage {
    private readonly INPUT_MANUFACTURER = "[data-cy='manufacturerInput']";
    private readonly INPUT_MODEL = "[data-cy='modelInput']";
    private readonly INPUT_PRICE = "[data-cy='priceInput']";
    private readonly INPUT_STOCK = "[data-cy='numberInStockInput']";
    private readonly BTN_ADD = "[data-cy='submitButton']";

    async addProduct(product: ProductModel) {
        await this.page.fill(this.INPUT_MANUFACTURER, product.manufacturer);
        await this.page.fill(this.INPUT_MODEL, product.model);
        await this.page.fill(this.INPUT_PRICE, product.price.toString());
        await this.page.fill(this.INPUT_STOCK, product.numberInStock.toString());
        await this.page.click(this.BTN_ADD);
    }
}