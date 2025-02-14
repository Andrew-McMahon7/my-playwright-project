import { Page } from 'playwright';
import {expect} from "@playwright/test";
import hoursInShift_content from "../content/hoursInShift_content";
import axeTest from "../accessibilityTestHelper";

class HoursInShiftPage {
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
            expect(page.locator(this.title)).toContainText(hoursInShift_content.pageTitle),
            expect(page.locator(this.caption)).toContainText(hoursInShift_content.caption),
        ]);

        await axeTest(page);
    }

    async continueOn(page: Page): Promise<void> {
        await this.inputDaysWorked(page);
        await page.getByRole("button", { name: "Continue" }).click();
    }

    async inputDaysWorked(page: Page): Promise<void> {
        await page.locator(this.textResponse).fill("8");
    }
}

export default HoursInShiftPage;