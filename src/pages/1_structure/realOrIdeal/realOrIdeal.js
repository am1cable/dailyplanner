import React from "react";
import PageWrapper from "../../../components/pageWrapper/pageWrapper";
import { START_OF_DAY, LIST_ACTIVITIES } from "../../pageUrls";
import { useDispatch, useSelector } from "react-redux";
import { Button, Grid } from "@material-ui/core";
import { getScheduleByHours } from "../../../utils/time";
import Timeline from '@material-ui/lab/Timeline';
import { ScheduleTimelineItem } from "../../../components/dayTimeline/dayTimeline";
import { saveDay } from "../../../actions";
import isEqual from "lodash/isEqual";

export const RealOrIdeal = ({redoneDay, initialDay, finalDay}) => {
    const currentDayData = useSelector(state => state.currentDayData);
    const dispatch = useDispatch();
    const renderScheduleTimeline = colored => (schedule, index) =>
        <ScheduleTimelineItem colored={colored} key={index}
            hasConnector={index < getScheduleByHours(redoneDay).length - 1}
            {...schedule}
        />

    const selectPlanner = planner => () => dispatch(saveDay({ ...currentDayData, "final": planner }))

    const isSelected = day => finalDay && isEqual(finalDay, day)

    return <PageWrapper back={{ link: START_OF_DAY }} forward={{ link: LIST_ACTIVITIES, disabled: !finalDay}}>
        <div>Which version of your daily planner would you like to try for your first week?</div>
        <Grid container spacing={3} direction="row">
            <Grid item>
                <Timeline>
                    {getScheduleByHours(redoneDay).map(renderScheduleTimeline(isSelected(redoneDay)))}
                </Timeline>
                <Button variant="contained" color="secondary" disabled={isSelected(redoneDay)} onClick={selectPlanner(redoneDay)}>This planner.</Button>
            </Grid>
            <Grid item>
                <Timeline>
                    {getScheduleByHours(initialDay).map(renderScheduleTimeline(isSelected(initialDay)))}
                </Timeline>
                <Button variant="contained" color="secondary" disabled={isSelected(initialDay)} onClick={selectPlanner(initialDay)}>This planner.</Button>
            </Grid>
        </Grid>
    </PageWrapper>
}
export default RealOrIdeal 