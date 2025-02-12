import { Page } from 'playwright';
import {expect} from "@playwright/test";
import holidayEntitlementPage_content from "../content/holidayEntitlementPage_content";0

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
            expect(page.locator(this.title)).toContainText(holidayEntitlementPage_content.pageTitle),
            expect(page.locator(this.text)).toContainText(holidayEntitlementPage_content.divText),
            expect(page.locator(this.radioDaysPerWeek)).toContainText(holidayEntitlementPage_content.radioDaysPerWeek),
            expect(page.locator(this.radioHoursPerWeek)).toContainText(holidayEntitlementPage_content.radioHoursPerWeek),
            expect(page.locator(this.radioAnnualisedHours)).toContainText(holidayEntitlementPage_content.radioAnnualisedHours),
            expect(page.locator(this.radioCompressedHours)).toContainText(holidayEntitlementPage_content.radioCompressedHours),
            // indentation scuffed above.
        ]);
    }

    async continueOn(page: Page): Promise<void> {
        // Click the continue button
        await this.selectDaysPerWeek(page);
        await page.getByRole("button", { name: "Continue" }).click();
    }

    async selectDaysPerWeek(page: Page): Promise<void> {
        await page.locator(this.radioDaysPerWeek).click();
    }
}

export default HolidayEntitlementPage;