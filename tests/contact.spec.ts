import { test, expect } from '@playwright/test';
import { Pages } from '../page-object-model/AllPages';

test.describe('Contact', () => {
    let pages: Pages;

    test.beforeEach(async ({ page }) => {
        pages = new Pages(page);
        await pages.navbar.goToHome();
    });

    test('Duncan safe product', async () => {
        await test.step('the Contact page is viewed', async () => {
            await pages.navbar.goToContact();
        });

        await test.step('the following text should display in the footer', async () => {
            const footerText = await pages.contact.getFooterText();
            expect(footerText).toContain('(Duncan Safe Product!)');
        });
    });

    test('GitHub link', async () => {
        await test.step('the Contact page is viewed', async () => {
            await pages.navbar.goToContact();
        });

        await test.step('a GitHub link should be provided', async () => {
            const githubHref = await pages.contact.getGithubHref();
            expect(githubHref).toBe('https://github.com/mwduncan2018');
        });
    });

    test('Technical skills are displayed', async () => {
        await test.step('the Contact page is viewed', async () => {
            await pages.navbar.goToContact();
        });

        await test.step('the following skills should be listed', async () => {
            const expectedSkills = [
                'Playwright', 'Cypress', 'Appium', 'Selenium', 'Docker',
                'JUnit', 'TestNG', 'pytest', 'pytest-bdd', 'SpecFlow',
                'Cucumber', 'C# MVC', 'Java', 'Python', 'TypeScript',
                'JavaScript', 'C#'
            ];
            const actualSkills = await pages.contact.getAllSkills();
            
            for (const skill of expectedSkills) {
                expect(actualSkills).toContain(skill);
            }
        });
    });
});
