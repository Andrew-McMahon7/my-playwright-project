import { Page } from 'playwright';
import {expect} from "@playwright/test";
import employmentEndDate_content from "../content/employmentEndDate_content";
import axeTest from "../accessibilityTestHelper";

class EmploymentEndDatePage {
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
            expect(page.locator(this.title)).toContainText(employmentEndDate_content.pageTitle),
            expect(page.locator(this.caption)).toContainText(employmentEndDate_content.caption),
        ]);

        await axeTest(page);
    }

    async continueOn(page: Page): Promise<void> {
        await page.getByRole("button", { name: "Continue" }).click();
    }

    async populateEmploymentEndDateAndContinueOn(page: Page): Promise<void> {
        await page.locator(this.inputDay).fill("01");
        await page.locator(this.inputMonth).fill("07");
        await page.locator(this.inputYear).fill("2024");

        await this.continueOn(page);
    }
}

export default EmploymentEndDatePage;