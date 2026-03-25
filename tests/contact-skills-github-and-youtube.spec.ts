import { test, expect } from '@playwright/test';
import { Pages } from '../page-object-model/AllPages';

test('contact-skills-github-and-youtube', async ({ page }) => {
    const pages = new Pages(page);

    await test.step('Navigate to the Contact page via the site navigation.', async () => {
        await pages.navbar.goToHome();
        await pages.navbar.goToContact();
    });

    await test.step('Scroll to the bottom of the page and inspect the Footer area.', async () => {
        const footerText = await pages.contact.getFooterText();
        expect(footerText).toBe("(Duncan Safe Product!)");
    });

    await test.step('Locate the GitHub link on the page.', async () => {
        const githubHref = await pages.contact.getGithubHref();
        expect(githubHref).toBe("https://github.com/mwduncan2018");
    });

    await test.step('Locate the Technical Skills section on the Contact page.', async () => {
        const skills = await pages.contact.getAllSkills();
        const expectedSkills = [
            "Playwright", "Robot", "Cypress", "Appium", "Selenium", 
            "Docker", "JUnit", "TestNG", "pytest", "pytest-bdd", 
            "SpecFlow", "Cucumber", "C# MVC", "Java", "Python", 
            "TypeScript", "JavaScript", "C#"
        ];
        for (const skill of expectedSkills) {
            expect(skills).toContain(skill);
        }
    });
});
