import { Page } from 'playwright';
import {expect} from "@playwright/test";
import daysWorkedPage_content from "../content/daysWorkedPage_content";
import axeTest from "../accessibilityTestHelper";

class DaysWorkedPage {
    private readonly title: string;
    private readonly text: string;
    private readonly textResponse: string;

    constructor() {
        this.title = `.govuk-label-wrapper`
        this.text = `.gem-c-hint`
        this.textResponse = `#response`
    }

    async checkPageLoads(page: Page): Promise<void> {
        // Check elements of the page
        await Promise.all([
            expect(page.locator(this.title)).toContainText(daysWorkedPage_content.pageTitle),
            expect(page.locator(this.text)).toContainText(daysWorkedPage_content.divText),
            // indentation scuffed above.
        ]);

        await axeTest(page);
    }

    async continueOn(page: Page): Promise<void> {
        // Click the continue button
        await this.inputDaysWorked(page);
        await page.getByRole("button", { name: "Continue" }).click();
    }

    async inputDaysWorked(page: Page): Promise<void> {
        await page.locator(this.textResponse).fill("5");
    }
}

export default DaysWorkedPage;