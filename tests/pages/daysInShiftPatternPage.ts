import { Page } from 'playwright';
import {expect} from "@playwright/test";
import daysInShiftPattern_content from "../content/daysInShiftPattern_content";
import axeTest from "../accessibilityTestHelper";

class DaysInShiftPatternPage {
    private readonly title: string;
    private readonly text: string;
    private readonly caption: string;
    private readonly textResponse: string;

    constructor() {
        this.title = `.govuk-label--l`
        this.text = `.gem-c-hint`
        this.caption = `.govuk-caption-l`
        this.textResponse = `#response`
    }

    async checkPageLoads(page: Page): Promise<void> {
        await Promise.all([
            expect(page.locator(this.title)).toContainText(daysInShiftPattern_content.pageTitle),
            expect(page.locator(this.text)).toContainText(daysInShiftPattern_content.text),
            expect(page.locator(this.caption)).toContainText(daysInShiftPattern_content.caption),
        ]);

        await axeTest(page);
    }

    async continueOn(page: Page): Promise<void> {
        await this.inputDaysInShiftPatternWorked(page);
        await page.getByRole("button", { name: "Continue" }).click();
    }

    async inputDaysInShiftPatternWorked(page: Page): Promise<void> {
        await page.locator(this.textResponse).fill("8");
    }
}

export default DaysInShiftPatternPage;