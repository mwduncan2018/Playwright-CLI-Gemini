import { BasePage } from './BasePage';

export class WatchListPage extends BasePage {
    private readonly _BTN_ADD_NEW_ENTRY = "text=Add To Watch List";

    async addNewEntry() {
        await this.page.click(this._BTN_ADD_NEW_ENTRY);
    }
}