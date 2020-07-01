import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import * as pages from "./pageUrls";
import TypeOfDay from "./typeOfDay/typeOfDay";
import MajorParts from "./majorParts/majorParts";
import MajorPartsDuration from "./majorParts/majorPartsDuration";
import HoursOfSleep from "./hoursOfSleep/hoursOfSleep";
import TotalHours from "./totalHours/totalHours";
import StartOfDay from "./startOfDay/startOfDay";
import StartTimes from "./startTimes/startTimes";
import ListActivities from "./listActivities/listActivities";
import CategorizeActivities from "./categorizeActivities/categorizeActivities";
import PrioritizeActivities from "./prioritizeActivities/prioritizeActivities";
import PrioritizeActivitiesTop from "./prioritizeActivitiesTop/prioritizeActivitiesTop";
import AllActivites from "./allActivities/allActivities";
import Overview from "./overview/overview";

export const Pages = () => <Switch>
    <Route path={pages.TYPE_OF_DAY} component={TypeOfDay} />
    <Route path={pages.MAJOR_PARTS} component={MajorParts} />
    <Route path={pages.MAJOR_PARTS_DURATION} component={MajorPartsDuration} />
    <Route path={pages.HOURS_OF_SLEEP} component={HoursOfSleep} />
    <Route path={pages.TOTAL_HOURS} component={TotalHours} />
    <Route path={pages.START_OF_DAY} component={StartOfDay} />
    <Route path={pages.START_TIMES} component={StartTimes} />
    <Route path={pages.LIST_ACTIVITIES} component={ListActivities} />
    <Route path={pages.CATEGORIZE_ACTIVITIES} component={CategorizeActivities} />
    <Route path={pages.PRIORITIZE_ACTIVITIES} component={PrioritizeActivities} />
    <Route path={pages.PRIORITIZE_ACTIVITIES_TOP} component={PrioritizeActivitiesTop} />
    <Route path={pages.ALL_ACTIVITIES} component={AllActivites} />
    <Route path={pages.OVERVIEW} component={Overview} />
    <Route path="/">
        <Redirect to={pages.TYPE_OF_DAY} />
    </Route>
</Switch>

export default Pages;