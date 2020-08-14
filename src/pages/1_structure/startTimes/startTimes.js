import React from "react";
import PageWrapper from "../../../components/pageWrapper/pageWrapper";
import { START_OF_DAY, LIST_ACTIVITIES } from "../../pageUrls";
import { useSelector } from "react-redux";
import { Button, Grid, Typography } from "@material-ui/core";
import { getScheduleByHours, formatTime } from "../../../utils/time";
import { exportAsPdf } from "../../../utils/pdf";
import Timeline from '@material-ui/lab/Timeline';
import { ScheduleTimelineItem } from "../../../components/dayTimeline/dayTimeline";

export const StartTimes = () => {
    const currentDay = useSelector(state => state.currentDayData);

    const generateUnformattedSchedule = () => [currentDay.name, ...getScheduleByHours(currentDay).map(time => `${formatTime(time)} - ${time.name || "Sleep"}\n`)];
    const renderScheduleTimeline = (schedule, index) =>
        <ScheduleTimelineItem key={index}
            hasConnector={index < getScheduleByHours(currentDay).length - 1}
            {...schedule}
        />

    return <PageWrapper back={{ link: START_OF_DAY }} forward={{ link: LIST_ACTIVITIES }}>
        <Grid container spacing={3}
            direction="column">
            <Grid item>
                <Typography variant="h4" gutterBottom>{currentDay.name}</Typography>
                <Timeline>
                    {getScheduleByHours(currentDay).map(renderScheduleTimeline)}
                </Timeline>
            </Grid>
            <Grid item>
                <Button variant="contained" color="secondary" onClick={exportAsPdf(generateUnformattedSchedule)}>Export as a PDF.</Button>
            </Grid>
        </Grid>
    </PageWrapper>
}
export default StartTimes 