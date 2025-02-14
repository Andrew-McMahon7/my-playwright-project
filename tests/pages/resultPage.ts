import { Page } from 'playwright';
import {expect} from "@playwright/test";
import result_content from "../content/result_content";
import axeTest from "../accessibilityTestHelper";

class ResultPage {
    private readonly title: string;
    private readonly text: string;

    constructor() {
        this.title = `.govuk-heading-xl`
        this.text = `.govuk-govspeak`
    }

    async checkPageLoads(page: Page, expectedSummary: string): Promise<void> {
        await Promise.all([
            expect(page.locator(this.title)).toContainText(result_content.pageTitle),
            expect(page.locator(this.text)).toContainText(expectedSummary),
        ]);

        await axeTest(page);
    }
}

export default ResultPage;