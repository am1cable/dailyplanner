import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Typography } from "@material-ui/core";
import { Timeline } from "@material-ui/lab";
import ConfidenceSlider from "../../../components/confidenceSlider/confidenceSlider";
import PageWrapper from "../../../components/pageWrapper/pageWrapper";
import { getScheduleByHours } from "../../../utils/time";
import { ScheduleTimelineItem } from "../../../components/dayTimeline/dayTimeline";
import { saveDay, setStep, setDay } from "../../../actions";
import { ContextWrapper, steps } from "../structureManager";

export const HowAchievable = ({}) => {
    const currentDayData = useSelector(state => state.currentDayData);
    const dispatch = useDispatch();
    const defaultIdealConfidence = 75;

    useEffect(() => {
        if (!currentDayData.initialDayConfidence) dispatch(saveDay({ ...currentDayData, initialDayConfidence: defaultIdealConfidence }));
    }, []);

    const handleConfidenceChange = (newValue) => {
        dispatch(saveDay({ ...currentDayData, initialDayConfidence: newValue }));
    }

    const renderScheduleTimeline = (schedule, index) =>
        <ScheduleTimelineItem key={index}
            hasConnector={index < getScheduleByHours(currentDayData.ideal).length - 1}
            {...schedule}
        />
    const setNextStep = () => {
        if (currentDayData.initialDayConfidence < 100) {
            dispatch(setStep(steps.set_major_parts_of_real));
        } else {
            dispatch(setDay({...currentDayData, "final": currentDayData.ideal}));
            dispatch(setStep(steps.show_final_plan));
        }
    };

    return <ContextWrapper context={{ onNavigateForwards: setNextStep }}>
        <PageWrapper className="major-parts major-parts-achievable" forward={{ disabled: false }}>
            <Grid container spacing={3} direction="row">
                <Grid item>
                    <Typography variant="h4" gutterBottom>{currentDayData.name}</Typography>
                    <Timeline>
                        {getScheduleByHours(currentDayData.ideal).map(renderScheduleTimeline)}
                    </Timeline>
                </Grid>
                <Grid item>
                    <div>How acheivable is this goal rn (that's kid slang for right now)?</div>
                    <div>
                        <ConfidenceSlider defaultValue={defaultIdealConfidence} onChange={handleConfidenceChange} />
                    </div>
                </Grid>
            </Grid>
        </PageWrapper>
    </ContextWrapper>
}

export default HowAchievable;