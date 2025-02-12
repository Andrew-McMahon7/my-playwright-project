import { Page } from 'playwright';
import {expect} from "@playwright/test";
import resultPage_content from "../content/resultPage_content";0

class ResultPage {
    private readonly title: string;
    private readonly text: string;

    constructor() {
        this.title = `.govuk-heading-xl`
        this.text = `.summary`
    }

    async checkPageLoads(page: Page): Promise<void> {
        // Check elements of the page
        await Promise.all([
            expect(page.locator(this.title)).toContainText(resultPage_content.pageTitle),
            expect(page.locator(this.text)).toContainText(resultPage_content.divText),
            // indentation scuffed above.
        ]);
    }
}

export default ResultPage;