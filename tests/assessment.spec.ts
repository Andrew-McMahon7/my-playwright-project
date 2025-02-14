import {test} from '@playwright/test';
import LandingPage from "./pages/landingPage";
import IrregularHoursPage from "./pages/irregularHoursPage";
import HolidayEntitlementPage from "./pages/holidayEntitlementPage";
import HolidayPeriodCalculatorPage from "./pages/holidayPeriodCalculatorPage";
import ResultPage from "./pages/resultPage";
import LeaveStartPage from "./pages/leaveStartPage";
import EmploymentStartDatePage from "./pages/employmentStartDatePage";
import EmploymentEndDatePage from "./pages/employmentEndDate";
import HoursInShiftPage from "./pages/hoursInShiftPage";
import DaysInShiftPatternPage from "./pages/daysInShiftPatternPage";
import ShiftPatternPage from "./pages/shiftPatternPage";

test(`Calculate Holiday Entitlement for FY (Irregular, Annualised Hours for Full Year leave)`, async ({ page }): Promise<void> => {
    const expectedHolidayPeriodTitle: string = "Do you want to work out holiday:";
    const expectedSummary: string = "The statutory holiday entitlement is 5.6 weeks holiday.";

    const landingPage: LandingPage = new LandingPage();
    await landingPage.checkPageLoads(page);
    await landingPage.continueOn(page);

    const irregularHoursPage: IrregularHoursPage = new IrregularHoursPage();
    await irregularHoursPage.checkPageLoads(page);
    await irregularHoursPage.continueOn(page, true);

    const leaveStartPage: LeaveStartPage = new LeaveStartPage();
    await leaveStartPage.checkPageLoads(page);
    await leaveStartPage.continueOn(page);

    const holidayEntitlementPage: HolidayEntitlementPage = new HolidayEntitlementPage();
    await holidayEntitlementPage.checkPageLoads(page);
    await holidayEntitlementPage.selectAnnualisedHoursAndContinue(page);

    const holidayPeriodCalculatorPage: HolidayPeriodCalculatorPage = new HolidayPeriodCalculatorPage();
    await holidayPeriodCalculatorPage.checkPageLoads(page, expectedHolidayPeriodTitle);
    await holidayPeriodCalculatorPage.selectFullyYearAndContinueOn(page);

    const resultsPage: ResultPage = new ResultPage();
    await resultsPage.checkPageLoads(page, expectedSummary);

});

test(`Calculate Holiday Entitrelment for someone starting and leaving part way through a year (Shifts`, async ({ page }): Promise<void> => {
    const expectedHolidayPeriodTitle: string = "Do you want to calculate the holiday:";
    const expectedSummary: string = "The statutory holiday entitlement is 8.17 shifts for the year. Each shift being 8.0 hours.";

    const landingPage: LandingPage = new LandingPage();
    await landingPage.checkPageLoads(page);
    await landingPage.continueOn(page);

    const irregularHoursPage: IrregularHoursPage = new IrregularHoursPage();
    await irregularHoursPage.checkPageLoads(page);
    await irregularHoursPage.continueOn(page, true);

    const leaveStartPage: LeaveStartPage = new LeaveStartPage();
    await leaveStartPage.checkPageLoads(page);
    await leaveStartPage.continueOn(page);

    const holidayEntitlementPage: HolidayEntitlementPage = new HolidayEntitlementPage();
    await holidayEntitlementPage.checkPageLoads(page);
    await holidayEntitlementPage.selectShiftAndContinue(page);

    const holidayPeriodCalculatorPage: HolidayPeriodCalculatorPage = new HolidayPeriodCalculatorPage();
    await holidayPeriodCalculatorPage.checkPageLoads(page, expectedHolidayPeriodTitle);
    await holidayPeriodCalculatorPage.selectStartingAndLeavingPartWayThroughYearAndContinueOn(page);

    const employementStartDatePage: EmploymentStartDatePage = new EmploymentStartDatePage();
    await employementStartDatePage.checkPageLoads(page);
    await employementStartDatePage.populateEmploymentStartDateAndContinueOn(page);

    const employmentEndDatePage: EmploymentEndDatePage = new EmploymentEndDatePage();
    await employmentEndDatePage.checkPageLoads(page);
    await employmentEndDatePage.populateEmploymentEndDateAndContinueOn(page);

    const hoursInShiftPage: HoursInShiftPage = new HoursInShiftPage();
    await hoursInShiftPage.checkPageLoads(page);
    await hoursInShiftPage.continueOn(page);

    const shiftPatternPage: ShiftPatternPage = new ShiftPatternPage();
    await shiftPatternPage.checkPageLoads(page);
    await shiftPatternPage.continueOn(page);

    const daysInShiftPatternPage: DaysInShiftPatternPage = new DaysInShiftPatternPage();
    await daysInShiftPatternPage.checkPageLoads(page);
    await daysInShiftPatternPage.continueOn(page);

    const resultsPage: ResultPage = new ResultPage();
    await resultsPage.checkPageLoads(page, expectedSummary);
});
