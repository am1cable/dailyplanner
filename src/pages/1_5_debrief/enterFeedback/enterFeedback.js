import React, { useEffect, useState, Fragment } from "react";
import { Grid } from "@material-ui/core";
import ConfidenceSlider from "../../../components/confidenceSlider/confidenceSlider";
import PageWrapper from "../../../components/pageWrapper/pageWrapper";


export const EnterFeedback = ({ finalDayDetails, feedbackDetails, saveFeedback }) => {
    const [hasSavedBaseFeedback, setHasSavedBaseFeedback] = useState(false);
    const defaultFeedbackChoice = 75;
    const handleSaveFeedback = partOfDay => value => {
        saveFeedback([{ ...partOfDay, value }]);
    }

    useEffect(() => {
        saveFeedback([...finalDayDetails.map(partOfDay => ({...partOfDay, value: defaultFeedbackChoice}))]);
        setHasSavedBaseFeedback(true);
    }, [feedbackDetails.text]);

    const renderFeedbackLine = (values, index) => <Grid key={index} item container>
        <Grid item>
            {values.name}
        </Grid>
        {values.subname ? <Grid item>
            {values.subname}
        </Grid> : ""}
        <Grid item xs={6}>
            <ConfidenceSlider key={feedbackDetails.text+index} defaultValue={defaultFeedbackChoice} onChange={handleSaveFeedback(values)} />
        </Grid>
    </Grid>

    return <PageWrapper className="major-parts major-parts-achievable" forward={{ disabled: false }}>
        {hasSavedBaseFeedback && <Fragment>
            <div>{feedbackDetails.text}</div>
            <Grid container spacing={3}>
                {finalDayDetails.map(renderFeedbackLine)}
            </Grid>
        </Fragment>}
    </PageWrapper>
}

export default EnterFeedback;