import React from "react";
import NavButtons from "../navButtons/navButtons";
import { useLocation, Redirect } from "react-router-dom";
import { TYPE_OF_DAY } from "../../pages/pageUrls";
import { useSelector } from "react-redux";
import { Container, Grid, Divider } from "@material-ui/core";
import ManageData from "../manageData/manageData";

export const PageWrapper = ({ forward = { disabled: true, link: "/" }, back = { disabled: true, link: "/" }, children, className }) => {
    const currentDay = useSelector(state => state.currentDayData);
    const location = useLocation();

    return <React.Fragment>{(currentDay && typeof currentDay.type !== undefined) || location.pathname === TYPE_OF_DAY ?
        <Container maxWidth="lg" >
            <Grid container spacing={3} direction="column">
                <Grid item>
                        <Grid container spacing={3} direction="column">
                            <Grid item className={className}>{children}</Grid>
                            <Grid item><NavButtons forward={forward} back={back} /></Grid>
                        </Grid>
                </Grid>
                            <Divider/>
                <Grid item>
                    <ManageData />
                </Grid>
            </Grid>
        </Container> : <Redirect to={TYPE_OF_DAY} />

    }</React.Fragment>
}
export default PageWrapper