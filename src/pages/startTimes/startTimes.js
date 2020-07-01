import React from "react";
import PageWrapper from "../../components/pageWrapper/pageWrapper";
import { START_OF_DAY, LIST_ACTIVITIES } from "../pageUrls";
import { useSelector } from "react-redux";
import { Button, Grid } from "@material-ui/core";
import { getScheduleByHours, formatTime } from "../../utils/time";
import { exportAsPdf } from "../../utils/pdf";

export const StartTimes = () => {
    const currentDay = useSelector(state => state.currentDayData);

    const generateUnformattedSchedule = () => getScheduleByHours(currentDay).map(time => `${formatTime(time)} - ${time.name || "Sleep"}\n`);
    const renderScheduleByHours = () => getScheduleByHours(currentDay).map((time, index) => <div key={index}>{formatTime(time)} - {time.name || "Sleep"} </div>)

    return <PageWrapper back={{ link: START_OF_DAY }} forward={{link: LIST_ACTIVITIES}}>
        <Grid container spacing={3}
            direction="column">
            <Grid item>
                {renderScheduleByHours()}
            </Grid>
            <Grid item>
                <Button variant="contained" color="secondary" onClick={exportAsPdf(generateUnformattedSchedule)}>Export as a PDF.</Button>
            </Grid>
        </Grid>
    </PageWrapper>
}
export default StartTimes 