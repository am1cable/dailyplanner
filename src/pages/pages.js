import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import * as pages from "./pageUrls";
import TypeOfDay from "./1_majorParts/typeOfDay/typeOfDay";
import MajorParts from "./1_majorParts/majorParts/majorParts";
import MajorPartsDuration from "./1_majorParts/majorParts/majorPartsDuration";
import HoursOfSleep from "./1_majorParts/hoursOfSleep/hoursOfSleep";
import TotalHours from "./1_majorParts/totalHours/totalHours";
import StartOfDay from "./1_majorParts/startOfDay/startOfDay";
import StartTimes from "./1_majorParts/startTimes/startTimes";
import ListActivities from "./2_activities/listActivities/listActivities";
import CategorizeActivities from "./2_activities/categorizeActivities/categorizeActivities";
import PrioritizeActivities from "./2_activities/prioritizeActivities/prioritizeActivities";
import PrioritizeActivitiesTop from "./2_activities/prioritizeActivitiesTop/prioritizeActivitiesTop";
import Overview from "./2_activities/overview/overview";
import ConfidenceCheck from "./3_partOfDayIndividual/confidenceCheck/confidenceCheck";
import SelectPartOfDay from "./3_partOfDayIndividual/selectPartOfDay/selectPartOfDay";
import PartOfDayBenefits from "./3_partOfDayIndividual/partOfDayBenefits/partOfDayBenefits";

export const Pages = () => <Switch>
    <Route path={pages.TYPE_OF_DAY} component={TypeOfDay} />
    <Route path={pages.MAJOR_PARTS} component={MajorParts} />
    <Route path={pages.MAJOR_PARTS_DURATION} component={MajorPartsDuration} />
    <Route path={pages.HOURS_OF_SLEEP} component={HoursOfSleep} />
    <Route path={pages.TOTAL_HOURS} component={TotalHours} />
    <Route path={pages.START_OF_DAY} component={StartOfDay} />
    <Route path={pages.OVERVIEW_1} component={StartTimes} />
    <Route path={pages.LIST_ACTIVITIES} component={ListActivities} />
    <Route path={pages.CATEGORIZE_ACTIVITIES} component={CategorizeActivities} />
    <Route path={pages.PRIORITIZE_ACTIVITIES} component={PrioritizeActivities} />
    <Route path={pages.PRIORITIZE_ACTIVITIES_TOP} component={PrioritizeActivitiesTop} />
    <Route path={pages.OVERVIEW_2} component={Overview} />
    <Route path={pages.CONFIDENCE_CHECK} component={ConfidenceCheck} />
    <Route path={pages.SELECT_PART_OF_DAY} component={SelectPartOfDay} />
    <Route path={pages.PART_OF_DAY_BENEFITS} component={PartOfDayBenefits} />
    <Route path="/">
        <Redirect to={pages.TYPE_OF_DAY} />
    </Route>
</Switch>

export default Pages;