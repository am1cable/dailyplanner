import React from "react";
import { Grid } from "@material-ui/core";
import ConfidenceSlider from "../../../components/confidenceSlider/confidenceSlider";
import PageWrapper from "../../../components/pageWrapper/pageWrapper";



export const EnterFeedback = ({ finalDay, feedbackDetails, saveFeedback }) => {
    const defaultFeedbackChoice = 75;

    const handleSaveFeedback = partOfDay => value => {
        saveFeedback({ ...partOfDay, value })
    }

    const renderFeedbackLine = (values, index) =>  <Grid key={index} item container>
            <Grid item>
                {values.name}
            </Grid>
            {values.subname ? <Grid item>
                values.subname
                </Grid> : ""}
            <Grid item>
                <ConfidenceSlider defaultValue={defaultFeedbackChoice} onChange={handleSaveFeedback(values)} />
            </Grid>
        </Grid>

    return <PageWrapper className="major-parts major-parts-achievable" forward={{ disabled: false }}>
        <Grid container spacing={3}>
            <Grid item>
                <div>{feedbackDetails.text}</div>
                <div>
                    {finalDay.majorParts.map(renderFeedbackLine)}
                </div>
            </Grid>
        </Grid>
    </PageWrapper>
}

export default EnterFeedback;