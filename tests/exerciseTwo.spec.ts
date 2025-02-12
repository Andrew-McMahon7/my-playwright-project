import {test, expect} from '@playwright/test';
import LandingPage from "./pages/landingPage";
import IrregularHoursPage from "./pages/irregularHoursPage";
import HolidayEntitlementPage from "./pages/holidayEntitlementPage";
import HolidayPeriodCalculatorPage from "./pages/holidayPeriodCalculatorPage";
import DaysWorkedPage from "./pages/daysWorkedPage";
import ResultPage from "./pages/resultPage";

test('Calculate Holiday Entitlement for Full Year', async ({page}): Promise<void> => {
    const landingPage: LandingPage = new LandingPage();
    await landingPage.checkPageLoads(page);
    await landingPage.continueOn(page);

    const irregularHoursPage: IrregularHoursPage = new IrregularHoursPage();
    await irregularHoursPage.checkPageLoads(page);
    await irregularHoursPage.continueOn(page);

    const holidayEntitlementPage: HolidayEntitlementPage = new HolidayEntitlementPage();
    await holidayEntitlementPage.checkPageLoads(page);
    await holidayEntitlementPage.continueOn(page);

    const holidayPeriodCalculatorPage: HolidayPeriodCalculatorPage = new HolidayPeriodCalculatorPage();
    await holidayPeriodCalculatorPage.checkPageLoads(page);
    await holidayPeriodCalculatorPage.continueOn(page);

    const daysWorkedPage: DaysWorkedPage = new DaysWorkedPage();
    await daysWorkedPage.checkPageLoads(page);
    await daysWorkedPage.continueOn(page);

    const resultPage: ResultPage = new ResultPage();
    await resultPage.checkPageLoads(page);

});