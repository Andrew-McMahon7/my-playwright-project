import { Page } from 'playwright';
import {expect} from "@playwright/test";
import holidayPeriodCalculator_content from "../content/holidayPeriodCalculator_content";
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

    async checkPageLoads(page: Page, expectedTitle: string): Promise<void> {
        await Promise.all([
            expect(page.locator(this.title)).toContainText(expectedTitle),
            expect(page.locator(this.radioFullLeaveYear)).toContainText(holidayPeriodCalculator_content.radioFullLeaveYear),
            expect(page.locator(this.radioStartingPartWayThroughYear)).toContainText(holidayPeriodCalculator_content.radioStartingPartWayThroughYear),
            expect(page.locator(this.radioLeavingPartWayThroughYear)).toContainText(holidayPeriodCalculator_content.radioLeavingPartWayThroughYear),
            expect(page.locator(this.radioStartAndLeavePartWayThroughYear)).toContainText(holidayPeriodCalculator_content.radioStartAndLeavePartWayThroughYear),
        ]);

        await axeTest(page);
    }

    async continueOn(page: Page): Promise<void> {
        await page.getByRole("button", { name: "Continue" }).click();
    }

    async selectFullyYearAndContinueOn(page: Page): Promise<void> {
        await page.locator(this.radioFullLeaveYear).click();
        await this.continueOn(page);
    }

    async selectStartingAndLeavingPartWayThroughYearAndContinueOn(page: Page): Promise<void> {
        await page.locator(this.radioStartAndLeavePartWayThroughYear).click();
        await this.continueOn(page);
    }
}

export default HolidayPeriodCalculatorPage;