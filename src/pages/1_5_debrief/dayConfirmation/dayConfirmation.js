import React from "react";
import { Grid, Button } from "@material-ui/core";
import PageWrapper from "../../../components/pageWrapper/pageWrapper";
import { useDispatch } from "react-redux";
import { setStep } from "../../../actions";
import { steps } from "../1_5_Manager";

export const DayConfirmation = ({ finalDay }) => {
    const dispatch = useDispatch();

    const changePage = isDay => () => {
        if (isDay) {
            dispatch(setStep(steps.completion_rates))
        } else {
            dispatch(setStep(steps.finalized_details))
        }
    }

    return <PageWrapper className="major-parts major-parts-achievable">
        <div>Arr, this be yer day me laddy?</div>
        <Grid container spacing={3}>
            <Grid item>
                <div>{finalDay.name}</div>
                <div>
                    <Button variant="contained" color="primary" onClick={changePage(true)}>Yar, so it be!</Button>
                    <Button variant="contained" color="secondary" onClick={changePage(false)}>Narr, that be not my day.</Button>
                </div>
            </Grid>
        </Grid>
    </PageWrapper>
}

export default DayConfirmation;