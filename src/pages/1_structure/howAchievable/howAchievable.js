import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Typography } from "@material-ui/core";
import { Timeline } from "@material-ui/lab";
import ConfidenceSlider from "../../../components/confidenceSlider/confidenceSlider";
import PageWrapper from "../../../components/pageWrapper/pageWrapper";
import { getScheduleByHours } from "../../../utils/time";
import { ScheduleTimelineItem } from "../../../components/dayTimeline/dayTimeline";
import { saveDay, setStep } from "../../../actions";
import { ContextWrapper, steps } from "../structureManager";

export const HowAchievable = ({ }) => {
    const currentDay = useSelector(state => state.currentDayData);
    const dispatch = useDispatch();

    const handleConfidenceChange = (newValue) => {
        dispatch(saveDay({ ...currentDay, idealDayConfidence: newValue }));
    }

    const renderScheduleTimeline = (schedule, index) =>
        <ScheduleTimelineItem key={index}
            hasConnector={index < getScheduleByHours(currentDay.ideal).length - 1}
            {...schedule}
        />
    const setNextStep = () => {
        if (currentDay.idealDayConfidence < 100) {
            dispatch(setStep(steps.set_major_parts_of_real));
        } else {
            dispatch(setStep(steps.show_start_times));
        }
    };

    return <ContextWrapper context={{ onNavigateForwards: setNextStep }}>
        <PageWrapper className="major-parts major-parts-achievable" forward={{ disabled: !currentDay.idealDayConfidence }}>
            <Grid container spacing={3} direction="row">
                <Grid item>
                    <Typography variant="h4" gutterBottom>{currentDay.name}</Typography>
                    <Timeline>
                        {getScheduleByHours(currentDay.ideal).map(renderScheduleTimeline)}
                    </Timeline>
                </Grid>
                <Grid item>
                    <div>How acheivable is this goal rn (that's kid slang for right now)?</div>
                    <div>
                        <ConfidenceSlider onChange={handleConfidenceChange} />
                    </div>
                </Grid>
            </Grid>
        </PageWrapper>
    </ContextWrapper>
}

export default HowAchievable;