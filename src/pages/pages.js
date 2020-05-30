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

export const Pages = () => <Switch>
    <Route path={pages.TYPE_OF_DAY} component={TypeOfDay} />
    <Route path={pages.MAJOR_PARTS} component={MajorParts} />
    <Route path={pages.MAJOR_PARTS_DURATION} component={MajorPartsDuration} />
    <Route path={pages.HOURS_OF_SLEEP} component={HoursOfSleep} />
    <Route path={pages.TOTAL_HOURS} component={TotalHours} />
    <Route path={pages.START_OF_DAY} component={StartOfDay} />
    <Route path={pages.START_TIMES} component={StartTimes} />
    <Route path="/">
        <Redirect to={pages.TYPE_OF_DAY} />
    </Route>
</Switch>

export default Pages;