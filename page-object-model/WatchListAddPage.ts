import { EntryModel } from "../models/EntryModel";
import { BasePage } from "./BasePage";

export class WatchListAddPage extends BasePage {
    private readonly INPUT_MANUFACTURER = "[data-cy='manufacturerInput']";
    private readonly INPUT_MODEL = "[data-cy='modelInput']";
    private readonly BTN_ADD = "[data-cy='submitButton']";

    async addEntry(entry: EntryModel): Promise<void> {
        await this.page.fill(this.INPUT_MANUFACTURER, entry.manufacturer);
        await this.page.fill(this.INPUT_MODEL, entry.model);
        await this.page.click(this.BTN_ADD);
    }
}
