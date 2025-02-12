import { Page } from 'playwright';
import {expect} from "@playwright/test";
import holidayPeriodCalculatorPage_content from "../content/holidayPeriodCalculatorPage_content";
import axeTest from "../accessibilityTestHelper";

class HolidayPeriodCalculatorPage {
    private readonly title: string;
    private readonly radioFullLeaveYear: string;
    private readonly radioStartingPartWayThroughYear: string;
    private readonly radioLeavingPartWayThroughYear: string;
    private readonly radioStartAndLeavePartWayThroughYear: string;

    constructor() {
        this.title = `.govuk-fieldset__heading`
        this.radioFullLeaveYear = `label[for="response-0"]`
        this.radioStartingPartWayThroughYear = `label[for="response-1"]`
        this.radioLeavingPartWayThroughYear = `label[for="response-2"]`
        this.radioStartAndLeavePartWayThroughYear = `label[for="response-3"]`
    }

    async checkPageLoads(page: Page): Promise<void> {
        // Check elements of the page
        await Promise.all([
            expect(page.locator(this.title)).toContainText(holidayPeriodCalculatorPage_content.pageTitle),
            expect(page.locator(this.radioFullLeaveYear)).toContainText(holidayPeriodCalculatorPage_content.radioFullLeaveYear),
            expect(page.locator(this.radioStartingPartWayThroughYear)).toContainText(holidayPeriodCalculatorPage_content.radioStartingPartWayThroughYear),
            expect(page.locator(this.radioLeavingPartWayThroughYear)).toContainText(holidayPeriodCalculatorPage_content.radioLeavingPartWayThroughYear),
            expect(page.locator(this.radioStartAndLeavePartWayThroughYear)).toContainText(holidayPeriodCalculatorPage_content.radioStartAndLeavePartWayThroughYear),
            // indentation scuffed above.
        ]);

        await axeTest(page);
    }

    async continueOn(page: Page): Promise<void> {
        // Click the continue button
        await this.selectDaysPerWeek(page);
        await page.getByRole("button", { name: "Continue" }).click();
    }

    async selectDaysPerWeek(page: Page): Promise<void> {
        await page.locator(this.radioFullLeaveYear).click();
    }
}

export default HolidayPeriodCalculatorPage;