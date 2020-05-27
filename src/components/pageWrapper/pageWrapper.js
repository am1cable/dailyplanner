import React, { useEffect } from "react";
import NavButtons from "../navButtons/navButtons";
import { useHistory, useLocation } from "react-router-dom";
import { TYPE_OF_DAY } from "../../pages/pageUrls";
import { useSelector } from "react-redux";
import { Container, Box, Paper } from "@material-ui/core";

export const PageWrapper = ({ forward = { disabled: true, link: "/" }, back = { disabled: true, link: "/" }, children, className }) => {
    const currentDay = useSelector(state => state.currentDayData);
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname !== TYPE_OF_DAY && currentDay.type === undefined) history.push(TYPE_OF_DAY);
    }, [currentDay]);

    return <Container>
        <Paper elevation={3} className="wrapper">
        <Box className={className}>{children}</Box>
        <Box><NavButtons forward={forward} back={back} /></Box>
        </Paper>
    </Container>
}
export default PageWrapper