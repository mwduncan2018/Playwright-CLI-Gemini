import { BasePage } from "./BasePage";

export class ContactPage extends BasePage {
    private readonly SECRET_MESSAGE = "#secretMessage";
    private readonly GITHUB_LINK = "#github a";
    private readonly SKILL_LIST = "#skillList li";

    async getGithubHref(): Promise<string | null> {
        return await this.page.getAttribute(this.GITHUB_LINK, "href");
    }

    async getFooterText(): Promise<string> {
        return await this.page.innerText(this.SECRET_MESSAGE);
    }

    async getAllSkills(): Promise<string[]> {
        const skills = await this.page.locator(this.SKILL_LIST).allInnerTexts();
        return skills.map(skill => skill.trim());
    }
}