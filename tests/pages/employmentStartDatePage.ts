import { Page } from 'playwright';
import {expect} from "@playwright/test";
import employmentStartDate_content from "../content/employmentStartDate_content";
import axeTest from "../accessibilityTestHelper";

class EmploymentStartDatePage {
    private readonly title: string;
    private readonly inputDay: string;
    private readonly inputMonth: string;
    private readonly inputYear: string;
    private readonly caption: string;

    constructor() {
        this.title = `.govuk-fieldset__heading`
        this.inputDay = `label[for="response-0"]`
        this.inputMonth = `label[for="response-1"]`
        this.inputYear = `label[for="response-2"]`
        this.caption = `.govuk-caption-l`
    }

    async checkPageLoads(page: Page): Promise<void> {
        await Promise.all([
            expect(page.locator(this.title)).toContainText(employmentStartDate_content.pageTitle),
            expect(page.locator(this.caption)).toContainText(employmentStartDate_content.caption),
        ]);

        await axeTest(page);
    }

    async continueOn(page: Page): Promise<void> {
        await page.getByRole("button", { name: "Continue" }).click();
    }

    async populateEmploymentStartDateAndContinueOn(page: Page): Promise<void> {
        await page.locator(this.inputDay).fill("01");
        await page.locator(this.inputMonth).fill("02");
        await page.locator(this.inputYear).fill("2024");

        await this.continueOn(page);
    }
}

export default EmploymentStartDatePage;