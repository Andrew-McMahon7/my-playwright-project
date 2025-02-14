import { Page } from 'playwright';
import {expect} from "@playwright/test";
import holidayEntitlement_content from "../content/holidayEntitlement_content";
import axeTest from "../accessibilityTestHelper";

class HolidayEntitlementPage {
    private readonly title: string;
    private readonly text: string;
    private readonly radioDaysPerWeek: string;
    private readonly radioHoursPerWeek: string;
    private readonly radioAnnualisedHours: string;
    private readonly radioCompressedHours: string;
    private readonly radioShift: string;

    constructor() {
        this.title = `.govuk-fieldset__heading`
        this.text = `.gem-c-hint`
        this.radioDaysPerWeek = `label[for="response-0"]`
        this.radioHoursPerWeek = `label[for="response-1"]`
        this.radioAnnualisedHours = `label[for="response-2"]`
        this.radioCompressedHours = `label[for="response-3"]`
        this.radioShift = `label[for="response-4"]`
    }

    async checkPageLoads(page: Page): Promise<void> {
        // Check elements of the page
        await Promise.all([
            expect(page.locator(this.title)).toContainText(holidayEntitlement_content.pageTitle),
            expect(page.locator(this.text)).toContainText(holidayEntitlement_content.divText),
            expect(page.locator(this.radioDaysPerWeek)).toContainText(holidayEntitlement_content.radioDaysPerWeek),
            expect(page.locator(this.radioHoursPerWeek)).toContainText(holidayEntitlement_content.radioHoursPerWeek),
            expect(page.locator(this.radioAnnualisedHours)).toContainText(holidayEntitlement_content.radioAnnualisedHours),
            expect(page.locator(this.radioCompressedHours)).toContainText(holidayEntitlement_content.radioCompressedHours),
            // indentation scuffed above.
        ]);

        await axeTest(page);
    }

    async continueOn(page: Page): Promise<void> {
        await page.getByRole("button", { name: "Continue" }).click();
    }

    async selectDaysPerWeekAndContinue(page: Page): Promise<void> {
        await page.locator(this.radioDaysPerWeek).click();
        await this.continueOn(page);
    }

    async selectAnnualisedHoursAndContinue(page: Page): Promise<void> {
        await page.locator(this.radioAnnualisedHours).click();
        await this.continueOn(page);
    }

    async selectShiftAndContinue(page: Page): Promise<void> {
        await page.locator(this.radioShift).click();
        await this.continueOn(page);
    }


}

export default HolidayEntitlementPage;