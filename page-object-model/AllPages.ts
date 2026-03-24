import { Page } from "@playwright/test";
import { ContactPage } from "./ContractPage";
import { NavbarPage } from "./NavbarPage";
import { ProductAddPage } from "./ProductAddPage";
import { ProductPage } from "./ProductPage";
import { WatchListAddPage } from "./WatchListAddPage";
import { WatchListPage } from "./WatchListPage";

export class Pages {
    public readonly navbar: NavbarPage;
    public readonly products: ProductPage;
    public readonly productAdd: ProductAddPage;
    public readonly watchlist: WatchListPage;
    public readonly watchlistAdd: WatchListAddPage;
    public readonly contact: ContactPage;

    constructor(page: Page) {
        this.navbar = new NavbarPage(page);
        this.products = new ProductPage(page);
        this.productAdd = new ProductAddPage(page);
        this.watchlist = new WatchListPage(page);
        this.watchlistAdd = new WatchListAddPage(page);
        this.contact = new ContactPage(page);
    }
}