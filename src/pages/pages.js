import React from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import * as pages from "./pageUrls";
import TypeOfDay from "./typeOfDay/typeOfDay";
import MajorParts from "./majorParts/majorParts";
import MajorPartsDuration from "./majorPartsDuration/majorPartsDuration";
import HoursOfSleep from "./hoursOfSleep/hoursOfSleep";
import TotalHours from "./totalHours/totalHours";
import StartOfDay from "./startOfDay/startOfDay";
import StartTimes from "./startTimes/startTimes";
import { useDispatch, useSelector } from "react-redux";
import { setDay } from "../actions";

export const Pages = () => {
    const dispatch = useDispatch();
    const pageData = useSelector(state => state.pageData);    
    const currentDay = useSelector(state => state.currentDayData);
    const history = useHistory();

    const checkForDay = () => !currentDay.name && history.push(pages.TYPE_OF_DAY);
    const handleCreateDay = () => dispatch(setDay(pageData.dayTypeDetails.find(detail => detail.type === pageData.dayTypeChoice) || {type: pageData.dayTypeChoice}))
    
    return <Switch>
    <Route path={pages.TYPE_OF_DAY} component={TypeOfDay} onLeave={handleCreateDay}/>
    <Route path={pages.MAJOR_PARTS} component={MajorParts} onEnter={checkForDay}/> 
    <Route path={pages.MAJOR_PARTS_DURATION} component={MajorPartsDuration}  onEnter={checkForDay}/>
    <Route path={pages.HOURS_OF_SLEEP} component={HoursOfSleep}  onEnter={checkForDay}/>
    <Route path={pages.TOTAL_HOURS} component={TotalHours}  onEnter={checkForDay}/>
    <Route path={pages.START_OF_DAY} component={StartOfDay}  onEnter={checkForDay}/>
    <Route path={pages.START_TIMES} component={StartTimes}  onEnter={checkForDay}/>
    <Route path="/">
        <Redirect to={pages.TYPE_OF_DAY} />
    </Route>
</Switch>}


export default Pages;