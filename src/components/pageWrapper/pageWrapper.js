import React, { useEffect } from "react";
import NavButtons from "../navButtons/navButtons";
import { useHistory, useLocation, Redirect } from "react-router-dom";
import { TYPE_OF_DAY } from "../../pages/pageUrls";
import { useSelector } from "react-redux";
import { Container, Box, Paper, Grid } from "@material-ui/core";
import ManageData from "../manageData/manageData";

export const PageWrapper = ({ forward = { disabled: true, link: "/" }, back = { disabled: true, link: "/" }, children, className }) => {
    const currentDay = useSelector(state => state.currentDayData);
    const location = useLocation();

    return <React.Fragment>{(currentDay && typeof currentDay.type !== undefined) || location.pathname === TYPE_OF_DAY ?
        <Container maxWidth="md" >
            <Grid container spacing={3} direction="column">
                <Grid item>
                    <Paper elevation={3} className="wrapper">
                        <Grid container spacing={3} direction="column">
                            <Grid item className={className}>{children}</Grid>
                            <Grid item><NavButtons forward={forward} back={back} /></Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item>
                    <ManageData />
                </Grid>
            </Grid>
        </Container> : <Redirect to={TYPE_OF_DAY} />

    }</React.Fragment>
}
export default PageWrapper