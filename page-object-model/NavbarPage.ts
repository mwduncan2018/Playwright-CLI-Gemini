import { BasePage } from "./BasePage";

export class NavbarPage extends BasePage {
    private readonly PRODUCT_LIST_LINK = "[data-cy='ProductListNav']";
    private readonly WATCH_LIST_LINK = "[data-cy='WatchListNav']";
    private readonly CONTACT_LINK = "[data-cy='ContactNav']";

    async goToHome() {
        await this.page.goto('/');
    }

    async goToProductList() {
        await this.page.click(this.PRODUCT_LIST_LINK);
    }

    async goToWatchList() {
        await this.page.click(this.WATCH_LIST_LINK);
    }

    async goToContact() {
        await this.page.click(this.CONTACT_LINK);
    }
} 