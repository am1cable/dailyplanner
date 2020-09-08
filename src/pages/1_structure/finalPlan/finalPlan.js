import React from "react";
import PageWrapper from "../../../components/pageWrapper/pageWrapper";
import { Button, Grid, Typography } from "@material-ui/core";
import { getScheduleByHours, formatTime } from "../../../utils/time";
import { exportAsPdf } from "../../../utils/pdf";
import Timeline from '@material-ui/lab/Timeline';
import { ScheduleTimelineItem } from "../../../components/dayTimeline/dayTimeline";

export const FinalPlan = ({finalDay}) => {
    const generateUnformattedSchedule = () => [finalDay.name, ...getScheduleByHours(finalDay).map(time => `${formatTime(time)} - ${time.name || "Sleep"}\n`)];
    const renderScheduleTimeline = (schedule, index) =>
        <ScheduleTimelineItem key={index}
            hasConnector={index < getScheduleByHours(finalDay).length - 1}
            {...schedule}
        />

    return <PageWrapper>
        <Grid container spacing={3}
            direction="column">
            <Grid item>
                <Typography variant="h4" gutterBottom>{finalDay.name}</Typography>
                <Timeline>
                    {getScheduleByHours(finalDay).map(renderScheduleTimeline)}
                </Timeline>
            </Grid>
            <Grid item>
                <Button variant="contained" color="secondary" onClick={exportAsPdf(generateUnformattedSchedule)}>Export as a PDF.</Button>
            </Grid>
        </Grid>
    </PageWrapper>
}
export default FinalPlan 