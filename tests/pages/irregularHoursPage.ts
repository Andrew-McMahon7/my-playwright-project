import { Page } from 'playwright';
import {expect} from "@playwright/test";
import irregularHoursPage_content from "../content/irregularHoursPage_content";

class IrregularHoursPage {
    private readonly title: string;
    private readonly text: string;
    private readonly radioYes: string;
    private readonly radioNo: string;

    constructor() {
        this.title = `.govuk-fieldset__heading`
        this.text = `.gem-c-hint`
        this.radioYes = `label[for="response-0"]`
        this.radioNo = `label[for="response-1"]`
    }

    async checkPageLoads(page: Page): Promise<void> {
        // Check elements of the page
        await Promise.all([
            expect(page.locator(this.title)).toContainText(irregularHoursPage_content.pageTitle),
            expect(page.locator(this.text)).toContainText(irregularHoursPage_content.divText),
            expect(page.locator(this.radioYes)).toContainText(irregularHoursPage_content.radioYes),
            expect(page.locator(this.radioNo)).toContainText(irregularHoursPage_content.radioNo),
            // indentation scuffed above.
        ]);
    }

    async continueOn(page: Page): Promise<void> {
        // Click the continue button
        await this.clickNo(page);
        await page.getByRole("button", { name: "Continue" }).click();
    }

    async clickNo(page: Page): Promise<void> {
        await page.locator(this.radioNo).click();
    }
}

export default IrregularHoursPage;