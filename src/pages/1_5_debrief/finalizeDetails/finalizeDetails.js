import React from "react";
import { Grid, Button } from "@material-ui/core";
import PageWrapper from "../../../components/pageWrapper/pageWrapper";
import { useDispatch } from "react-redux";
import { setStep } from "../../../actions";
import { steps } from "../1_5_Manager";

export const FinalizeDetails = ({ finalDay }) => {
    const dispatch = useDispatch();

    const changePage = isDay => () => {
        if (isDay) {
            dispatch(setStep(steps.completion_rates))
        } else {
            dispatch(setStep(steps.finalized_details))
        }
    }

    return <PageWrapper className="major-parts major-parts-achievable">
        <div>K thanks!</div>
        <Grid container spacing={3}>
            <Grid item>
                <div>{finalDay.feedback.toString()}</div>
            </Grid>
        </Grid>
    </PageWrapper>
}

export default FinalizeDetails;