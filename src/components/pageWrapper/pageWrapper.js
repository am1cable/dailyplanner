import React, { useEffect } from "react";
import NavButtons from "../navButtons/navButtons";
import { useHistory, useLocation, Redirect } from "react-router-dom";
import { TYPE_OF_DAY } from "../../pages/pageUrls";
import { useSelector } from "react-redux";
import { Container, Box, Paper } from "@material-ui/core";

export const PageWrapper = ({ forward = { disabled: true, link: "/" }, back = { disabled: true, link: "/" }, children, className }) => {
    const currentDay = useSelector(state => state.currentDayData);
    const location = useLocation();

    return <React.Fragment>{(currentDay && currentDay.type) || location.pathname === TYPE_OF_DAY ? <Container maxWidth={false}>
            <Paper elevation={3} className="wrapper">
                <Box className={className}>{children}</Box>
                <Box><NavButtons forward={forward} back={back} /></Box>
            </Paper>
        </Container> : <Redirect to={TYPE_OF_DAY} />

    }</React.Fragment>
}
export default PageWrapper