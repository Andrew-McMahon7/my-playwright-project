import { Page } from 'playwright';
import {expect} from "@playwright/test";
import shiftPattern_content from "../content/shiftPattern_content";
import axeTest from "../accessibilityTestHelper";

class ShiftPatternPage {
    private readonly title: string;
    private readonly caption: string;
    private readonly textResponse: string;

    constructor() {
        this.title = `.govuk-label--l`
        this.caption = `.govuk-caption-l`
        this.textResponse = `#response`
    }

    async checkPageLoads(page: Page): Promise<void> {
        await Promise.all([
            expect(page.locator(this.title)).toContainText(shiftPattern_content.pageTitle),
            expect(page.locator(this.caption)).toContainText(shiftPattern_content.caption),
        ]);

        await axeTest(page);
    }

    async continueOn(page: Page): Promise<void> {
        await this.inputShiftPatternWorked(page);
        await page.getByRole("button", { name: "Continue" }).click();
    }

    async inputShiftPatternWorked(page: Page): Promise<void> {
        await page.locator(this.textResponse).fill("4");
    }
}

export default ShiftPatternPage;