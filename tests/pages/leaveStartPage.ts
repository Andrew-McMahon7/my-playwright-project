import { Page } from 'playwright';
import {expect} from "@playwright/test";
import leaveStart_content from "../content/leaveStart_content";
class LeaveStartPage {
    private readonly title: string;
    private readonly text: string;
    private readonly inputDay: string;
    private readonly inputMonth: string;
    private readonly inputYear: string;
    private readonly caption: string

    constructor() {
        this.title = `.govuk-fieldset__heading`
        this.text = `.gem-c-hint`
        this.inputDay = `label[for="response-0"]`
        this.inputMonth = `label[for="response-1"]`
        this.inputYear = `label[for="response-2"]`
        this.caption = `.govuk-caption-l`
    }

    async checkPageLoads(page: Page): Promise<void> {
        // Check elements of the page
        await Promise.all([
            expect(page.locator(this.title)).toContainText(leaveStart_content.pageTitle),
            expect(page.locator(this.text)).toContainText(leaveStart_content.divText),
            expect(page.locator(this.caption)).toContainText(leaveStart_content.caption),
            // indentation scuffed above.
        ]);

        await axeTest(page);
    }

    async continueOn(page: Page): Promise<void> {
        await this.populateLeaveStart(page);
        await page.getByRole("button", { name: "Continue" }).click();
    }

    async populateLeaveStart(page: Page): Promise<void> {
        await page.locator(this.inputDay).fill("01");
        await page.locator(this.inputMonth).fill("03");
        await page.locator(this.inputYear).fill("2024");
    }
}

import axeTest from "../accessibilityTestHelper";

export default LeaveStartPage;