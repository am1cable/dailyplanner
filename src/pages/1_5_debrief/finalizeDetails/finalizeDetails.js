import React from "react";
import { Grid } from "@material-ui/core";
import PageWrapper from "../../../components/pageWrapper/pageWrapper";
import uniqBy from "lodash/uniqBy";
import { defaultConfidenceChoices } from "../../../components/confidenceSlider/confidenceSlider";

export const FinalizeDetails = ({ finalDay }) => {
    const getLastFeedbackOfType = (feedback) => {
        const sortedFeedback = feedback.sort((a,b) => a.timestamp - b.timestamp).reverse();
        const uniqueFeedback = uniqBy(sortedFeedback, value => value.subname+value.name);
        const sortedUnqiueFeedback = uniqueFeedback.sort((a,b) => {
            if (a.id !== b.id)
            {
                const majorPartsIds = finalDay.majorParts.map(({id}) => id);
                return majorPartsIds.indexOf(a.id) - majorPartsIds.indexOf(b.id);
            }
            else if (!a.subname) return -1;
            else if (a.subname && !b.subname) return 1;
            else if (a.subname.includes("h")) return -1;
            return 1;
        });
        return sortedUnqiueFeedback;
    }

    return <PageWrapper className="major-parts major-parts-achievable">
        <div>Ya feedback:</div>
        <Grid container spacing={3} direction="column">
            {getLastFeedbackOfType(finalDay.feedback).map(({name, subname, value}, i) => {
                    return <Grid item key={i}>
                        <div> {name} </div>
                        <div> {subname} </div>
                        <div> {defaultConfidenceChoices.find(({value: confValue}) => confValue == value).label} </div>
                        </Grid>
                })}
            </Grid>
    </PageWrapper>
}

export default FinalizeDetails;